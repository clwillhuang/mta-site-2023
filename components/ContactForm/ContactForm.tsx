'use client'

import styles from './ContactForm.module.css'

export default () => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/message', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Message sent successfully!');
        } else {
            console.error('Failed to send message.');
        }
    };


    return (
        <div id='contact' className={styles.screenContainer}>
            <div className={styles.contact}>
                <div className={styles.contactLeft}>
                    <h2>Contact</h2>
                    <p>We'd love to get in touch!</p>

                    <form onSubmit={handleSubmit} className={styles.form} encType="text/plain">
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="senderName">Name</label>
                                <input type="text" id="senderName" name="senderName" placeholder='Jane Doe' required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Contact Email</label>
                                <input type="email" id="email" name="email" required placeholder='email@domain.com' />
                            </div>
                        </div>
                        <label htmlFor="subjectLine">Subject</label>
                        <input type="text" id="subjectLine" name="subjectLine" placeholder='Write a descriptive subject line' required />
                        <label htmlFor="message">Message</label>
                        <textarea rows={6} id="message" name="message" placeholder='Write your message here.' required></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div className={styles.contactRight}>
                    <img src='/large-mta-logo.png' />
                </div>
            </div >
        </div >
    )
}