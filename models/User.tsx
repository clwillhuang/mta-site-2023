import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    provider: string,
    username: string,
    email: string,
    picture: string,
    name: string,
    role: string,
    googleId: string | null,
    googleSub: string | null
}

const userSchema = new mongoose.Schema<IUser>(
    {
        provider: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9_ ]+$/, 'is invalid'],
            index: true,
        },
        email: {
            type: String,
            index: true,
            required: [true, "can't be blank"]
        },
        picture: {
            type: String,
            required: false,
        },
        name: String,
        role: { type: String, default: 'USER' },
        // google
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        googleSub: {
            type: String,
            unique: true,
            sparse: true
        }
    },
    { timestamps: true },
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User;
