import { IResource } from "@/models/Resource"
import styles from './AdminResourceCard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type AdminResourcesCardProps = {
    resource: IResource;
}

const AdminResourcesCard = ({resource}: AdminResourcesCardProps) => {
    const { title, byline, initialPublish, description, slug} = resource;

    return (
        <div className={styles.card}>
            <a href={`/admin/resources/${slug}`}>
                <FontAwesomeIcon icon={faPenToSquare}/><span>Edit</span>
            </a>
            <a className={styles.link} href={`/resources/${slug}`} />
            <p className={styles.date}>{initialPublish.toLocaleTimeString()}</p>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.credits}>{byline}</p>
        </div>
    );
}

export default AdminResourcesCard;