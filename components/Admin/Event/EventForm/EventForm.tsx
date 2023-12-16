'use client'

import { IClubEvent, IClubEventData } from "@/models/Event";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import styles from '@/app/globals.css'
import '@/app/globals.css'

export default function EventForm({ event, create }: { event?: IClubEventData, create: boolean }) {

    const defaultState: IClubEventData = {
        _id: '',
        start_time: new Date(),
        end_time: new Date(),
        no_fixed_times: false,
        can_signup: false,
        description: '',
        title: '',
        location: '',
        image_link: null,
        body: '',
        slug: '',
    }
    
    const [eventData, setEventData] = useState<IClubEventData>(
        (!create && event) ? event : defaultState
    );

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target;
        if (name === 'no_fixed_times' || name === 'can_signup') {
            value = e.target.checked
        }
        setEventData((prevEvent: any) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!create) {
            const { _id } = eventData
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            };
            fetch(`/api/admin/events/${_id}`, requestOptions)
                .then((response) => response.json())
                // .then((data) => { window.location.replace('/admin') });
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            };
            fetch(`/api/admin/events/`, requestOptions)
                .then((response) => response.json())
                .then((data) => { window.location.replace('/admin') });
        }
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
                value={eventData.title}
                onChange={handleChange}
                required
            />
            <br />
            <label htmlFor='slug'>
                Slug
                <br />
            </label>
            <input
                type="text"
                name="slug"
                value={eventData.slug}
                onChange={handleChange}
                required
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
                value={eventData.start_time.toISOString().slice(0, 16)}
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
                value={eventData.end_time.toISOString().slice(0, 16)}
                onChange={handleChange}
            />
            <br />
            <label>
                No Fixed Times
                <br />
            </label>
            <input
                type="checkbox"
                name="no_fixed_times"
                checked={eventData.no_fixed_times}
                onChange={handleChange}
            />
            <br />
            <label>
                Can signup
                <br />
            </label>
            <input
                type="checkbox"
                name="can_signup"
                checked={eventData.can_signup}
                onChange={handleChange}
            />
            <br />
            <label htmlFor='description'>
                Description (140 characters max)
                <br />
            </label>
            <textarea
                rows={5}
                type="text"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                maxLength={140}
                required
            />
            <br />
            <label htmlFor='Body'>
                Text Body
                <br />
            </label>
            <textarea
                rows={10}
                type="text"
                name="body"
                value={eventData.body}
                onChange={handleChange}
                required
            />
            <br />
            <label htmlFor='image_link'>
                Image Link (example: /images/power-bi-2023.jpg)
                <br />
            </label>
            <input
                type="text"
                name="image_link"
                value={eventData.image_link}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    )
}