import ClubEvent, { IClubEvent, IClubEventData } from "@/models/Event";
import Signup, { ISignup, ISignupData } from "@/models/Signup";
import { NextResponse } from "next/server";
import { getUser } from "@/app/getUser";
import dbConnect from "@/lib/dbConnect";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
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

export async function getEventBySlug(slug: string): Promise<IClubEventData | null> {
    await dbConnect();
    let event: IClubEventData | null = await ClubEvent.findOne({slug: slug}).lean();
    return event;
}

export async function getEvent(id: string): Promise<IClubEventData | null> {
    await dbConnect();
    let event: IClubEventData | null = await ClubEvent.findById(id).lean();
    return event;
}

export interface IClubEventWithSignup {
    signup: ISignupData | null,
    event: IClubEventData | null,
}

export async function getEventWithSignupWithSlug(slug: string): Promise<IClubEventWithSignup | null> {
    let event: IClubEventData | null = await getEventBySlug(slug);
    return getEventWithSignup(event);
}

export async function getEventWithSignupWithId(eventId: string): Promise<IClubEventWithSignup | null> {
    let event: IClubEventData | null = await getEvent(eventId);
    return getEventWithSignup(event);
}

async function getEventWithSignup(event: IClubEventData | null): Promise<IClubEventWithSignup | null> {
    const user = await getUser();
    await dbConnect();
    if (event) {
        if (user) {
            let signup: ISignupData | null = await Signup.findOne({ event: event._id, user: user._id }).lean()
            return { signup, event }
        } else {
            return { signup: null, event }
        }
    } else {
        return null;
    }
}