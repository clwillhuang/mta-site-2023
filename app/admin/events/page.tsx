import React from 'react';
import styles from './EventCreate.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Layout from '@/components/Layout/Layout';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';
import EventForm from '@/components/Admin/Event/EventForm/EventForm';
import customizeMetadata from '@/components/Head/Head';

export default async function Page() {
    return (
        <Layout>
            <PaddedLayout addNavbarPadding>
                <a href='/admin' className={styles.backLink}><FontAwesomeIcon icon={faChevronLeft} /> Back to Dashboard</a>
                <h2>Create new event</h2>
                <EventForm create={true} />
            </PaddedLayout>
        </Layout>
    );
}

export const metadata = customizeMetadata({title: 'Add new event'})
