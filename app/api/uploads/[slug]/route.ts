import { ImageUpload } from "@/models/ImageUpload";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

// Return an image, based on the slug
export async function GET(
    request: Request, { params }: { params: { slug: string } }
) {
    const db = await dbConnect();
    const gfs = new mongoose.mongo.GridFSBucket(db.connection.db, {
        bucketName: 'images'
    })

    const imageDocument = await ImageUpload.findOne({ slug: params.slug });

    if (!imageDocument) {
        return Response.json({ message: 'Image not found' }, { status: 404 })
    }

    const fileId: mongoose.Types.ObjectId = imageDocument.image;

    // if (fileId) {
    //     console.log(imageDocument)
    // }

    // Validate that fileId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(fileId.toString())) {
        return Response.json({ error: 'Invalid fileId' }, { status: 400 });
    }

    // Fetch the file from GridFS based on the provided fileId
    const fileSearch = await gfs.find({ _id: new mongoose.Types.ObjectId(fileId.toString()) }).toArray();

    // If the file doesn't exist, return a 404 response
    if (!fileSearch || fileSearch.length === 0) {
        return Response.json({ error: 'File not found' }, { status: 404 });
    }
    const file = fileSearch[0];

    const stream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId.toString()))

    const readablestream = new ReadableStream({
        start(controller) {
            stream.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
            // End the readableStream when imageStream ends
            stream.on('end', () => controller.close());
        },
        cancel() {
            stream.destroy();
        },
    })
    return new NextResponse(readablestream, {
        status: 200,
        headers: new Headers({                                                          //Headers
            "content-type": file.contentType || 'image/png',                                            //Set the file type to an iso
            "content-length": file.length + "",                                              //State the file size
        }),
    })
}