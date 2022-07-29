import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/Home.module.css'
export const Home = () => {
    const [roomId, setRoomId] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const handleClick = () => {
        if (!username || !roomId) {
            toast.error("Room Id & Username is required")
        }
        else {
            navigate(`/editor/${roomId}`, {
                state: {
                    username
                }
            })
        }
    }
    return (
        <div className={styles.HomePageMain}>
            <div id={styles.parent}>
                <div></div>
                <div>Please enter your roomId and username!</div>
                <input onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="ROOM ID" required />
                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="USERNAME" required />
                <button onClick={handleClick}>JOIN</button>
                <div>
                    <div>Create Your Own Room</div>
                    <Link to='/create'>Create</Link>
                </div>
            </div>
        </div>
    )
}
