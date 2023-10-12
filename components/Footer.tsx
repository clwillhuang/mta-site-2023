import React from 'react'
import styles from './Footer.module.css'

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
            link: '/#contact',
            sublinks: [],
        },
    ]

  return (
    <footer className={styles.header}>
        <div className={styles.inner}>
            <a href="#" className={styles.logo}>
                <img src='/large-mta-logo.png'/>
            </a>
            <ul className={styles.list}>
                {links.map(x => {
                    return <li key={x.title}>
                        <a href={x.link}>{x.title}</a>
                        {x.sublinks.length > 0 && 
                        <ul>
                            {x.sublinks.map(sublink => <li key={sublink.title}><a href={sublink.link}>{sublink.title}</a></li>)}    
                        </ul>}
                    </li>
                })}
                <li><a href="#">Login</a></li>
            </ul>
        </div>
            <p className={styles.credits}>© 2023 Management Technology Association. All rights reserved.</p>
    </footer>
  )
}

export default Footer