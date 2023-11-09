import ClubEvent, { IClubEvent } from "@/models/Event";
import Signup, { ISignup } from "@/models/Signup";
import { getServerSession } from "next-auth";
import { NextResponse, userAgent } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Session } from "inspector";
import { getUser } from "@/app/getUser";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        let event = await getEvent(params.id);
        if (!event) {
            return NextResponse.json({}, { status: 404 });
        } else {
            return NextResponse.json(event);
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({}, { status: 500 });
    }
}

export async function getEvent(id: string): Promise<IClubEvent | null> {
    let event: IClubEvent | null = await ClubEvent.findById(id);
    return event;
}

export interface IClubEventWithSignup {
    signup: ISignup | null,
    event: IClubEvent | null,
}

export async function getEventWithSignup(eventId: string): Promise<IClubEventWithSignup | null> {
    const user = await getUser();
    let event: IClubEvent | null = await getEvent(eventId);
    if (event) {
        if (user) {
            let signup: ISignup | null = await Signup.findOne({ event: event._id, user: user._id }).lean()
            return { signup, event }
        } else {
            return { signup: null, event }
        }
    } else {
        return null;
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {

    let event: IClubEvent | null;

    try {
        event = await ClubEvent.findById(params.id);
        if (!event) {
            return new Response(null, { status: 404 })
        }
    } catch (err) {
        let content = err instanceof Error ? err.message : {}
        return NextResponse.json({ message: content }, { status: 500 })
    }

    
    const body = await request.json();
    console.log('body:', body)

    if (body.start_time != null) {
        event.start_time = body.start_time;
    }
    if (body.no_fixed_times != null) {
        event.no_fixed_times = body.no_fixed_times;
    }
    if (body.can_signup != null) {
        event.can_signup = body.can_signup;
    }
    if (body.end_time != null) {
        event.end_time = body.end_time;
    }
    if (body.description != null) {
        event.description = body.description;
    }
    if (body.title != null) {
        event.title = body.title;
    }
    if (body.location != null) {
        event.location = body.location;
    }
    if (body.image_link != null) {
        event.image_link = body.image_link;
    }
    if (body.body != null) {
        event.body = body.body;
    }

    try {
        console.log(event)
        const updatedEvent = await event.save();
        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (err) {
        return NextResponse.error()
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await ClubEvent.findByIdAndDelete(params.id);
        return new Response(null, { status: 200 })
    } catch (err) {
        let content = err instanceof Error ? err.message : {}
        return NextResponse.json({ message: content }, { status: 500 })
    }
}