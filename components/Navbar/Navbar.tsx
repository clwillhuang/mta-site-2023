import React from 'react'
import styles from './Navbar.module.css'
import UserDetails from '@/components/Navigation/UserDetails/UserDetails'
import { Session } from 'next-auth'

type NavbarProps = {
    session: Session | null,
}

export default function Navbar(props: NavbarProps) {

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
        <header className={styles.header}>
            <div className={styles.inner}>
                <nav>
                    <a href="/" className={styles.logo}>
                        <img src='/large-mta-logo.png'></img>
                    </a>
                    <input type="checkbox" id="nav" className={styles.toggle} /><label htmlFor="nav"></label>
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
                        <UserDetails session={props.session}/>
                    </ul>
                </nav>
            </div>
        </header>
    )
}


