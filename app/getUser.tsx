import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User, { IUser } from "@/models/User";
import { Session } from "next-auth";
import dbConnect from "@/lib/dbConnect";

/**
 * Get currently authenticated user's ID string. 
 * @returns User's ID string. Empty if not authenticated.
 */
export async function getUserId(): Promise<string> {
    const session: Session | null = await getServerSession(authOptions);
    if (session && session.user) {
        return session.user.id;
    } else {
        return '';
    }
}

export async function getUser(): Promise<IUser | null> {
    const session: Session | null = await getServerSession(authOptions);
    await dbConnect();
    if (session && session.user) {
        await dbConnect();
        return await User.findOne({googleId: session.user.sub, provider: session.user.provider}).lean();
    } else {
        return null;
    }
}