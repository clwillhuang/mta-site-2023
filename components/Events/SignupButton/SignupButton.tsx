'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SignupButton.module.css'
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react'
import { ISignup } from '@/models/Signup'

/**
 * Show a signup button for users.
 */
export default ({signup, _id}: {signup: ISignup | null, _id: string}) => {

    const [isSignedUp, setIsSignedUp] = useState(!!signup);
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

    useEffect(() => {
        setIsSignedUp(!!signup);
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
    
        fetch(`/api/events/${_id}/signups`, requestOptions)
            .then((response) => response.json())
            .then((data) => { 
                console.log(data)
            });
    }, [_id])

    if (isSignedUp) {
        const signupDate = signup && (new Date(signup.date)).toLocaleString('en-US', options);
        return(
            <p className={styles.signup}><FontAwesomeIcon icon={faUserCheck}/> You signed up on {signupDate}</p>
        )
    } else {
        return(
            <button onClick={onSignup}>Signup</button>
        )
    }
}


