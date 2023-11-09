import { IResource } from '@/models/Resource';
import { Resources } from './Resources';

export type LayoutData = {
    title: string,
    query: string[]
}

export type DataResults = {
    title: string,
    data: IResource[] | null
}

export default Resources;