import { ReactNode } from 'react';
import styles from './Header.module.css'

type HeaderProps = {
    title: string,
    subtitle: string,
    children: JSX.Element[] | JSX.Element
    contentClassName: string
}

const Header = ({ title, subtitle, children, contentClassName }: HeaderProps) => {
    return (
        <div className={styles.headerContainer}>
            <div className={`${styles.headerContent} ${contentClassName}`}>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
                {children}
            </div>
        </div>
    )
}

Header.defaultProps = {
    title: '',
    subtitle: '',
    children: null,
    contentClassName: ''
};

Header.defaultProps = {
    event: {
        subtitle: ''
    },
};


export default Header;