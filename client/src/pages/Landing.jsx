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
import { SocketContext } from '../SocketContext';


const Landing = ({ toggleMode, mode, spread, setDisableScroll , props }) => {
    const navigate= useNavigate();
   
      
    const { meetingCode, setMeetingCode, setNewMeet } = useContext(SocketContext);
    
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
                    <span style={{ fontWeight: 300 }}>Welcome</span>{' '}
                    <br />
                    <span style={{ fontStyle: 'italic' }}>   Video Meeting app</span>  
                    <br />
                    <span style={{ fontWeight: 300 }}>Wanna Join ?</span>{' '}
                </Heading>
             
            <div style={{ mixBlendMode: 'difference' }} className="create-room">
                 <button 
                 onClick={() => {
                    setNewMeet(true);
                    navigate('/joinRoom');
                  }}
                 className="btn-create-room">
                    Create Room
                 </button>
                <span className="span-label" >Or</span>
                <input 
                type="text"  
                className="label-input" 
                value={meetingCode || ''}
                onChange={(e)=>{
                    setMeetingCode(e.target.value);
                 }}
                placeholder='Enter code room to join '/>
             </div>
             {
                meetingCode.length > 0 && 
                <button 
                onClick={() => {
                    if (!meetingCode || meetingCode.trim().length === 0) {
                        message.error('Please enter the meeting code');
                        return;
                      }
                      navigate('/joinRoom');
                 }}
                className="btn-create-room">
                   Join Room
                </button>
             }
            </Midi>
            

            <Full>
                <Image style={{ backgroundImage: `url(${Awk1})` }} />
            </Full>
            <Foot />
        </Main>
    );
};

export { Landing };
