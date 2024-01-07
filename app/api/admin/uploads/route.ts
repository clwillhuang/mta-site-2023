import { IImageUploadData, ImageUpload } from '@/models/ImageUpload';
import dbConnect from "@/lib/dbConnect";
import mongoose from 'mongoose'

// Get all images, such as for the admin
export async function getAllImageData() {
    await dbConnect();
    const data = await ImageUpload.find();
    return data.map((image: IImageUploadData) => {
        return {
            alt: image.alt,
            description: image.description,
            slug: image.slug
        }
    })
}

function parseByteSizeToString(bytes: number) {
    if (bytes == 0) { return "0.00 B"; }
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B';
  }

export async function POST(request: Request) {
    const formData = await request.formData();
    const dbConnection = await dbConnect();
    const bucket = new mongoose.mongo.GridFSBucket(dbConnection.connection.db, {
        bucketName: 'images',
    });
    
    const newSlug = formData.get('slug');
    // check if slug unique
    const other = await ImageUpload.findOne({slug: newSlug});
    if (other) {
        return Response.json({ message: "An image with slug " + newSlug + " already exists" }, { status: 400 }); 
    }

    const file: File | null = formData.get("file") as unknown as File;
    if (!file) {
        return Response.json({ message: "No files received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Check file size.
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (buffer.byteLength > maxSizeInBytes) {
        return Response.json({ message: `Your file is too large (${parseByteSizeToString(buffer.byteLength)}). Limit is 1 MB. Consider compressing or cropping image.`}, { status: 400})
    }

    try {
        const uploadStream = bucket.openUploadStream(file.name);
        const fileId = uploadStream.id;
        uploadStream.end(buffer)

        console.log("Passed file upload for", file.name, 'to', fileId, '. Size is', buffer.length)
        const upload = new ImageUpload({
            alt: formData.get('alt'),
            description: formData.get('description'),
            slug: formData.get('slug'),
            image: fileId
        });
        await upload.save();
        return Response.json({}, { status: 201 })
    } catch (error) {
        console.log("Error occured ", error);
        return Response.json({ message: "Failed", status: 500 });
    }
}