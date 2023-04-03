import { useEffect , createContext , useState } from "react";
import Peer from "simple-peer";
import {io} from "socket.io-client";
import {message} from "antd";
import { BACKEND_URL } from "./constants";
const SocketContext = createContext();

const socket= io(BACKEND_URL);

const ContextProvider = ({children})=>{
    const [socketState, setSocketState] = useState(socket);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [otherUserName, setOtherUserName] = useState('');
    const [userVideoStatus, setUserVideoStatus] = useState(true);
    const [myMicStatus, setMyMicStatus] = useState(false);
    const [userMicStatus, setUserMicStatus] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    useEffect(()=>{
        if(!navigator.online) alert('Connect to internet!');
    },[navigator]);

    useEffect(()=>{
        socket.on('me',(id)=>{
            setMe(id);
        });
        socket.on('calluser',({from, name: callerName, signal })=>{
            setCall({
                from,
                callerName,
                signal,
                isRecievedCall: true,
            });
            setOtherUserName(callerName);
        });
        socket.on('updateUserMedia',({type,mediaStatus})=>{
            if(!type || !mediaStatus || !mediaStatus.length ){
                return ;
            }
            if(type==='video'){
                console.log(mediaStatus);
                message.info(`User turned ${mediaStatus[0] ? 'on' : 'off'} video`);
                setUserVideoStatus(mediaStatus[0]);
                return;
            }
            if(type=="audio"){
                console.log(mediaStatus);
                message.info(`User ${mediaStatus[0] ? 'unmuted' : 'muted'} mic`);
                setUserMicStatus(mediaStatus[0]);
                return ;
            }
            setUserMicStatus(mediaStatus[0]);
            setUserMicStatus(mediaStatus[1]);
        });

        socket.on('callended',()=>{
            setCall(null);
            setShowOtherUserVideo(false);
            message.info('User disconnected from call');
            setCallEnded(true);

        })

    },[])
}
