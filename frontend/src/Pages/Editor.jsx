import { EditorComponent } from '../Components/EditorComponent'
import { User } from '../Components/User'
import styles from '../Styles/Editor.module.css'
import React,{useState, useRef, useEffect } from 'react'
import { initSocket } from './../socket';
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast';

const ACTIONS = require("../Actions.js");

export const Editor = () => {
    const {roomId} = useParams()
    const reactNavigator = useNavigate()
    const location = useLocation()
    const socketRef = useRef(null);
    console.log(location);

    let u1 = { socketId: 1, username: "Anshu singh" }
    let u2 = { socketId: 2, username: "Anshumaan Baaghi" }
    const [usersList, setUsersList] = useState([u1])

    useEffect(()=>{
        const init = async()=>{
            socketRef.current = await initSocket()
            socketRef.current.on('connect_error',(err)=>handleErrors(err))
            socketRef.current.on('connect_failed',(err)=>handleErrors(err))

            function handleErrors(e) {
                console.log('socket error',e);
                toast.error("Socket connection failed, try again later");
                reactNavigator('/')
            }
            socketRef.current.emit(ACTIONS.JOIN,{
                roomId,
                username:location.state?.username
            })

            socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
                if(username!==location.state?.username){
                    toast.success(`${username} joined the room`)
                    console.log(`${username} joined`);
                }
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
    return (
        <div className={styles.EditorMainDiv}>
            <div className={styles.EditorSideBar}>
                <div></div>
                <div>
                    <h3>Connected</h3>
                    <div className={styles.ConnectedUsersList}>
                        {usersList.map((el) => (
                            <User key={el.socketId} username={el.username} />
                        ))}
                    </div>
                </div>
                <div>
                    <button>Copy Room Id</button>
                    <button>Leave</button>
                </div>
            </div>
            <div className={styles.EditorTeminalDiv}>
                <EditorComponent className={styles.EditorComponent} />
            </div>
        </div>)
}
