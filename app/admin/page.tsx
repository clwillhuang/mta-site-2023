import React from 'react'
import AdminEventCard from '../../components/Admin/Event/EventCard/AdminEventCard'
import Layout from '@/components/Layout/Layout'
import { getAllEvents } from '../api/events/route'
import { IClubEvent } from '@/models/Event'
import Tabs, { TabProp } from '@/components/Tabs/Tabs'
import { IResource } from '@/models/Resource'
import { getAllResources } from '../api/resources/route'
import AdminResourcesCard from '@/components/Admin/Resource/ResourceCard/AdminResourceCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout'

/**
 * Return the dashboard page for adminstrators
 */
export default async function Page() {

    const events: IClubEvent[] | null = await getAllEvents();
    const resources: IResource[] | null = await getAllResources();

    const tabs: TabProp[] = [
        {
            title: 'Events',
            key: 'events',
            children: [
                <div>
                    <a href='/admin/events'>
                        <FontAwesomeIcon icon={faPlusCircle}/><span> Add new event</span> 
                    </a>
                    {
                        events && events.map(
                            (event: IClubEvent) =>
                                <AdminEventCard key={event.title} data={event} />
                        )
                    }
                </div>
            ]
        },
        {
            title: 'Resources',
            key: 'resources',
            children: [
                <a href='/admin/resources'>
                    <FontAwesomeIcon icon={faPlusCircle} /> Create new resource
                </a>,
                <div>
                    {
                        resources && resources.map((res: IResource) => {
                            return (<AdminResourcesCard resource={res} />)
                        })
                    }
                </div>
            ]
        },
        {
            title: 'Users',
            key: 'users',
            children: [
                <div />
            ]
        },
    ]

    return (
        <Layout>
            <PaddedLayout addNavbarPadding>
                <h2>Dashboard</h2>
                <Tabs tabs={tabs} />
            </PaddedLayout>
        </Layout>
    )
}