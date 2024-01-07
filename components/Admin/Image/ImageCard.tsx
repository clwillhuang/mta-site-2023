import { IImageUploadData } from '@/models/ImageUpload';
import styles from './ImageCard.module.css'
import Image from 'next/image'
import BlurPlaceholder from '@/components/BlurPlaceholder/BlurPlaceholder';
import { domain } from '@/app/url';

interface IImageUploadProps {
    data: IImageUploadData;
}

const ImageCard: React.FC<IImageUploadProps> = ({ data }) => {
    if (!data) {
        return <div>No data provided</div>;
    }

    const { slug, alt, description } = data;

    return (
        <div className={styles.card}>
            <div className={styles.imageDiv}>
                <Image alt={alt} width={400} 
                height={200} 
                src={`${domain}/api/uploads/${slug}`} 
                placeholder='blur' 
                blurDataURL={BlurPlaceholder()}/>
            </div>
            <div className={styles.contentDiv}>
                <h3>Link</h3>
                <p>{slug}</p>
                <small>{`(Add image using \"/api/uploads/${slug})\"`}</small>
                <h3>Description</h3>
                <p>{description}</p>
                <h3>Alt</h3>
                <p>{alt}</p>
                
            </div>
        </div>
    );
};

export default ImageCard;
