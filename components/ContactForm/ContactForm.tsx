'use client'

import styles from './ContactForm.module.css'

export default function ContactForm() {
    return (
        <div id='contact' className={styles.screenContainer}>
            <div className={styles.contact}>
                <div className={styles.contactLeft}>
                    <h2>Contact</h2>
                    <p>We would love to get in touch!</p>
                    <p>You can contact us via email (mtecha.utsc@gmail.com), social media or this form.</p>

                    <form action="https://formspree.io/f/mbjnjqbe"
                        method="POST" className={styles.form}>
                        <label htmlFor="name">Name
                            <input type="text" id="name" name="name" placeholder='Jane Doe' required />
                        </label>
                        <label htmlFor="email">Contact Email
                            <input type="email" id="email" name="email" required placeholder='email@domain.com' />
                        </label>
                        {/* <label htmlFor="subjectLine">Subject</label>
                        <input type="text" id="subjectLine" name="subjectLine" placeholder='Write a descriptive subject line' required /> */}
                        <label htmlFor="message">Message
                            <textarea rows={6} id="message" name="message" placeholder='Write your message here.' required></textarea>
                        </label>
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div className={styles.contactRight}>
                    <img src='/images/large-mta-logo.png' />
                </div>
            </div >
        </div >
    )
}