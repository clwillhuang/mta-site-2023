import { NextResponse, userAgent } from "next/server";
import { IResource, Resource } from "@/models/Resource";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(
    request: Request,
    { params }: { params: { slug: string } }
) {

    let resource: IResource | null;
    
    await dbConnect();
    try {
        resource = await Resource.findOne({slug: params.slug});
        if (!resource) {
            return new Response(null, { status: 404 })
        }
    } catch (err) {
        let content = err instanceof Error ? err.message : {}
        return NextResponse.json({ message: content }, { status: 500 })
    }

    
    const body = await request.json();

    if (body.title != null) {
        resource.title = body.title;
    }
    if (body.location != null) {
        resource.byline = body.byline;
    }
    if (body.tags != null) {
        resource.tags = body.tags;
    }
    if (body.markdown != null) {
        resource.markdown = body.markdown;
    }
    if (body.initialPublish != null) {
        resource.initialPublish = body.initialPublish;
    }
    if (body.lastEdit != null) {
        resource.lastEdit = body.lastEdit;
    }
    if (body.body != null) {
        resource.description = body.description;
    }

    try {
        const updatedResource = await resource.save();
        return NextResponse.json(updatedResource, { status: 200 });
    } catch (err) {
        return NextResponse.error()
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await Resource.findOne({slug: params.slug});
        return new Response(null, { status: 200 })
    } catch (err) {
        let content = err instanceof Error ? err.message : {}
        return NextResponse.json({ message: content }, { status: 500 })
    }
}