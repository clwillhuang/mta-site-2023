'use client'

import { useState } from "react";
import styles from './ImageUploadForm.module.css';

interface ImageUploadFormProps {
    create: boolean;
}

interface ImageFormData {
    file: File | null,
}

export default function ImageUploadForm({ create }: ImageUploadFormProps) {
    const [error, setError] = useState<string | null>(null);
    const onChange = (e: React.ChangeEvent<any>) => [
        setError(null)
    ]
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const requestData = new FormData(e.currentTarget);
            const requestOptions: RequestInit = {
                method: "POST",
                body: requestData,
            };

            // console.log('sending', requestOptions)

            const response = await fetch("/api/admin/uploads", requestOptions);

            if (response.ok) {
                const data = await response.json();
                // redirect to admin panel
                window.location.replace('/admin');
            } else {
                const msg = await response.json();
                setError("Failed to upload file." + ' ' + msg?.message); // Handle error response
            }
        } catch (error) {
            console.error("Error occurred while uploading file:", error);
        }
    };

    return (
        <form className={styles.form} encType="multipart/form-data" onSubmit={handleSubmit}>
            <label>File</label>
            <input
                type="text"
                id="slug"
                placeholder="Slug / Image name"
                name="slug"
                required
                onChange={onChange}
            />
            <input
                type="text"
                id="alt"
                placeholder="Image descriptive text"
                name="alt"
                required
                onChange={onChange}
            />
            <input
                type="text"
                id="description"
                placeholder="Image caption"
                name="description"
                required
                onChange={onChange}
            />
            <input type="file" name="file" onChange={onChange} required />
            {error && <span style={{color: 'red'}}>{error}</span>}
            <button type="submit" disabled={!!error}>Upload</button>
        </form>
    );
}
