import React, { useState } from 'react'
import { EditorComponent } from '../Components/EditorComponent'
import { User } from '../Components/User'
import styles from '../Styles/Editor.module.css'
export const Editor = () => {
    let u1 = { socketId: 1, username: "Anshu singh" }
    let u2 = { socketId: 2, username: "Anshumaan Baaghi" }
    const [usersList, setUsersList] = useState([u1])
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
        </div>
    )
}
