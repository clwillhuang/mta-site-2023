import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session, getServerSession } from 'next-auth';
import styles from './Layout.module.css'
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { getUser } from '@/app/getUser';

type LayoutProps = {
    children: JSX.Element[] | JSX.Element
    session: Session | null,
    header: JSX.Element[] | JSX.Element
}

export default async function Layout({children, header}: LayoutProps) {

    const session = await getServerSession(authOptions);
    const user = await getUser()

    return(
        <div>
            <Navbar session={session} user={user}/>
            {header}
            <div className={styles.container}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    children: null,
    session: null,
    header: null,
};
