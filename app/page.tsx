import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { aboutTimelineData } from '@/data/about-timeline';
import { TimelineEvent } from '@/models/TimelineEvent';
import styles from './page.module.css'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContactForm from '@/components/ContactForm/ContactForm';

export default async function Home() {

	const title = 'Welcome to MTA'
	const subtitle = 'We are MTA, the Management Technology Association at the University of Toronto. We strive to the deliver student events and experiences that develop skills in management, information technology, and statistics.'

	const timeline: Array<TimelineEvent> = aboutTimelineData;
	const session = await getServerSession(authOptions);

	return (
		<>
			<NextAuthProvider>
				<Navbar session={session}/>
			</NextAuthProvider>
			<Header contentClassName={styles.content} title={title} subtitle={subtitle}>
				<img src='/large-mta-logo.png'></img>
			</Header>
			<div id='about' className={styles.timelineContainer}>
				<div className={styles.timelineLine} />
				<h2 className={styles.about}>About Us</h2>
				{
					timeline.map((point, index) => {
						if (index % 2 === 0) {
							return (
								<div className={styles.timelineLeft} key={index}>
									<div className={styles.timelineContent}>
										<h3>{point.title}
											<div className={styles.arrow} />
										</h3>
										<p>{point.description}</p>
									</div>

								</div>
							)
						} else {
							return (
								<div className={styles.timelineRight} key={index}>
									<div className={styles.timelineContent}>
										<h3>{point.title}
											<div className={styles.arrow} />
										</h3>
										<p>{point.description}</p>
									</div>
								</div>
							)
						}
					})
				}
			</div>
			<ContactForm/>
			
		</>
	)
}
