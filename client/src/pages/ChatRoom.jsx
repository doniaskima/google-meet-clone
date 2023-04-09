import axios from 'axios';
import { Fragment, useCallback, useEffect, useState ,useRef, useContext } from 'react';
import ThemeChanger from '../components/theme-changer';
import { Button, message, notification } from "antd";
import DialogContent from "@material-ui/core/DialogContent";
import { Dialog } from "@material-ui/core";
import WarningFilled from "@ant-design/icons";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Menu from '@material-ui/core/Menu';
import CancelIcon from '@material-ui/icons/Cancel';
import { APP_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../SocketContext";
import Message from "../components/Message/Message"

 
import {
  genericError,
  getInitialTheme,
  noConfigError,
  notFoundError,
  setupHotjar,
  tooManyRequestError,
  sanitizeConfig,
} from '../helpers/utils';
import { HelmetProvider } from 'react-helmet-async';
import ErrorPage from '../components/error-page';
const bgColor = 'bg-base-300';

const chatroom = ({ config }) => {

  const [error, setError] = useState(
    typeof config === 'undefined' && !config ? noConfigError : null
  );
  const [sanitizedConfig] = useState(
    typeof config === 'undefined' && !config ? null : sanitizeConfig(config)
  );
  const [theme, setTheme] = useState(null);
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    if (sanitizedConfig) {
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      
    }
  }, [sanitizedConfig]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const {
    me,
    call,
    otherUser,
    socketState: socket,
    messages,
    setMessages,
    name,
    answerCall,
    setCall,
    callEnded,
    callAccepted,
    leaveChatRoom,
    newMeet,
    setShowOtherUserVideo,
} = useContext(SocketContext);
const navigate = useNavigate();
const [open, setOpen] = useState(true);
const [newMessage, setNewMessage] = useState("");
const [anchorEl, setAnchorEl] = useState(null);
const msgRef = useRef();

useEffect(()=>{
    if(call && call.isRecievedCall && !callAccepted){
        setOpen(true);
    }else{
        setOpen(false);
    }
},[call,callEnded]);

useEffect(() => {
    //recieving message
    socket.on("recieve-message", (data) => {
        setMessages((messages) => [...messages, data]);
    });
    //event for Other person allowed me to see him
    socket.on('showVideoToOtherUser', () => {
        setShowOtherUserVideo(true);
    });

    //event that notifies that the other person has left the chatroom
    socket.on("chatRoomEnded", () => {
        notification.open({
            message: `Other User left`,
            placement: "topLeft",
            style: { backgroundColor: '#00BFD8' },
            icon: <WarningFilled style={{ color: "white" }} />,
        })
    })
    return () => {
        //clean up function to close the socket events when the component unmounts
        socket.off("recieve-message");
        socket.off("chatRoomEnded");
    };
}, []);

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};
const handleClose = () => {
    setAnchorEl(null);
};

//function to send message
const sendMessage = () => {
    if (newMessage.trim().length <= 0) {
        notification.open({
            message: `Please Enter Something!`,
            placement: "topLeft",
            style: { backgroundColor: '#00BFD8' },
            icon: <WarningFilled style={{ color: "white" }} />,
        });
        return;
    }
    //responsible for storing the time of the texts
    let time = new Date();
    let msgtimesent = `${time.getHours()}:${time.getMinutes()}`
    let tempMessage = { text: newMessage.trim(), user: me, time: msgtimesent };
    socket.emit("send-message", {
        data: tempMessage,
        userToSend: otherUser,
    });
    setMessages((messages) => [...messages, tempMessage]);
    setNewMessage("");
};

const handleKeypress = (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
};

  return (
    <HelmetProvider>
      <div className="fade-in h-screen">
        {error ? (
          <ErrorPage
            status={`${error.status}`}
            title={error.title}
            subTitle={error.subTitle}
          />
        ) : (
          sanitizedConfig && (
            <Fragment>
              <div className={`chatroom-container p-4 lg:p-10 min-h-full ${bgColor}`}>
                  <div className="chatroom-container-upper">
                    <div className="chatroom-header">
                     <div className="chatroom-header-title">
                      {!sanitizedConfig.themeConfig.disableSwitch && (
                        <ThemeChanger
                          theme={theme}
                          setTheme={setTheme}
                          themeConfig={sanitizedConfig.themeConfig}
                        />
                       )}
                     </div>
                     <div className="chatroom-button-container">
                {newMeet ? (
                    <button className='chatroom-meeting-btns badge-primary tooltip invite-css' onClick={handleClick}>
                        <span style={{ marginRight: '1em' }} className="font-sans ">Invite</span>  <PersonAddIcon />
                        <span className='tooltiptext' >Invite</span>
                    </button>
                ) :
                    (
                        (null)
                    )}
                {/* container for the invite button message */}
                <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <div className='options-menu'>
                        <div className='btn-div'>
                            <h3>Call a friend {name}!</h3>
                            <button type='primary' onClick={handleClose}>
                                <CancelIcon />
                            </button>
                        </div>

                        <div>

                            <CopyToClipboard
                                text={`${APP_URL}?${me}`}
                                onCopy={() => {
                                    message.success('Url Copied');
                                    handleClose();
                                }}
                            >
                                <Button className=" mr-4 badge-primary mt-4">Copy Link</Button>
                            </CopyToClipboard>
                            <CopyToClipboard
                                text={me}
                                onCopy={() => {
                                    message.success('Id Copied');
                                    handleClose();
                                }}
                            >
                                <Button className=" mt-4 badge-primary">Copy ID</Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </Menu>
                <button
                    className="chatroom-meeting-btns font-sans badge-primary"
                    onClick={() => {
                        if (name.trim().length === 0) {
                            message.error("Enter your Name!");
                            return;
                        }
                        navigate("/join");
                    }}>
                    Join Video Call
                </button>

                <button className="chatroom-meeting-btns leave-room font-sans"
                    onClick={() => { leaveChatRoom(navigate(-1)) }}

                >
                    Leave Room
                </button>
            </div>
                  </div>   
                                   {/* Messages are displayed here */}
              
                <div className="chatroom-messages">
                    {messages.length > 0 ? (
                        messages.map((item, i) => (
                            <Message message={item} key={i} item={i} />
                        ))
                    ) : (
                        <div>
                            <div className='chatroom-message-desc font-sans'>
                                {newMeet ? (<p className="font-sans">It is quite empty here..maybe invite someone?</p>) : (<p className="font-sans">It is quite empty here...start chatting or join the call!</p>)}

                            </div>
                            <div className='chatroom-message-desc'>
                                {/* <EmpMsgSvg /> */}
                            </div>
                        </div>

                    )}
                    <div ref={msgRef}>
                    </div>
                </div>
            </div>
            <div className="chatroom-container-input">
                <div className="chatroom-input-master">
                    <input
                        className="chatroom-msg-input outline-none !important border border-gray-400"
                        type="text"
                        value={newMessage}
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                        }}
                        onKeyPress={handleKeypress}
                        placeholder="Enter a message"
                    />
                    <button
                        className="chatroom-msg-send px-4 py-2 badge-primary"
                        onClick={() => {
                            sendMessage();
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
            {/* alert for accepting the user */}
            {call && (
                <Dialog open={open} aria-labelledby="draggable-dialog-title"
                    PaperProps={{
                        style: {
                            padding: '20px'
                        },
                    }}
                >
                    <DialogContent>
                        <div className="call-div">
                           
                            <div className="flex">
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        answerCall();
                                        setOpen(false);
                                    }}
                                >
                                    Accept
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setCall(null);
                                        setOpen(false);
                                    }}
                                >
                                    Deny
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
                </div>
                 
            </Fragment>
          )
        )}
      </div>
    </HelmetProvider>
  );
};


export default chatroom;
