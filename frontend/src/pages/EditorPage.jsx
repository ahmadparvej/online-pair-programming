import React,{ useRef, useEffect } from 'react'
import { initSocket } from './../socket';
// import {useLocation} from 'react-router-dom'


const EditorPage = () => {
    // const location = useLocation()
    const socketRef = useRef(null);
    useEffect(()=>{
        const init = async()=>{
            // socketRef.current = await initSocket()
            // socketRef.current.on('connect_error',(err)=>handleErrors(err))
            // socketRef.current.on('connect_failed',(err)=>handleErrors(err))

            // function handleErrors(e) {
            //     console.log('socket error',e);
            //     toast.error("Socket connection failed, try again later");
            //     reactNavigator('/')
            // }
            // socketRef.current.emit(ACTIONS.JOIN,{
            //     roomId,
            //     username:location.state?.username
            // })
        }
        init();
    },[])
  return (
    <div>EditorPage</div>
  )
}

export default EditorPage