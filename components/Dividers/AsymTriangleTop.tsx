import styles from './AsymTriangleTop.module.css'

export const AsymTriangleTop = (props: any) => {
    return (
        <div className={styles.divider} {...props}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 0L0 0 892.25 114.72 1200 0z"></path>
            </svg>
        </div>)
}

