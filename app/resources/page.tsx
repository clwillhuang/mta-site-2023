import { IResource } from '@/models/Resource';
import { Resources } from './Resources';
import customizeMetadata from '@/components/Head/Head';

export type LayoutData = {
    title: string,
    query: string[]
}

export type DataResults = {
    title: string,
    data: IResource[] | null
}

export default Resources;

export const metadata = customizeMetadata({
    title: 'Resources',
    description: 'Access select workshop resources, data analytics learning materials and event information.',
    disableCrawling: true
})