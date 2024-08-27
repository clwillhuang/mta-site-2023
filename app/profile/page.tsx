import React from 'react'
import Layout from '@/components/Layout/Layout'
import styles from './Profile.module.css'
import SignupCard from '@/components/Profile/SignupCard'
import { getMe, getMySignups } from '../api/me/route'
import { redirect } from 'next/navigation'
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout'
import customizeMetadata from '@/components/Head/Head'
import DeleteAccountButton from '@/components/Profile/DeleteAccountButton'

/**
 * Return the dashboard page for profile page
 */
export default async function Page() {
    const data = await getMe();
    const { signups, user } = data;

    if (!user) {
        redirect('api/auth/signin')
    }

    return (
        <Layout header={<></>}>
            <PaddedLayout addNavbarPadding>
                <h2>My account</h2>
                <hr className={styles.hr}/>
                <p className={styles.headline}>
                    <img src={user.picture} className={styles.image}></img>
                    {user.username}
                </p>
                <strong>Email</strong>
                <p>{user.email}</p>
                <strong>Role</strong>
                <p>{user.role}</p>

                <DeleteAccountButton/>
                
                <hr className={styles.hr}/>

                <h2>My Events</h2>
                <p style={{marginBottom: '15px'}}>These are events that you have expressed interest for. To attend events, ensure that you have separately completed the signup process for that specific form!</p>
                <div>{signups && signups.map((signup, index) => <SignupCard data={signup} key={'signup'+index}/>)}</div>
            </PaddedLayout>
        </Layout>
    )
}

export const metadata = customizeMetadata({
    title: 'My profile',
    description: 'View my account details.',
    disableCrawling: true
})