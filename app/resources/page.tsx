import Layout from '@/components/Layout';
import ResourcesLayout from '@/components/Resources/ResourcesLayout/ResourcesLayout';
import { IResource, Resource } from '@/models/Resource';

type LayoutData = {
    title: string,
    query: string[]
}

type DataResults = {
    title: string,
    data: IResource[] | null
}

async function Resources() {
    const title = 'Resources';
    
    const pageContent: LayoutData[] = [
        {
            title: 'Workshops',
            query: ['workshops']
        },
        {
            title: 'Other',
            query: ['other']
        }
    ]

    // manually retrieve all pages of each tag type
    const data: DataResults[] = await Promise.all(
        pageContent.map(async (layout: LayoutData): Promise<DataResults> => {
            const result = await Resource.find({ tags: { $in: layout.query } }).limit(3)
            return {
                title: layout.title,
                data: result
            }
        })
    )


    if (!data || data.length < 1) {
        return(
            <Layout header={<h1>{title}</h1>}>
                <p>There are no resources published here yet. Check back later.</p>
            </Layout>
        )
    }

    return (
        <Layout header={<h1>{title}</h1>}>
            {
                data.map((layoutData : DataResults) => {
                    if (layoutData.data && layoutData.data.length > 0) {
                        return <ResourcesLayout title={layoutData.title} data={layoutData.data}/>
                    }
                    else {
                        return <></>
                    }
                })
            }
        </Layout>
    )
}

export default Resources;