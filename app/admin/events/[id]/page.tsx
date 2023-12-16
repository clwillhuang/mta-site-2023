import React from 'react';
import styles from './Edit.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ClubEvent from '@/models/Event';
import { notFound } from 'next/navigation';
import EventForm from '@/components/Admin/Event/EventForm/EventForm';
import Layout from '@/components/Layout/Layout';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';
import customizeMetadata from '@/components/Head/Head';
import { Metadata } from 'next';
import { getEvent } from '@/app/api/events/[id]/route';
import dbConnect from '@/lib/dbConnect';

export default async function Page({ params }: { params: { id: string } }) {

	const id = params.id;
	await dbConnect();
	const event = await getEvent(id);

	if (!event) notFound();

	return (
		<Layout>
			<PaddedLayout addNavbarPadding>
				<a href='/admin' className={styles.backLink}><FontAwesomeIcon icon={faChevronLeft} /> Back to Dashboard</a>
				<h2>Modify event details</h2>
				<p>ID: {event._id.toString()}</p>
				<EventForm event={event} create={false} />
			</PaddedLayout>
		</Layout>
	);
}


export const metadata: Metadata = customizeMetadata({title: 'Edit event', disableCrawling: true})
