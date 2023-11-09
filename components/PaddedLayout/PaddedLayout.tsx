import { CSSProperties } from 'react'
import styles from './PaddedLayout.module.css'

type LayoutProps = {
    children?: JSX.Element[] | JSX.Element
    className?: string,
    style?: CSSProperties,
    addNavbarPadding?: boolean
}

export default async function PaddedLayout({ children, style, className, addNavbarPadding }: LayoutProps) {
    let computedClassName = `${styles.container}`
    computedClassName = computedClassName + ' ' + (className && className) 
    computedClassName = computedClassName + ' ' + (addNavbarPadding && styles.navbarPadding)
        
    return (
        <div style={style} className={computedClassName}>
            {children}
        </div>
    )
}
