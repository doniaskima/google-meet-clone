//component for showing chat bubbles
import { useContext } from 'react';
import './Messages.css';
import { SocketContext } from '../../SocketContext';

const Message = (props) => {
  const { me, otherUserName, name } = useContext(SocketContext);

  return (
    <div
      className={props.message.user == me ? 'message-div tr' : 'message-div tl'}
    >
      <div className="message-data">
        {props.message.user !== me && <div className="other-user-name">{otherUserName}</div>}
        {props.message.user === me && <div>You</div>}
        <div className={props.message.user == me ? 'message-send badge-primary' : 'message-send-by bg-dark'}>  {props.message.text}</div>
        <div className= {props.message.user == me ? 'time-1' : 'time-2'}>{props.message.time}</div>
      </div>


    </div>
  );
};

export default Message;