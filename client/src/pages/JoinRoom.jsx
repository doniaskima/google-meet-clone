import React, { useContext } from 'react';
import QUERIES, {
    Main,
    Midi,
    Heading,
    Full,
    Image,

} from '../theming/styles';
import { Nav, Foot } from '../components';
import { Spread } from '../components/switch/styles';
import { Awk1} from '../images';
import { useNavigate } from 'react-router-dom';
import meetingImg from "../assets/meetingimg.png"
import { SocketContext } from '../SocketContext';


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
                        window.location.reload;
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
