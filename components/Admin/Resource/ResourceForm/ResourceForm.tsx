'use client'

import { useState } from "react";
import styles from './ResourceForm.module.css'
import { IResource } from "@/models/Resource";

export default function ResourceForm({ resource, create }: { resource: IResource | null, create: boolean }) {

    const [formData, setFormData] = useState<any>(
        !create ? resource :
        {
        title: 'Your Title Here',
            slug: 'your-title-here',
            byline: 'by Alice and Bob',
            tags: ['other'],
            markdown: `# Title\n## Subtitle\nParagraph`,
            initialPublish: new Date(),
            lastEdit: new Date(),
            description: '',
        }
    );

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevEvent: any) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { slug } = formData
        const requestOptions = {
            method: create ? 'POST' : 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        };
        const url = create ? '/api/admin/resources' : `/api/admin/resources/${slug}`
        fetch(url, requestOptions)
            .then((response) => response.json())
            // .then((data) => { window.location.replace('/admin') });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}/>
            <label>Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange}/>
            <label>Byline</label>
            <input type="text" name="byline" value={formData.byline} onChange={handleChange}/>
            <label>Tags (comma separated)</label>
            <input type="text" name="tags" value={formData.tags.join(',')} onChange={handleChange}/>
            <label>Description</label>
            <textarea rows={5} type="text" name="description" value={formData.description} onChange={handleChange}/>
            <label>Body (Markdown)</label>
            <textarea rows={5} type="text" name="markdown" value={formData.markdown} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}