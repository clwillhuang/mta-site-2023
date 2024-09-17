'use client'

import { IClubEventData } from "@/models/Event";
import { useState } from "react";
import '@/app/globals.css'

type StateProps = IClubEventData & { 
    start_time_value: string,
    end_time_value: string
}

const now = new Date();

export default function EventForm({ event, create }: { event?: IClubEventData, create: boolean }) {

    const defaultState: StateProps = {
        _id: '',
        start_time: now,
        end_time: now,
        start_time_value: now.toISOString().slice(0, 16),
        end_time_value: now.toISOString().slice(0, 16),
        no_fixed_times: false,
        can_signup: false,
        feature_on_homepage: false,
        description: '',
        title: '',
        location: '',
        image_link: '',
        body: '',
        slug: '',
    }

    const [error, setError] = useState<string>('')
    
    const [eventData, setEventData] = useState<StateProps>(
        (!create && event) ? {
            ...event,
            start_time_value: event.start_time.toISOString().slice(0, 16),
            end_time_value: event.end_time.toISOString().slice(0, 16), 
        } : defaultState
    );

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target;
        if (name === 'no_fixed_times' || name === 'can_signup' || name === 'no_fixed_times') {
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
            const formData = {
                ...eventData, 
                start_time: eventData.start_time_value,
                end_time: eventData.end_time_value,
            }
            // console.log(formData)
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };
            fetch(`/api/admin/events/${_id}`, requestOptions)
                .then((response) => response.json())
                // .then((data) => { window.location.replace('/admin') });
        } else {
            const formData = {
                ...eventData, 
                start_time: eventData.start_time_value,
                end_time: eventData.end_time_value,
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };
            fetch(`/api/admin/events/`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        setError('Encountered error submitting this data. ')
                    }
                })
                // .then((data) => { window.location.replace('/admin') });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                {`Slug (example: using \"network-event\" will publish it to https://mtautsc.com/events/network-event)`}
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
            <label htmlFor='start_time_value'>
                Start Time
                <br />
            </label>
            <input
                type="datetime-local"
                name="start_time_value"
                value={eventData.start_time_value}
                onChange={handleChange}
            />
            <br />
            <label htmlFor='end_time_value'>
                End Time
                <br />
            </label>
            <input
                type="datetime-local"
                name="end_time_value"
                value={eventData.end_time_value}
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
            <label>
                Feature on homepage?
                <br />
            </label>
            <input
                type="checkbox"
                name="feature_on_homepage"
                checked={eventData.feature_on_homepage}
                onChange={handleChange}
            />
            <br />
            <label htmlFor='description'>
                Description (500 characters max)
                <br />
            </label>
            <textarea
                rows={5}
                type="text"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                maxLength={500}
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
            {error && <span style={{color: 'red'}}>{error}</span>}
            <button type="submit">Submit</button>
        </form>
    )
}