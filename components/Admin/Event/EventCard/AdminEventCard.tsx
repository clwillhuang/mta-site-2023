import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styles from './AdminEventCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faPenToSquare, faTrash, faCode } from '@fortawesome/free-solid-svg-icons'
import { IClubEvent } from '@/models/Event';
import ClientButton from '@/components/ClientButton/ClientButton';

function AdminEventCard({ data }: { data: IClubEvent }) {
    const { _id, start_time, end_time, description, title, location, slug } = data;
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
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.time}><FontAwesomeIcon icon={faCalendar} /> {timeString}</p>
            <p className={styles.location}><FontAwesomeIcon icon={faLocationDot} /> {location}</p>
            <p className={styles.location}><FontAwesomeIcon icon={faCode} /> Website Slug: /{slug}</p>
            <p className={styles.description}>{displayedDescription}</p>
            <div className={styles.actions}>
                <a href={`/admin/events/${_id}`} className={styles.editButton}>
                    <FontAwesomeIcon icon={faPenToSquare}/><span> Edit</span>
                </a>
                <ClientButton 
                    url='/api/admin/events/${_id}' 
                    method='DELETE' 
                    buttonProps={{className: styles.deleteButton}}
                    confirmMessage='Delete this event?'>
                    <FontAwesomeIcon icon={faTrash} /><span> Delete</span>
                </ClientButton>
            </div>
        </div>
    );
}

export default AdminEventCard;
