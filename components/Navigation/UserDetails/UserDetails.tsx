'use client'

import { Session } from 'next-auth/core/types'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import styles from './UserDetails.module.css'
import { IUser } from '@/models/User'

type UserDetailsProps = {
    session: Session | null,
    user: IUser | null,
}

// Show a user dropdown when clicking on the user
// icon in the navigation bar
const UserDetails = ({ session, user }: UserDetailsProps) => {
    const [active, setActive] = useState(false);

    const startLogout = () => {
        signOut({
            callbackUrl: '/'
        });
    }

    if (user) {
        return (
            <li className={styles.parent}>
                <div className={styles.preview}>
                    <img
                        className={styles.userImage}
                        src={user?.picture}
                        referrerPolicy="no-referrer"
                        onClick={() => setActive(!active)} />
                </div>
                {
                    active &&
                    <div className={styles.dropdown}>
                        <ul>
                            <li>
                                <a href='/profile'>My Profile</a>
                            </li>
                            
                            {
                                user.role === 'ADMIN' && 
                                <li>
                                    <a href='/admin'>Dashboard</a>
                                </li>
                            }
                            <li>
                                <button onClick={() => startLogout()}>Logout</button>
                            </li>
                        </ul>
                    </div>
                }
            </li>
        )
    } else {
        return (<li><a href="/api/auth/signin">Login</a></li>)
    }
}

export default UserDetails;