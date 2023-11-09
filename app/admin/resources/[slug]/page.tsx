import React from 'react';
import styles from './ResourceEdit.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import { getResource } from '@/app/api/resources/[slug]/route';
import ResourceForm from '@/components/Admin/Resource/ResourceForm/ResourceForm';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';

export default async function Page({ params }: { params: { slug: string } }) {

	const slug = params.slug;
	const resource = await getResource(slug);

	if (!resource) notFound();

	return (
		<Layout>
			<PaddedLayout addNavbarPadding>
				<a href='/admin' className={styles.backLink}><FontAwesomeIcon icon={faChevronLeft} /> Back to Dashboard</a>
				<h2>Modify resource page details</h2>
				<p>ID: {resource._id}</p>
				<p>Slug: {resource.slug}</p>
				<ResourceForm resource={resource} create={false} />
			</PaddedLayout>
		</Layout>
	);
}

export { Page }
