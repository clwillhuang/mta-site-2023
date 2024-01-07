import PropTypes from 'prop-types';
import { useMemo } from 'react';
import styles from './EventCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { IClubEvent } from '@/models/Event';
import Image from 'next/image'
import BlurPlaceholder from '@/components/BlurPlaceholder/BlurPlaceholder';
import { domain } from '@/app/url';

function EventCard({ data }: { data: IClubEvent }) {
    const { _id, start_time, end_time, description, title, location, image_link, slug } = data;
    const no_fixed_times = data?.no_fixed_times ?? false;

    const timeString = useMemo(() => {
        const startDate = new Date(start_time)
        const endDate = new Date(end_time)
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
    
        const startString = startDate.toLocaleString('en-US', options).replace('at', '@');
        const endString = endDate.toLocaleString('en-US', options).replace('at', '@');
    
        if (startDate.getDate() === endDate.getDate()) {
            return(`${startString} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`.replace('at', '@'))
        } else {
            return(`${startString} - ${endString}`)
        }
    }, [start_time, end_time])

    const displayedDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;

    return (
        <div className={styles.event}>
            <div className={styles.imageContent}>
                {image_link && <Image 
                fill 
                src={`${domain}${image_link}`} alt={title}
                placeholder='blur'
                blurDataURL={BlurPlaceholder()}/>}
            </div>
            <div className={styles.textContent}>
                <h3 className={styles.title}>{title}</h3>
                {
                    !no_fixed_times && 
                    <p className={styles.time}>
                        <FontAwesomeIcon icon={faCalendar}/> {timeString}
                    </p>
                }
                <p className={styles.location}>
                    <FontAwesomeIcon icon={faLocationDot}/> {location}
                </p>
                <p className={styles.description}>{displayedDescription}</p>
            </div>
            <a href={`/events/${slug}`} className={styles.cardArea}/>
        </div>
    );
}

EventCard.propTypes = {
    event: PropTypes.shape({
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        image_link: PropTypes.string,
    }).isRequired,
};

EventCard.defaultProps = {
    event: {
        image_link: '',
    },
};

export default EventCard;
