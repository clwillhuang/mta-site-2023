import Layout from '@/components/Layout/Layout';
import customizeMetadata from '@/components/Head/Head';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';
import 'animate.css'
import ContactForm from '@/components/ContactForm/ContactForm';

export default async function Team() {
    return (
        <Layout>
            <PaddedLayout addNavbarPadding>
                <ContactForm />
            </PaddedLayout>
        </Layout>
    )
}

export const metadata = customizeMetadata({
    title: 'Contact',
    description: 'Reach out to Management Technology Association at UTSC via email, social media, or message.'
})