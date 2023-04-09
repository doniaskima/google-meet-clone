import React, { useContext, useRef } from 'react'
import { SocketContext } from '../SocketContext';
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { message } from 'antd';

const Join = () => {

  const {
    socketState: socket,
    name,
    setName,
    stream,
    setStream,
    callUser,
    meetingCode,
    setMeetingCode,
    newMeet,
    myMicStatus,
    updateVideoStatus,
    myVideoStatus,
    updateMicStatus,
    otherUser,
    showVideoToOtherUser
  } = useContext(SocketContext);

  //reference to my video 
  const myPreviewVideo = useRef();
  const navigate = useNavigate();
  return (
    <>
      <div className="flexbox-join-page">
        <div className="flexbox-join-enter-button">
          <h1 className="mb-8">Your video appears like this</h1>

            {/* video preview */}
            <div className="video-div">
              {
                stream ? (
                  <video 
                  src=""
                  ref={myPreviewVideo}
                  autoplay
                  muted
                  >
                  </video>
                ) : (
                  <Spinner />
                )
              }
            </div>

            <div className="flexbox-control-video">
              {/* video controls (mute/unmute, video off/video on) */}
              <button 
                  onClick={()=>updateMicStatus()}
                  className={!myMicStatus ? 'bg-grey tooltip rounded-xl px-2 py-1 mr-2' : 'bg-white tooltip rounded-xl px-2 py-1 mr-2'}
              >
                   {' '}
                   {myMicStatus ? <MicIcon /> : <MicOffIcon />}
              </button>
              <button 
               onClick={()=>updateVideoStatus()}
              >
              {myVideoStatus ? <VideocamIcon /> : <VideocamOffIcon />}
              </button>
            </div>
        </div>
        {
          stream && (
            <>
             //Name Input 
             <div className="flexbox-join-enter-button">
              <div className="flexbox-join-enter">
                <label htmlFor="field field_v1">
                  <input 
                    className="field__input"
                    id="html"
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                  />
                    <span class="field__label-wrap">
                    <span class="field__label">Name</span>
                  </span>
                </label>
                    //show start for the host and join for others 
                    {
                      newMeet ? (
                        <button 
                        onClick={()=>{
                          if(name.trim().length===0){
                            message.error("Enter your name");
                            return;
                          }
                          if(otherUser) showVideoToOtherUser();
                          console.log(otherUser);
                          navigate("/meet");
                        }}
                        className='font-sans chatroom-meeting-btn'>
                          Start
                        </button>
                      ) : (
                        <button
                        className='chatroom-meeting-btn font-sans'
                        onClick={() => {
                          if (name.trim().length === 0) {
                            message.error('Please enter your name');
                            
                            return;
                          }
                          if(otherUser) showVideoToOtherUser();
                          callUser(meetingCode);
                          navigate('/meet');
                        }}
                      >
                        Join
                      </button>
                      )
                    }

                    <button 
                        className='chatroom-meeting-btn font-sans' 
                        onClick={() => {
                            navigate('/chatRoom');
                        }}
                    >
                      Leave 
                    </button>
              </div>
             </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default Join