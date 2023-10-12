import Header from '@/components/Header/Header';
import EventCard from '@/components/Events/EventCard/EventCard'
import Layout from '@/components/Layout';
import styles from '@/app/events/Events.module.css';
import { IClubEvent } from '@/models/Event';
import { getAllEvents } from '../api/events/route';

async function Events() {
    const title = 'Events';
    const subtitle = 'Browse upcoming and past events organized by MTA.'

    const events: IClubEvent[] | null = await getAllEvents();

    const now = new Date();
    const futureEvents = events ? events.filter((event: IClubEvent | null) => new Date(event.start_time) >= now) : []
    const pastEvents = events ? events.filter((event: IClubEvent | null) => new Date(event.start_time) < now) : []

    return (
        <Layout header={<Header title={title} subtitle={subtitle}/>}>
            <h2 className={styles.subtitle}>Upcoming Events</h2>
            <div className={styles.grid}>
                {
                    futureEvents.map(event =>
                        <EventCard key={event.id} data={event} />
                    )
                }
            </div>
            <h2 className={styles.subtitle}>Past Events</h2>
            <div className={styles.grid}>
                {
                    pastEvents.map(event =>
                        <EventCard key={event.id} data={event} />
                    )
                }
            </div>
        </Layout>
    )
}

export default Events;