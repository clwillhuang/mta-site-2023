'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SignupButton.module.css'
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react'
import { ISignupData } from '@/models/Signup'

/**
 * Show a signup button for users.
 */

interface SignupButtonProps { 
    signup: ISignupData | null, 
    _id: string, 
    has_session: boolean,
}

export default function SignupButton({ signup, _id, has_session }: SignupButtonProps) {

    // const { data: session, status } = useSession()
    const [data, setData] = useState(signup)
    const [submitting, setSubmitting] = useState(false); // Track submission status
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

    useEffect(() => {
        setData(signup);
    }, [signup])

    const onSignup = useCallback(() => {
        const postData = {
            event: _id
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        setSubmitting(true); // Start submission

        fetch(`/api/events/${_id}/signups`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setData(data.newSignup)
            })
            .finally(() => {
                setSubmitting(false); // End submission
            });
    }, [_id])
    if (has_session) {
        if (!!data) {
            const signupDate = data && (new Date(data.date)).toLocaleString('en-US', options);
            return (
                <p className={styles.signup}><FontAwesomeIcon icon={faUserCheck} /> You indicated your interest for this event on {signupDate}. </p>
            )
        }
        else {
            return (
                <button className={styles.button} onClick={onSignup} disabled={submitting}>{submitting ? "Loading ..." : "I am interested in this event."}</button>
            )
        }
    } else {
        return null;
    }
}


