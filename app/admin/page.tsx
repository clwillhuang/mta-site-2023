import React from 'react'
import AdminEventCard from '../../components/Admin/Event/EventCard/AdminEventCard'
import Layout from '@/components/Layout'
import { getAllEvents } from '../api/events/route'
import { IClubEvent } from '@/models/Event'
import Tabs from '@/components/Tabs/Tabs'

/**
 * Return the dashboard page for adminstrators
 */
export default async function Page() {

    const events: IClubEvent[] | null = await getAllEvents();

    return (
        <Layout>
            <h2>Dashboard</h2>
            <Tabs>
                <div id='Users'>
                    <h3>Users</h3>
                </div>
                <div id='Events'>
                    <h3>Events</h3>
                    <div>
                        {
                            events && events.map(
                                (event: IClubEvent) =>
                                    <AdminEventCard key={event.title} data={event} />
                            )
                        }
                    </div>
                </div>
            </Tabs>

        </Layout>
    )
}