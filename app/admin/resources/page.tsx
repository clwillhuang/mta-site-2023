import React from 'react';
import styles from './ResourceCreate.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Layout from '@/components/Layout/Layout';
import ResourceForm from '@/components/Admin/Resource/ResourceForm/ResourceForm';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';

export default async function Page() {
	return (
		<Layout>
			<PaddedLayout addNavbarPadding>
			<a href='/admin' className={styles.backLink}><FontAwesomeIcon icon={faChevronLeft}/> Back to Dashboard</a>
			<h2>Create new resource</h2>
			<ResourceForm resource={null} create={true}/>
			</PaddedLayout>
		</Layout>
	);
}

export { Page }
