import { IResource } from "@/models/Resource"
import styles from './ResourcesCard.module.css'

type ResourcesCardProps = {
    resource: IResource;
}

const ResourcesCard = ({resource}: ResourcesCardProps) => {
    const { title, byline, initialPublish, description, slug} = resource;

    return (
        <div className={styles.card}>
            <a className={styles.link} href={`/resources/${slug}`} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.date}>{initialPublish.toLocaleDateString()}, {byline}</p>
        </div>
    );
}

export default ResourcesCard;