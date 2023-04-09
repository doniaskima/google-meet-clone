import React, { useContext, useEffect, useRef } from 'react'
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
  const bgColor = 'bg-base-300';
  //reference for my video
  const myPreviewVideo = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!newMeet && meetingCode.length === 0) {
      navigate('/');
      window.location.reload();
      return;
    }
    //to get the video and audio
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        myPreviewVideo.current.srcObject = res;
      });
  }, []);

  return (
    <>
      
      <div className='flexbox-join-page'>
        <div className="flexbox-join-enter-button ">
          <h1 className="mb-8">Your video appears like this</h1>
          
          
          {/* video preview */}
          <div className='video-div'>
            {stream ? (
              <video
                src=''
                ref={myPreviewVideo}
                autoPlay
                muted
              ></video>
            ) : (
              <Spinner />
            )}
          </div>
          {/* video controls (mute/unmute, video off/video on) */}
          <div className="flexbox-control-aud-vid">
                <button
                  onClick={() => updateMicStatus()}
                  type='primary'
                  className={!myMicStatus ? 'bg-grey tooltip rounded-xl px-2 py-1 mr-2' : 'bg-white tooltip rounded-xl px-2 py-1 mr-2'}
                >
                   {' '}
              {myMicStatus ? <MicIcon /> : <MicOffIcon />}
             
                  
                </button>
                <button

                  onClick={() => updateVideoStatus()}
                    className={!myVideoStatus ? 'bg-grey tooltip rounded-xl px-2 py-1' : 'bg-white tooltip rounded-xl px-2 py-1'}
                >
                  {myVideoStatus ? <VideocamIcon /> : <VideocamOffIcon />}
                
                </button>
              </div>
        </div>
        {/* name input */}
        {stream && (
          <>
            <div className="flexbox-join-enter-button">
              <div className={`flexbox-join-enter ${bgColor}`}>
                <label class="field field_v1 text-white" >
                  <input
                    className= "py-4 text-black"
                    id="html"
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
              
                </label>

                {/* show start for the host and join for others */}
                {newMeet ? (
                  <button
                    className='bg-blue-500 text-white font-semibold px-5 py-1 rounded-full shadow-md'
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error("Enter your Name!");
      
                        return;
                      }
                      if(otherUser) showVideoToOtherUser();
                      console.log(otherUser);
                      navigate('/meet');
                    }}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className='bg-blue-500 text-white font-semibold px-5 py-1 rounded-full shadow-md'
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
                )}
                <button
                  className='bg-blue-500 text-white font-semibold px-5 py-1 rounded-full shadow-md' 
                  onClick={() => {
                    navigate('/chatRoom');
                  }}
                >
                  Leave
                </button>
              </div>
            </div>
          </>

        )}

      </div>
    </>
  );
};

export default Join;