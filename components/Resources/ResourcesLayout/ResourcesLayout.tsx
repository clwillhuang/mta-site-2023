import { IResource } from '@/models/Resource'
import styles from './ResourcesLayout.module.css'
import ResourcesCard from '../ResourcesCard/ResourcesCard'

type ResourcesLayoutProps = {
    data: IResource[],
    title: string
}


/**
 * A higher-ordered component that allows for a big grid
 */
const ResourcesLayout = ({ data, title }: ResourcesLayoutProps) => {
    return (
        <div className={styles.layout}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.iconContainer}>
                <div className={styles.iconParent}>
                    {data.map((resource, index) => <ResourcesCard key={`${index}`} resource={resource}/>)}
                </div>
            </div>
        </div>
    )
}

ResourcesLayout.defaultProps = {
    data: []
}

export default ResourcesLayout;