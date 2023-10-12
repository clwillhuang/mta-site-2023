import mongoose from 'mongoose';

export interface IClubEvent extends mongoose.Document {
    start_time: Date,
    end_time: Date,
    description: string,
    title: string,
    location: string,
    image_link: string | null,
    body: string,
}

export const clubEventSchema = new mongoose.Schema<IClubEvent>({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    start_time: {
        type: Date, required: true
    },
    end_time: {
        type: Date, required: true
    },
    description: {
        type: String, required: true
    },
    title: {
        type: String, required: true
    },
    location: {
        type: String, required: true
    },
    image_link: {
        type: String
    },
    body: {
        type: String,
    }
});

const ClubEvent = mongoose.models.Event || mongoose.model<IClubEvent>('Event', clubEventSchema);

export default ClubEvent
