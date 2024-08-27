// Import necessary dependencies
import User, { IUser } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../[...nextauth]/route";
import Signup from "@/models/Signup";

const revokeOAuth2Consent = (access_token: string) => {
  // Revoke consent from OAuth 2 
  // Docs: https://developers.google.com/identity/protocols/oauth2/web-server#node.js_8

  const https = require('https');

  // Build the string for the POST request
  let postData = "token=" + access_token;

  // Options for POST request to Google's OAuth 2.0 server to revoke a token
  let postOptions = {
    host: 'oauth2.googleapis.com',
    port: '443',
    path: '/revoke',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  // Set up the request
  const postReq = https.request(postOptions, function (res) {
    res.setEncoding('utf8');
    res.on('data', d => {
      console.log('Response: ' + d);
    });
  });

  postReq.on('error', error => {
    console.log(error)
  });

  // Post the request with data
  postReq.write(postData);
  postReq.end();
}

// Define the handler for the POST endpoint
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure the request is authenticated
    const session = await getServerSession(authOptions);
    
    // Extract user id from session
    const userId = session!.user.id.toString();
    const accessToken = session!.accessToken;

    // Connect to the database
    await dbConnect();

    // Delete references to user from db
    const user: IUser | null = await User.findOne({provider: "google", googleId: userId}).lean();
    if (user) {
      await Signup.deleteMany({user: user._id.toString() })
      await User.deleteOne({provider: "google", googleId: userId})
    }  

    // Revoke OAuth consent so they have to consent again
    revokeOAuth2Consent(accessToken);

    // Return success response
    return Response.json({ success: true, message: "User account deleted successfully." }, {status: 200})
  } catch (error) {
    console.log(error)
    // Return error response
    return Response.json({ success: false, error: "Failed to delete user account." }, {status: 500})
  }
};
