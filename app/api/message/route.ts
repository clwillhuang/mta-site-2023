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

    // disable it for now.
    return Response.json({}, {status: 403})

    // require auth
    const user = await getUser();
    if (!user) return NextResponse.json({}, {status: 403});
    const formData = await request.formData()

    const params = new URLSearchParams();
    params.append('secret', process.env.NODE_ENV === 'development'
        ? '0x0000000000000000000000000000000000000000'
        : process.env.H_SECRET as string);
    const captcha = formData.get('g-recaptcha-response') || formData.get('h-captcha-response') || '';
    params.append('response', captcha as string);

    // require pass captcha
    await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => res.json())
    .then((json) => {
        const { success } = json;
        if (!success)
            return Response.json({'message': 'Verification failed.'}, {status: 400})
    })
        
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