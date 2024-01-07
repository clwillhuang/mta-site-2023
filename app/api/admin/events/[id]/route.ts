import ClubEvent, { IClubEvent } from "@/models/Event";
import { NextResponse, userAgent } from "next/server";

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

    if (body.start_time != null) {
        event.start_time = body.start_time;
    }
    if (body.no_fixed_times != null) {
        event.no_fixed_times = body.no_fixed_times;
    }
    if (body.feature_on_homepage != null) {
        event.feature_on_homepage = body.feature_on_homepage;
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
    if (body.slug != null) {
        event.slug = body.slug;
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