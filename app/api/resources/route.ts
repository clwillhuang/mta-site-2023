import dbConnect from "@/lib/dbConnect";
import { IResource, Resource } from "@/models/Resource";
import { NextResponse } from "next/server";

export async function getAllResources(): Promise<IResource[] | null> {
    await dbConnect();
    return await Resource.find().lean()
}

export async function GET(request: Request) {
    try {
        return NextResponse.json(getAllResources());
    } catch (err: unknown) {
        console.log(err)
        return NextResponse.json({}, {status: 500})
    }
}


