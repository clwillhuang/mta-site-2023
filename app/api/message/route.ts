import { getUser } from "@/app/getUser";
import { NextResponse } from "next/server";
import { Message } from "@/models/Message";

/**
 * Create a new contact message
 * @param request Request  
 * @returns 
 */
export async function POST(
    request: Request
) {
    // require auth
    const user = await getUser();
    if (!user) return NextResponse.json({}, {status: 403});
    const formData = await request.formData()
    try {
        const message = new Message({
            senderName: formData.get('senderName'),
            email: formData.get('email'),
            subjectLine: formData.get('subjectLine'),
            content: formData.get('content'),
            message: formData.get('content'),
        });
        const newMessage = await message.save();
        return NextResponse.json({}, {status: 201})

    } catch (err) {
        console.log(err)
        return NextResponse.json({}, {status: 500})
    }
};