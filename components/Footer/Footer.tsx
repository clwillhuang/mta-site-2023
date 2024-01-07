import React from 'react'
import styles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {

    const links = [
        {
            title: 'About',
            link: '/#about',
            sublinks: [],
        },
        {
            title: 'Events',
            link: '/events',
            sublinks: [],
        },
        {
            title: 'Resources',
            link: '/resources',
            sublinks: [],
        },
        {
            title: 'Team',
            link: '/team',
            sublinks: [],
        },
        {
            title: 'Contact',
            link: '/contact',
            sublinks: [],
        },
    ]

    return (
        <footer className={styles.header}>
            <div className={styles.inner}>
                <a href="/" className={styles.logo}>
                    <img src='/large-mta-logo.png' />
                </a>
                <div className={styles.socials}>
                    <a href="mailto:mtecha.utsc@gmail.com">
                        <FontAwesomeIcon icon={faEnvelope} size='2x' />
                    </a>
                    <a href="https://www.linkedin.com/company/mtautsc/">
                        <FontAwesomeIcon icon={faLinkedin} size='2x' />
                    </a>
                    <a href="https://www.facebook.com/mtautsc/">
                        <FontAwesomeIcon icon={faFacebook} size='2x' />
                    </a>
                    <a href="https://www.instagram.com/mtautsc/">
                        <FontAwesomeIcon icon={faInstagram} size='2x' />
                    </a>
                </div>
                <ul className={styles.list}>
                    {links.map(x => {
                        return <li key={x.title}>
                            <a href={x.link}>{x.title}</a>
                            {/* Future support for nested links: */}
                            {/* {x.sublinks.length > 0 &&
                                <ul>
                                    {x.sublinks.map(sublink => <li key={sublink.title}><a href={sublink.link}>{sublink.title}</a></li>)}
                                </ul>} */}
                        </li>
                    })}
                </ul>

            </div>
            <p className={styles.credits}>© 2023 Management Technology Association. All rights reserved.</p>
        </footer>
    )
}

export default Footer