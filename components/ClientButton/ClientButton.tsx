'use client'

import styles from './ClientButton.module.css'

type ClientButtonProps = {
    url: string,
    method: string,
    children?: JSX.Element | JSX.Element[],
    buttonProps: any,
    confirmMessage?: string,
}

const ClientButton = ({url, method, children, buttonProps, confirmMessage}: ClientButtonProps) => {

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
            const requestOptions = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
            };
            if (confirmMessage) {
                if (confirm(confirmMessage) != true) {
                    return;
                }
            }
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => { window.location.replace('/admin') })
                .catch((err) => { console.log(err)})
        }
    
    const finalProps = {
        ...buttonProps,
        className: `${buttonProps.className} ${styles.button}`
    }

    return (
        <a onClick={onClick} {...finalProps}>
            {children}
        </a>
    )
}

export default ClientButton;