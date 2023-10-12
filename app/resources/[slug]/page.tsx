import styles from './Resource.module.css'
import Layout from '@/components/Layout';
import { notFound } from 'next/navigation';
import MarkdownBody from '@/components/MarkdownBody/MarkdownBody';
import { getResource } from '@/app/api/resources/[slug]/route';
import { IResource } from '@/models/Resource';

export default async function Page({ params }: { params: { slug: string } }) {
    
    const resource: IResource | null = await getResource(params.slug)
    if (!resource) notFound();

    const { title, byline, markdown, initialPublish, lastEdit, description, slug } = resource;

    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

    const publishDisplay = initialPublish.toLocaleString('en-US', options).replace('at', '@');
    const editDisplay = lastEdit.toLocaleString('en-US', options).replace('at', '@');

    return (
        <Layout>
            <h2 className={styles.subtitle}>{title}</h2>
            <p className={styles.credits}>{byline}</p>
            <p className={styles.dates}>First published {publishDisplay}. Last edited {editDisplay}</p>
            <div className={styles.textContent}>
                <MarkdownBody rawText={markdown}/>
            </div>
        </Layout>
    )
}