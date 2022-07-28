import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/CreateRoom.module.css'
import { nanoid } from 'nanoid'
import toast from 'react-hot-toast'
export const CreateRoom = () => {
    const [roomId, setRoomId] = useState(nanoid())
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const handleClick = () => {
        let id = nanoid()
        setRoomId(id)
        console.log('roomId:', roomId)
        console.log('username:', username)
        toast.success("New Room Created")
        navigate(`/editor/${roomId}`)
    }
    return (
        <div className={styles.HomePageMain}>
            <div id={styles.parent}>
                <div></div>
                <div>Create an room</div>
                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="USERNAME" required />
                <button onClick={handleClick}>CREATE</button>
                <div>
                    <div>Join another room</div>
                    <Link to='/'>Join</Link>
                </div>
            </div>
        </div>
    )
}
