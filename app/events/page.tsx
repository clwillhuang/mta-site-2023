import EventCard from '@/components/Events/EventCard/EventCard'
import Layout from '@/components/Layout/Layout';
import styles from '@/app/events/Events.module.css';
import { IClubEvent } from '@/models/Event';
import { getAllEvents } from '../api/events/route';
import { AsymTriangleTop } from '@/components/Dividers/AsymTriangleTop';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';
import customizeMetadata from '@/components/Head/Head';

export default async function Page() {
    const events: IClubEvent[] | null = await getAllEvents();

    const now = new Date();
    const futureEvents = events ? events.filter((event: IClubEvent | null) => new Date(event.start_time) >= now) : []
    const pastEvents = events ? events.filter((event: IClubEvent | null) => new Date(event.start_time) < now) : []

    const header = <div />
    return (
        <Layout header={header}>
            <div className={styles.upcoming}>
                <h2 className={styles.subtitle}>Upcoming Events</h2>
                <div className={styles.grid}>
                    {
                        (futureEvents.length > 0) ?
                            futureEvents.map(event => <EventCard key={event.id} data={event} />)
                            :
                            <p>No upcoming events are visible at the current time. For more updates, view our Instagram.</p>
                    }
                </div>
                <div style={{height: '20vh'}}></div>
                <AsymTriangleTop />
            </div>
            <div className={styles.past}>
                <h2 className={styles.subtitle}>Past Events</h2>
                <div className={styles.grid}>
                    {
                        pastEvents.map(event =>
                            <EventCard key={event.id} data={event} />
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export const metadata = customizeMetadata({
    title: 'Events',
    description: 'Browse upcoming and past events organized by MTA.',
})

