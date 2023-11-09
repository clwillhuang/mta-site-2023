import Header from '@/components/Header/Header';
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
    const futureEvents = events ? events.filter((event: IClubEvent | null) => new Date(event.start_time) >= now || event?.no_fixed_times) : []
    const pastEvents = events ? events.filter((event: IClubEvent | null) => new Date(event.start_time) < now && !event?.no_fixed_times) : []

    const header = <div />
    return (
        <Layout header={header}>
            <PaddedLayout className={styles.upcoming} addNavbarPadding>
                <h2 className={styles.subtitle}>Upcoming Events</h2>
                <div className={styles.grid}>
                    {
                        futureEvents.map(event =>
                            <EventCard key={event.id} data={event} />
                        )
                    }
                    <AsymTriangleTop />
                </div>
            </PaddedLayout>
            <PaddedLayout className={styles.past}>
                <h2 className={styles.subtitle}>Past Events</h2>
                <div className={styles.grid}>
                    {
                        pastEvents.map(event =>
                            <EventCard key={event.id} data={event} />
                        )
                    }
                </div>
            </PaddedLayout>
        </Layout>
    )
}

export const metadata = customizeMetadata({
    title: 'Events',
    description: 'Browse upcoming and past events organized by MTA.',
})

