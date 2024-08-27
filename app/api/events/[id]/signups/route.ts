import { getUser, getUserId } from "@/app/getUser";
import Signup from "@/models/Signup";
import { getEvent } from "../route";
import { NextResponse } from "next/server";

// POST method for a single signup
export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await getUser();
    if (!user) return NextResponse.json({}, {status: 403});

    let event = await getEvent(params.id);
    if (!event) {
        return NextResponse.json({}, { status: 404 });
    }

    try {
        const existingSignup = await Signup.findOne({ user: user._id, event: event._id });
        if (existingSignup) {
            return NextResponse.json({message: 'User already has signup for this event.'}, {status: 400})
        }

        const signup = new Signup({
            user: user,
            event: event,
            date: new Date(),
        });

        const newSignup = await signup.save();
        return NextResponse.json({newSignup}, {status: 201})

    } catch (err) {
        console.log(err)
        return NextResponse.json({}, {status: 500})
    }
};