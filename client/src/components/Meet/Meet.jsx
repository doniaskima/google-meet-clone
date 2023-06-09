import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import Editor from '../Editor/Editor';
import Options from '../Options/Options';
import './Meet.css';
import noteIcon from '../../assets/NoteImg.png';
import Spinner from '../../common/Spinner';
import saveAs from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';
import { message } from 'antd';
import GetAppIcon from '@material-ui/icons/GetApp';

const Meet = (props) => {
  const {
    callAccepted,    
    name,
    myVideo,
    userVideo,
    stream,
    setStream,
    myVideoStatus,
    userVideoStatus,
    showEditor,
    otherUserStream,
    otherUser,
    otherUserName,
    quill,
    showChatBox,
    showNotesBox,
    showOtherUserVideo,
    setShowOtherUserVideo,
    showVideoToOtherUser,
    socketState: socket,
  } = useContext(SocketContext);

  const [mobileView, setMobileView] = useState(false);
  const [loading, setLoading] = useState(true);

  const resize = () => {
    setMobileView(window.innerWidth <= 900);
  };
  //event that tells that the Other person allowed me to see him
  useEffect(() => {
    
    socket.on('showVideoToOtherUser',()=>{
      setShowOtherUserVideo(true);
      console.log("Other person allowed me to see him")
    });

  }, []);
  //gives delay of 2 seconds such that no empty div is presented instead of the video.
  useEffect(() =>{
    setTimeout(() => {
      showVideoToOtherUser();
    }, 2000);
  },[otherUser]);

  //resize the window
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
  }, []);

  //loader
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  //set the stream
  useEffect(() => {
    if (loading) return;
    if (stream && myVideoStatus) {
      myVideo.current.srcObject = stream;
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        if(myVideoStatus)
        myVideo.current.srcObject = res;
      });
  }, [loading]);

  //change the state of the video
  useEffect(() => {
    if (myVideo.current) myVideo.current.srcObject = stream;
  }, [myVideoStatus]);

  //change the state of the user video
  useEffect(() => {
    if (userVideo.current) userVideo.current.srcObject = otherUserStream;
  }, [otherUserStream, userVideoStatus, loading]);

  //function to download and save as pdf
  const downloadPdf = async () => {
    const delta = quill.getContents();
    const pdfAsBlob = await pdfExporter.generatePdf(delta);
    message.success('Downloading your Notes');
    saveAs(pdfAsBlob, `Meeting Notes.pdf`);
  };

  //loader/spinner
  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          backgrfoundColor: 'white',
        }}
      >
        <Spinner starting />
      </div>
    );
  }
  return (
    <div className="meet-total-contain">
    <div className={showChatBox||showNotesBox?'chatBoxVisible':null}>
    <div className={showEditor? 'flex-div' : 'flex-div hide-editor'}>
      <div className='left'>
        <div className='video-div'>
          {' '}
          <div
            className={callAccepted ? 'video-frames ' : 'video-frames v-size'}
          >
            <div className='video-frame'>
              {stream ? (
                <>
                  {myVideoStatus ? (
                    <video
                      className='video-ref'
                      src=''
                      ref={myVideo}
                      autoPlay
                      muted
                    ></video>
                  ) : (
                    <div className='video-ref img-bg'>
                      
                    </div>
                  )}
                  <div className='name'>{name} YOU  </div>
                 
                </>
              ) : (
                <Spinner />
              )}
            </div>
            {/* change layout */}
            {showOtherUserVideo && (callAccepted &&(
              <div className='video-frame'>
                {userVideoStatus ? (
                  <video
                    src=''
                    className='video-ref'
                    ref={userVideo}
                    autoPlay
                  ></video>
                ) : (
                  <div className='video-ref img-bg'>
                  </div>
                )}
                <div className='name'>{otherUserName}</div>
              </div>
            ))}
          </div>
        </div>
   
      </div>
      {!mobileView && showEditor && (
        <div className='right'>
          <div className='editor-div'>
            <div className='head'>
              <div className='head-title'>
                <img src={noteIcon} alt='' />
                <h3>Collaborative Whiteboard</h3>
              </div>
              <button
                className='download'
                onClick={() => downloadPdf()}
                title='Download whiteboard'
              >
                <GetAppIcon />
              </button>
            </div>
            <Editor />
          </div>
        </div>
      )}
      
    </div>
    </div>
    <div className='bar'>
    <Options navigate />
  </div>
    
    </div>
    
  );
};

export default Meet;
