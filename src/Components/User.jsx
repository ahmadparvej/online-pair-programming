import React from 'react'
import styles from '../Styles/User.module.css'
import Avatar from 'react-avatar'
export const User = ({ username }) => {
    return (
        <div className={styles.UserMainDiv}>
            <Avatar name={username} size="50px" round="14px" />
            <div className={styles.username}>{username}</div>
        </div>
    )
}
