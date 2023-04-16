import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../../SocketContext';
import './JoinRoom.css';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import QUERIES, {
  Main,
  Midi,
  Heading,
  Full,
  Image,

} from '../../../theming/styles';
import { Awk1} from '../../../images';
import { Nav, Foot } from '../../index';
import { Spread } from '../../switch/styles';
import meetingImg from "../../../assets/meetingimg.png"

const JoinRoom = ({ toggleMode, mode, spread, setDisableScroll }) => {
  const navigate= useNavigate();
  const {
      callAccepted,
      name,
      setName,
      stream,
      setStream,
      callUser,
      meetingCode,
      setMeetingCode,
      newMeet,
    } = useContext(SocketContext);
  const spreadClass =
      spread === 'first'
          ? 'growBlack'
          : spread === 'second'
          ? 'growWhite'
          : '';
          useEffect(() => {
              if (!newMeet && meetingCode.length === 0) {
                  navigate('/');
                window.location.reload();
                return;
              }
              if (stream) return;
              navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((res) => {
                  res.getAudioTracks()[0].enabled = false;
                  setStream(res);
                });
            }, []);
          
            useEffect(() => {
              if (callAccepted) navigate('/chatRoom');
            }, [callAccepted]);
        
          

  return (
      <Main
          style={{
              position: 'relative',
              overflow: setDisableScroll ? 'hidden' : 'null',
              height: setDisableScroll ? '100vh' : 'unset',
          }}
      >
          <Spread className={spreadClass} />
          <Nav mode={mode} toggleMode={toggleMode} />
          <Midi style={{ mixBlendMode: 'difference' }}>
          <Heading
                  style={{
                      mixBlendMode: 'difference',
                      color: 'white',
                  }}
              >
                  Chat before and after meetings
          </Heading>
              <div className="join-rrom">
                  <label htmlFor="join-rrom" className="room-label">Enter your Name</label>
                  <input
                    type="text"
                    className='label-input' 
                    placeholder='Enter Your Name' 
                    value={name}
                    onChange={(e)=>{
                      setName(e.target.value)
                    }}    
                  />
                  {
                      newMeet ? (
                      <button 
                         className='btn-join-room'
                          onClick={()=>{
                              if(name.trim().length===0){
                                  message.error("Enter your Name");
                                  return ;
                              }
                              navigate('/chatroom')
                          }}   
                      >
                          Enter Room
                      </button>
                      ):(
                      <button 
                          className='btn-join-room'
                           onClick={()=>{
                               if(name.length===0){
                                  message.error('Please enter your name');
                                   return ;
                               }
                             //call the user with this id
                            callUser(meetingCode);
                           }}   
                       >
                           Join Room
                       </button>
                      )
                  }
                 
                  <button 
                  onClick={()=>{
                      navigate(-1);
                     
                      setMeetingCode('');
                  }}
                 
                  className='btn-join-room'>
                     Go Back
                  </button>
              </div>
              <img src={meetingImg} alt="meeting-img" className="meeting-img" />
          </Midi>
      </Main>
  );
};

export default JoinRoom ;
