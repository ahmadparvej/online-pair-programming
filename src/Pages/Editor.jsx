import { EditorComponent } from '../Components/EditorComponent'
import { User } from '../Components/User'
import styles from '../Styles/Editor.module.css'
import React,{useState, useRef, useEffect } from 'react'
import { initSocket } from './../socket';
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { SiCodemirror } from "react-icons/si";
import Chatroom from './../Components/Chatroom';

const ACTIONS = require("../Actions.js");

export const Editor = () => {

    const {roomId} = useParams()
    const reactNavigator = useNavigate()
    const location = useLocation()
    const socketRef = useRef(null);
    const codeRef = useRef(null)
    let u1 = { socketId: 1, username: "Anshu singh" }
    let u2 = { socketId: 2, username: "Anshumaan Baaghi" }
    const [clients, setClients] = useState([])

    useEffect(()=>{
        const init = async()=>{
            socketRef.current = await initSocket()
            socketRef.current.on('connect_error',(err)=>handleErrors(err))
            socketRef.current.on('connect_failed',(err)=>handleErrors(err))

            function handleErrors(e) {
                console.log('socket error',e);
                toast.error("Socket connection failed, try again later");
                // reactNavigator('/')
            }
            socketRef.current.emit(ACTIONS.JOIN,{
                roomId,
                username:location.state?.username
            })
            // JOINED
            socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
                if(username!==location.state?.username){
                    toast.success(`${username} joined the room`)
                    console.log(`${username} joined`);
                }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE,{
                        code:codeRef.current,
                        socketId
                    })
                })
                
                //DISCONNECTED 
                socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
                    toast.success(`${username} left the room`)
                    setClients((prev)=>{
                            return prev.filter((client)=>client.socketId!==socketId)
                    })
                })
        }
        init();
        return ()=>{
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED)
            socketRef.current.off(ACTIONS.DISCONNECTED)
        }
    },[])

    if(!location.state){
        return <Navigate to="/"/>
    }

    const copyRoomId=async()=>{
        try {
            await navigator.clipboard.writeText(roomId)
            toast.success(`Room Id Copied`)
        } catch (error) {
            toast.error('Could not copy')
        }
    }
    const leaveRoom =()=>{
        reactNavigator("/");
    }
    return (
        <div className={styles.EditorMainDiv}>
            <div className={styles.EditorSideBar}>
                <div>
                <div className={styles.logo}>
                    <p className={styles.logoIcon}><SiCodemirror/></p>
                    <p className={styles.logoName}>{"Code Together"}</p>
                </div>
                <div className={styles.devider}></div>
                </div>
                <div>
                    <h6>Connected</h6>
                    <div className={styles.ConnectedUsersList}>
                        {clients.map((el) =>{
                            if (el.username) {
                                return <User key={el.socketId} username={el.username} />
                            }
                        })}
                    </div>
                </div>
                <div>
                    <button onClick={copyRoomId}>Copy Room Id</button>
                    <button onClick={leaveRoom}>Leave</button>
                </div>
            </div>
            <div className={styles.EditorTeminalDiv}>
                <EditorComponent socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>{codeRef.current=code}}/>
            </div>
            <div className={styles.Chat}>
                <Chatroom/>
            </div>
        </div>
        )
}
