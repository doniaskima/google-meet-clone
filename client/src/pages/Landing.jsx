import React from 'react';
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


const Landing = ({ toggleMode, mode, spread, setDisableScroll }) => {
    const navigate= useNavigate();
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
                 onClick={()=>navigate("/joinRoom")}
                 className="btn-create-room">
                    Create Room
                 </button>
                <span className="span-label" >Or</span>
                <input type="text"  className="label-input" placeholder='Enter code room to join '/>
             </div>
            </Midi>
            

            <Full>
                <Image style={{ backgroundImage: `url(${Awk1})` }} />
            </Full>
            <Foot />
        </Main>
    );
};

export { Landing };
