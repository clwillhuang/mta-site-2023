import ClubEvent, { IClubEvent } from "@/models/Event";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function getAllEvents(): Promise<IClubEvent[] | null> {
    await dbConnect();
    return await ClubEvent.find().lean()
}

export async function GET(request: Request) {
    try {
        return NextResponse.json(getAllEvents());
    } catch (err: unknown) {
        console.log(err)
        return NextResponse.json({}, {status: 500})
    }
}
