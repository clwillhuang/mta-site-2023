import { Document, Schema, model, models } from 'mongoose';

export interface IResource extends Document {
    title: string,
    byline: string,
    tags: string[],
    markdown: string,
    initialPublish: Date;
    lastEdit: Date,
    description: string,
    slug: string,
}

const resourceSchema = new Schema<IResource>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    byline: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: ['other'],
    },
    markdown: {
        type: String,
        required: true,
        default: 'There is no content published on this page.'
    },
    initialPublish: {
        type: Date,
        required: true,
    },
    lastEdit: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
    }
});

const Resource = models.Resource || model<IResource>('Resource', resourceSchema);

export { Resource };
