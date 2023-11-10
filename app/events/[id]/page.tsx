import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import styles from './Event.module.css'
import Layout from '@/components/Layout/Layout';
import { IClubEventWithSignup, getEventWithSignup } from '@/app/api/events/[id]/route';
import SignupButton from '@/components/Events/SignupButton/SignupButton';
import { notFound } from 'next/navigation';
import MarkdownBody from '@/components/MarkdownBody/MarkdownBody';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';
import customizeMetadata from '@/components/Head/Head';

export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;
    const data: IClubEventWithSignup | null = await getEventWithSignup(id);
    if (!data) notFound();

    const { signup, event } = data;
    if (!event) notFound();

    const { start_time, end_time, description, title, location, image_link, body } = event;
    const no_fixed_times = event?.no_fixed_times ?? false;
    const can_signup = event?.no_fixed_times ?? false;

    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

    const timeString = () => {
        const startDate = new Date(start_time)
        const endDate = new Date(end_time)
        const startString = startDate.toLocaleString('en-US', options).replace('at', '@');
        const endString = endDate.toLocaleString('en-US', options).replace('at', '@');
        if (startDate.getDate() === endDate.getDate()) {
            return (`${startString} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`.replace('at', '@'))
        } else {
            return (`${startString} - ${endString}`)
        }
    }

    return (
        <Layout>
            <PaddedLayout addNavbarPadding>
                <h2 className={styles.subtitle}>{event.title}</h2>
                <div className={styles.event}>
                    <div className={styles.imageContent}>
                        {image_link && <img src={image_link} alt={title} className={styles.image} />}
                    </div>
                    <div>
                        {no_fixed_times && <p className={styles.time}><FontAwesomeIcon icon={faCalendar} /> {timeString()}</p>}
                        <p className={styles.location}><FontAwesomeIcon icon={faLocationDot} /> {location}</p>
                        {can_signup && <SignupButton _id={id} signup={signup} />}
                    </div>
                    <div className={styles.textContent}>
                        <MarkdownBody rawText={body} />
                    </div>
                </div>
            </PaddedLayout>
        </Layout>
    )
}

export async function generateMetadata({ params }) {
    const id = params.id;
    const data: IClubEventWithSignup | null = await getEventWithSignup(id);
    if (!data || !data.event) return {}
    return customizeMetadata({
      title: data.event.title,
      description: data.event.description
    })
  }