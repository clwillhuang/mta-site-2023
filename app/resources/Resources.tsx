import Header from '@/components/Header/Header';
import Layout from '@/components/Layout/Layout';
import ResourcesLayout from '@/components/Resources/ResourcesLayout/ResourcesLayout';
import { Resource } from '@/models/Resource';
import styles from './Resources.module.css';
import { LayoutData, DataResults } from './page';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';
import customizeMetadata from '@/components/Head/Head';

export async function Resources() {
    const title = 'Resources';

    const pageContent: LayoutData[] = [
        {
            title: 'Data Analytics Case Competition',
            query: ['Data Analytics Case Competition']
        },
        {
            title: 'Other Resources',
            query: ['other']
        }
    ];

    // manually retrieve all pages of each tag type
    const data: DataResults[] = await Promise.all(
        pageContent.map(async (layout: LayoutData): Promise<DataResults> => {
            const result = await Resource.find({ tags: { $in: layout.query } }).limit(3);
            return {
                title: layout.title,
                data: result
            };
        })
    );


    if (!data || data.length < 1) {
        return (
            <Layout header={<h1>{title}</h1>}>
                <PaddedLayout addNavbarPadding>
                    <p>There are no resources published here yet. Check back later.</p>
                </PaddedLayout>
            </Layout>
        );
    }

    const subtitle = 'Access select workshop resources, data analytics learning materials and event information.';
    const header = <Header title={title} subtitle={subtitle} />;

    return (
        <Layout header={header}>
            <PaddedLayout addNavbarPadding>
                <div className={styles.list}>
                    {data.map((layoutData: DataResults) => {
                        if (layoutData.data && layoutData.data.length > 0) {
                            return <ResourcesLayout key={`title${layoutData.title}`} title={layoutData.title} data={layoutData.data} />;
                        }
                        else {
                            return <></>;
                        }
                    })}
                </div>
            </PaddedLayout>
        </Layout>
    );
}

