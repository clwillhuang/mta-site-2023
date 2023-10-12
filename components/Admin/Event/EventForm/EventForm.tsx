'use client'

import { IClubEvent } from "@/models/Event";
import { useState } from "react";
import styles from './EventForm.module.css'

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
            body: JSON.stringify(requestData),
        };
        fetch(`http://localhost:7000/api/events/${_id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => { window.location.replace('/admin') });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                Title
                <br />
                <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Location
                <br />
                <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Start Time
                <br />
                <input
                    type="datetime-local"
                    name="start_time"
                    value={eventData.start_time}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                End Time
                <br />
                <input
                    type="datetime-local"
                    name="end_time"
                    value={eventData.end_time}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Description
                <br />
                <textarea
                    rows={5}
                    type="text"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Image Link
                <br />
                <input
                    type="text"
                    name="image_link"
                    value={eventData.image_link}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}