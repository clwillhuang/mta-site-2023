import React from 'react';
import styles from './Edit.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ClubEvent from '@/models/Event';
import { notFound } from 'next/navigation';
import EventForm from '@/components/Admin/Event/EventForm/EventForm';
import Layout from '@/components/Layout/Layout';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';

export default async function Page({ params }: { params: { id: string } }) {

	const id = params.id;
	const event = await ClubEvent.findById(id);

	if (!event) notFound();

	return (
		<Layout>
			<PaddedLayout addNavbarPadding>
				<a href='/admin' className={styles.backLink}><FontAwesomeIcon icon={faChevronLeft} /> Back to Dashboard</a>
				<h2>Modify event details</h2>
				<p>ID: {event._id}</p>
				<EventForm event={event} />
			</PaddedLayout>
		</Layout>
	);
}

export { Page }
