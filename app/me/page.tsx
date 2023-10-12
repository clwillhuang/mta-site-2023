import React from 'react'
import Layout from '../../components/Layout'
import styles from './Profile.module.css'
import SignupCard from '@/components/Profile/SignupCard'
import { getMe, getMySignups } from '../api/me/route'
import { redirect } from 'next/navigation'

/**
 * Return the dashboard page for profile page
 */
export default async function Page() {
    const data = await getMe();
    console.log("data for me", data)
    const { signups, user } = data;

    if (!user) {
        redirect('api/auth/signin')
    }

    return (
        <Layout>
            <h2>My account</h2>
            <p className={styles.headline}>
                <img src={user.picture} className={styles.image}></img>
                {user.username}
            </p>
            <strong>Email</strong>
            <p>{user.email}</p>
            <strong>Role</strong>
            <p>{user.role}</p>
            <h3>Event Signups</h3>
            <div>{signups && signups.map(signup => <SignupCard data={signup} />)}</div>
        </Layout>
    )
}