//component for landing page
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import { message } from 'antd';
import MeetingSVG from './MeetingSVG';
import SecureSVG from './SecureSVG';
import CollaborationSVG from './CollaborationSVG';
import {  useNavigate } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate();
    const paramsCode = props.location ? props.location.search : '';
    
    const { meetingCode, setMeetingCode, setNewMeet } = useContext(SocketContext);
  
    useEffect(() => {
      if (paramsCode.length) {
        if (paramsCode.substring(0, 5) == '?ref=') return;
        setMeetingCode(paramsCode.substring(1));
      }
      setNewMeet(null);
    }, []);
  
  return (
    <div className="home-meet-join-container">
    <button
      className="home-meeting-start"
      onClick={() => {
        setNewMeet(true);
        navigate('/joinRoom');
      }}>
      Create Room
    </button>
    or
    <input
      className="home-meeting-code"
      type='text'
      placeholder='Enter room code to join'
      value={meetingCode || ''}
      onChange={(e) => {
        setMeetingCode(e.target.value);
      }} />
    {meetingCode.length > 0 && <button
      className="home-join-meeting"
      onClick={() => {
        if (!meetingCode || meetingCode.trim().length === 0) {
          message.error('Please enter the meeting code');
          return;
        }
        navigate('/joinRoom');
      }}>
      Join Room
    </button>
    }
  </div>
  )
}

export default Home