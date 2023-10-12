import React from 'react';
import styles from './ResourceCreate.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Layout from '@/components/Layout';
import ResourceForm from '@/components/Admin/Resource/ResourceForm/ResourceForm';

export default async function Page() {
	return (
		<Layout>
			<a href='/admin' className={styles.backLink}><FontAwesomeIcon icon={faChevronLeft}/> Back to Dashboard</a>
			<h2>Create new resource</h2>
			<ResourceForm resource={null} create={true}/>
		</Layout>
	);
}

export { Page }
