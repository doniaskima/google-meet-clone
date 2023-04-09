import React, { useRef } from 'react'
import { SocketContext } from '../SocketContext';
import { useNavigate } from 'react-router-dom';

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
    <div>Join</div>
  )
}

export default Join