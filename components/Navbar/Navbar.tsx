"use client"

import React, { useState } from 'react'
import styles from './Navbar.module.css'
import UserDetails from '@/components/Navigation/UserDetails/UserDetails'
import { Session } from 'next-auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { IUser } from '@/models/User'

type NavbarProps = {
    session: Session | null,
    user: IUser | null,
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
            link: '/contact',
            sublinks: [],
        },
    ]

    const [active, setActive] = useState(false);
    const { user } = props;

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.inner}>
                    <a href="/" className={styles.logo}>
                        <img src='/images/large-mta-logo.png'></img>
                    </a>
                    <FontAwesomeIcon icon={faBars} className={styles.toggle} onClick={() => setActive(!active)} />
                    <ul className={styles.desktopMenu}>
                        {links.map(x => {
                            return <li key={x.title}>
                                <a href={x.link}>{x.title}</a>
                                {x.sublinks.length > 0 &&
                                    <ul>
                                        {x.sublinks.map(sublink => <li key={sublink.title}><a href={sublink.link}>{sublink.title}</a></li>)}
                                    </ul>}
                            </li>
                        })}
                        <UserDetails session={props.session} user={user}/>
                    </ul>
                </div>
                <div>
                    <ul className={active ? styles.mobileMenu : styles.hideMenu}>
                        {links.map(x => {
                            return <li key={x.title}>
                                <a href={x.link}>{x.title}</a>
                                {x.sublinks.length > 0 &&
                                    <ul>
                                        {x.sublinks.map(sublink => <li key={sublink.title}><a href={sublink.link}>{sublink.title}</a></li>)}
                                    </ul>}
                            </li>
                        })}
                        <UserDetails session={props.session} user={user}/>
                    </ul>
                </div>
                    
            </nav>
        </header>
    )
}


