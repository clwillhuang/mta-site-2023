import Header, { HeaderImageProps } from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { aboutTimelineData } from '@/data/about-timeline';
import { TimelineEvent } from '@/models/TimelineEvent';
import styles from './page.module.css'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContactForm from '@/components/ContactForm/ContactForm';
import HomepageEvent, { HomepageEventProps } from '@/components/HomepageEvent/HomepageEvent';
import { AsymTriangleTop } from '@/components/Dividers/AsymTriangleTop';
import { SlantDividerBottom } from '@/components/Dividers/SlantDividerBottom';
import { SlantDividerTop } from '@/components/Dividers/SlantDividerTop';
import Footer from '@/components/Footer/Footer';
import HomepageImage from '@/public/power-bi-2023.jpg'
import customizeMetadata from '@/components/Head/Head';
import { Metadata } from 'next';

export const metadata: Metadata = customizeMetadata({
	title: 'Management Technology Association',
	description: 'Management Technology Association is a student group at the University of Toronto delivering events in data analytics and management.'
})

export default async function Home() {

	const title = 'Welcome to MTA'
	const subtitle = 'We are MTA, the Management Technology Association at the University of Toronto. We strive to the deliver student events and experiences that develop skills in management, information technology, and statistics.'

	const timeline: Array<TimelineEvent> = aboutTimelineData;
	const session = await getServerSession(authOptions);

	const homePageEvents: Array<HomepageEventProps> = [
		{
			title: 'Data Analytics Case Competition',
			link: '/events/case-competition-2023-event',
			image: '/bridge-workshop.jpg',
			description: 'Teams use data analytics to build the best Premier League fantasy team, with prizes for top scorers!'
		},
		{
			title: 'Power Connect',
			link: '/events/power-connect-workshop',
			image: '/ic-atrium.jpg',
			description: 'Join this exclusive event to meet recruiters and professionals to gain insights, network and get closer to your dream career.'
		}
	]

	const headerImage: HeaderImageProps = {
		src: HomepageImage,
		alt: 'Image of 2023 Power BI workshop organized by TheBridge and MTA.'
	}

	return (
		<>
			<NextAuthProvider>
				<Navbar session={session} />
			</NextAuthProvider>
			<Header contentClassName={styles.content} title={title} subtitle={subtitle} image={headerImage} divider={<AsymTriangleTop />}>
				<img src='/large-mta-logo-transparent.png'></img>
			</Header>
			<div id='about' className={styles.timelineContainer}>
				<div className={styles.timelineContent}>
					<div className={styles.timelineLine} />
					<h2 className={styles.about}>About Us</h2>
					{
						timeline.map((point, index) => {
							return (
								<div className={styles.timelineLeft} key={index}>
									<svg width='100%' viewBox="0 0 800 40" className={styles.svg}>
										<line x1="0" y1="0" x2="150" y2="40" strokeWidth='3px' stroke='white'/>
										<line x1="148" y1="40" x2="800" y2="40" strokeWidth='5px' stroke='white'/>
									</svg>
									<div className={styles.itemContent}>
										<h3>{point.title}
											{/* <div className={styles.arrow} /> */}
										</h3>
										<p>{point.description}</p>
									</div>

								</div>
							)

						})
					}
				</div>
			</div>
			<div style={{ height: '1px', position: 'relative' }}>
				<SlantDividerBottom />
			</div>

			<div className={styles.events}>
				<h2 className={styles.eventTitle}>2023-2024 Events</h2>
				<div className={styles.eventBar}>
					{
						homePageEvents.map(eventData => <HomepageEvent key={eventData.title} {...eventData} />)
					}
				</div>
			</div>
			<Footer />
		</>
	)
}
