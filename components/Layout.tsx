import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session, getServerSession } from 'next-auth';
import styles from './Layout.module.css'
import Navbar from './Navbar';

type LayoutProps = {
    children: JSX.Element[] | JSX.Element
    session: Session | null,
    header: JSX.Element[] | JSX.Element
}

export default async function Layout({children, header}: LayoutProps) {

    const session = await getServerSession(authOptions);

    return(
        <div>
            <Navbar session={session}/>
            {header}
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

Layout.defaultProps = {
    children: null,
    session: null,
    header: null,
};
