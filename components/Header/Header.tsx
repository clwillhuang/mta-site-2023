import { ReactNode } from 'react';
import styles from './Header.module.css'
import Image from 'next/image'
import { AsymTriangleTop } from '../Dividers/AsymTriangleTop';
import BlurPlaceholder from '../BlurPlaceholder/BlurPlaceholder';

export type HeaderImageProps = {
    src: any,
    alt: string
}

export type HeaderProps = {
    title: string,
    subtitle: string,
    children: JSX.Element[] | JSX.Element
    contentClassName: string,
    image?: HeaderImageProps;
    divider?: JSX.Element
}

const Header = ({ title, subtitle, children, contentClassName, image, divider }: HeaderProps) => {

    return (
        <div className={styles.headerContainer}>
            {
            image &&
                <div className={styles.imageContainer}>
                    <Image src={image.src} fill={true} alt={image.alt} objectFit='cover' placeholder='blur'
                blurDataURL={BlurPlaceholder()} />
                </div>
            }
            <div className={styles.headerBackground}/>
            <div className={styles.headerContentBackground}>
                <div className={`${styles.headerContent} ${contentClassName}`}>
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                    {children}
                </div>
            </div>
            {divider && divider}
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