import React from 'react';
import styles from './HomepageEvent.module.css';
import Image from 'next/image'
import BlurPlaceholder from '../BlurPlaceholder/BlurPlaceholder';
import { domain } from '@/app/url';

export type HomepageEventProps = {
	title: string,
	link: string | null,
	description: string | null,
	image: any
}

function HomepageEvent({ title, link, description, image }: HomepageEventProps) {
	return (
		<div className={styles.eventCard}>
			<a className={styles.link} href={link} />
			<div className={styles.imgContainer}>
				<Image
					src={`${domain}${image}`}
					fill
					alt={`Event image for ${title}`}
					placeholder='blur'
                	blurDataURL={BlurPlaceholder()}
					/>
			</div>
			<h4 className={styles.title}>{title}</h4>
			{description && <p className={styles.description}>{description}</p>}
		</div>
	)
}

export default HomepageEvent;