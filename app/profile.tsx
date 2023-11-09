import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import React from 'react'
import Layout from '../components/Layout/Layout'
import styles from './Profile.module.css'
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout'

/**
 * Return the dashboard page for profile page
 */
const Profile = (props) => {

    const { session } : { session: Session} = props
    const { user } = session;

    return( 
        <Layout session={session}>
          <PaddedLayout addNavbarPadding>
            <h2>My account</h2>
            <p className={styles.headline}>
            <img src={user?.image as string} className={styles.image}></img>
            {user?.name}
            </p>
            <strong>Email</strong>
            <p>{user?.email}</p>
            <strong>Role</strong>
            {/* <p>{user.role}</p> */}
            </PaddedLayout>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  
    return {
      props: { session }
    }
  }

export default Profile;