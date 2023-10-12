import { getUser } from "@/app/getUser";
import dbConnect from "@/lib/dbConnect";
import ClubEvent, { IClubEvent } from "@/models/Event";
import Signup, { ISignup } from "@/models/Signup";
import { IUser } from "@/models/User";

export async function getMySignups(user: IUser): Promise<ISignup[] | null> {
    await dbConnect();
    return await Signup.find({ user: user }).lean()
}

export interface ISignupWithEventData extends ISignup {
    eventData: IClubEvent | null
}

export type GetMeResult = {
    user: IUser | null,
    signups: ISignupWithEventData[] | null,
}

export async function getMe(): Promise<GetMeResult> {
    const user = await getUser();
    if (user) {
        const signups = await getMySignups(user);
        // populate all signups with event data 
        if (signups) {
            const data = await Promise.all(
                signups.map(
                    async (signup):
                        Promise<ISignupWithEventData> => {
                        const data = await ClubEvent.findById(signup.event).lean();
                        return { ...signup, eventData: data }
                    })
            )
            return { user, signups: data };
        } else {
            return { user, signups: []}
        }
    } else {
        return { user: null, signups: null }
    }
}

// Return the currently authenticated user and a list of signups
export default async function GET(request: Request) {
    const data = await getMe();
    return data.user ? Response.json(data) : Response.json({}, { status: 403 });
}