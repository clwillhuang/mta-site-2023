'use client'

import { Session } from 'next-auth/core/types'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './UserDetails.module.css'

type UserDetailsProps = {
    session: Session | null,
}

// Show a user dropdown when clicking on the user
// icon in the navigation bar
const UserDetails = ({ session }: UserDetailsProps) => {
    const [active, setActive] = useState(false);

    const startLogout = () => {
        signOut({
            callbackUrl: '/'
        });
    }   

    console.log
    console.log(session?.user?.image)

    if (session) {
        return (
            <li className={styles.parent}>
                <div className={styles.preview}>
                    <img className={styles.userImage} src={session.user?.image} onClick={() => setActive(!active)}/>
                </div>
                {
                    active &&
                    <div className={styles.dropdown}>
                        <ul>
                            <li>
                                <a href='/me'>My Profile</a>
                            </li>
                            <li>
                                <a href='/admin'>Dashboard</a>
                            </li>
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