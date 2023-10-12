import ClubEvent, { IClubEvent } from "@/models/Event";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {

    const body = await request.json();

    await dbConnect();

    const event: IClubEvent = new ClubEvent({
        start_time: body.start_time,
        end_time: body.end_time,
        description: body.description,
        title: body.title,
        location: body.location,
        image_link: body.image_link,
        body: body.body
    });

    try {
        const newEvent = await event.save();
        return Response.json(newEvent, { status: 201 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return Response.json({message: err.message}, {status: 500})
        } else {
            return Response.json({}, {status: 500})
        }
    }
}
