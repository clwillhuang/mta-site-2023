import { IResource, Resource } from "@/models/Resource";

export async function POST(request: Request) {

    const body = await request.json();

    const resource: IResource = new Resource({
        initialPublish: new Date(),
        lastEdit: new Date(),
        description: body.description,
        title: body.title,
        slug: body.slug,
        byline: body.byline,
        markdown: body.markdown,
        tags: body.tags
    });

    try {
        const newResource = await resource.save();
        return Response.json(newResource, { status: 201 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return Response.json({message: err.message}, {status: 500})
        } else {
            return Response.json({}, {status: 500})
        }
    }
}