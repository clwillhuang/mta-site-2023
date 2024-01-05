import mongoose, { Document, Schema, models } from 'mongoose';

export interface IImageUploadData {
    slug: string;
    alt: string;
    description: string;
}

export interface IImageUpload extends IImageUploadData, Document {};

const ImageUploadSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    alt: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    image: { type: mongoose.Types.ObjectId, required: true, unique: true },
});

const ImageUpload = models.ImageUpload || mongoose.model<IImageUpload>('ImageUpload', ImageUploadSchema);

export { ImageUpload };