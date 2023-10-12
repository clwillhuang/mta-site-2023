import PropTypes from 'prop-types';
import { useMemo } from 'react';
import styles from './AdminEventCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { IClubEvent } from '@/models/Event';

function AdminEventCard({ data }: { data: IClubEvent }) {
    const { _id, start_time, end_time, description, title, location, image_link } = data;
    
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

    return (
        <div className={styles.event}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.time}><FontAwesomeIcon icon={faCalendar} /> {timeString}</p>
            <p className={styles.location}><FontAwesomeIcon icon={faLocationDot} /> {location}</p>
            <p className={styles.description}>{description}</p>
            <a href={`/admin/event/${_id}`}>
                <FontAwesomeIcon icon={faPenToSquare}/><span>Edit</span>
            </a>
        </div>
    );
}

AdminEventCard.propTypes = {
    event: PropTypes.shape({
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        image_link: PropTypes.string,
    }).isRequired,
};

AdminEventCard.defaultProps = {
    event: {
        image_link: '',
    },
};

export default AdminEventCard;
