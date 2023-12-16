import mongoose from 'mongoose';

export interface IClubEventData {
    _id?: any,
    slug: string,
    start_time: Date,
    end_time: Date,
    no_fixed_times: boolean,
    can_signup: boolean,
    description: string,
    title: string,
    location: string,
    image_link: string | null,
    body: string,
}

export interface IClubEvent extends mongoose.Document, IClubEventData {

}

export const clubEventSchema = new mongoose.Schema<IClubEvent>({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    no_fixed_times: {
        type: Boolean,
        default: false,
    },
    can_signup: {
        type: Boolean,
        default: false,
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
