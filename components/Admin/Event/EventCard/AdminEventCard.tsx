import PropTypes from 'prop-types';
import { useMemo } from 'react';
import styles from './AdminEventCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { IClubEvent } from '@/models/Event';

function AdminEventCard({ data }: { data: IClubEvent }) {
    const { _id, start_time, end_time, description, title, location } = data;
    const image_link = data.image_link ?? '';
    
    const timeString = useMemo(() => {
        const startDate = new Date(start_time)
        const endDate = new Date(end_time)
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
    
        const startString = startDate.toLocaleString('en-US', options).replace('at', '@');
        const endString = endDate.toLocaleString('en-US', options).replace('at', '@');
    
        if (startDate.getDate() === endDate.getDate()) {
            return(`${startString} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`.replace('at', '@'))
        } else {
            return(`${startString} - ${endString}`)
        }
    }, [start_time, end_time])

    const displayedDescription = description.length > 400 ? description.slice(0, 200) + '...' : description;

    return (
        <div className={styles.event}>
            <a href={`/admin/event/${_id}`}>
                <FontAwesomeIcon icon={faPenToSquare}/><span>Edit</span>
            </a>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.time}><FontAwesomeIcon icon={faCalendar} /> {timeString}</p>
            <p className={styles.location}><FontAwesomeIcon icon={faLocationDot} /> {location}</p>
            <p className={styles.description}>{displayedDescription}</p>
        </div>
    );
}

export default AdminEventCard;
