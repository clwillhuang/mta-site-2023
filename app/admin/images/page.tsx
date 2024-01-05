import styles from './ImageUpload.module.css';
import customizeMetadata from "@/components/Head/Head";
import PaddedLayout from "@/components/PaddedLayout/PaddedLayout";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../layout";
import ImageUploadForm from "@/components/Admin/Image/ImageUploadForm";

export default async function Page() {
    return (
        <Layout>
            <PaddedLayout addNavbarPadding>
                <a href='/admin' className={styles.backLink}><FontAwesomeIcon icon={faChevronLeft} /> Back to Dashboard</a>
                <h2>Upload new image</h2>
                <ImageUploadForm create={true} />
            </PaddedLayout>
        </Layout>
    );
}

export const metadata = customizeMetadata({ title: 'Add resource or page', disableCrawling: true })



