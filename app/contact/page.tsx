import Layout from '@/components/Layout/Layout';
import customizeMetadata from '@/components/Head/Head';
import 'animate.css'
import styles from '@/components/PaddedLayout/PaddedLayout.module.css'
import ContactForm from '@/components/ContactForm/ContactForm';

export default async function Team() {
    return (
        <Layout>
            <div className={styles.navbarPadding}/>
            <ContactForm />
        </Layout>
    )
}

export const metadata = customizeMetadata({
    title: 'Contact',
    description: 'Reach out to Management Technology Association at UTSC via email, social media, or message.'
})