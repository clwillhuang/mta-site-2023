'use client'

import { IClubEvent } from "@/models/Event";
import { useState } from "react";
import styles from '@/app/globals.css'
import '@/app/globals.css'

export default function ({ event }: { event: IClubEvent }) {

    const [eventData, setEventData] = useState<IClubEvent>(event);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevEvent: any) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { _id, ...requestData } = event
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
        };
        fetch(`http://localhost:3000/api/admin/events/${_id}`, requestOptions)
            .then((response) => response.json())
            // .then((data) => { window.location.replace('/admin') });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor='title'>
                Title
                <br />
            </label>
                <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                />
            <br />
            <label htmlFor='location'>
                Location
                <br />
            </label>
                <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                />
            <br />
            <label>
                Start Time
                <br />
            </label>
                <input
                    type="datetime-local"
                    name="start_time"
                    value={eventData.start_time}
                    onChange={handleChange}
                />
            <br />
            <label htmlFor='end_time'>
                End Time
                <br />
            </label>
                <input
                    type="datetime-local"
                    name="end_time"
                    value={eventData.end_time}
                    onChange={handleChange}
                />
            <br />
            <label htmlFor='description'>
                Description
                <br />
            </label>
                <textarea
                    rows={5}
                    type="text"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                />
            <br />
            <label htmlFor='image_link'>
                Image Link
                <br />
            </label>
                <input
                    type="text"
                    name="image_link"
                    value={eventData.image_link}
                    onChange={handleChange}
                />
            <button type="submit">Submit</button>
        </form>
    )
}