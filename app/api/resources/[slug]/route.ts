import { NextResponse, userAgent } from "next/server";
import { IResource, Resource } from "@/models/Resource";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        let event = await getResource(params.slug);
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

export async function getResource(slug: string): Promise<IResource | null> {
    let event: IResource | null = await Resource.findOne({slug: slug})
    return event;
}