import dbConnect from "@/lib/dbConnect";
import UserMessageModel from "@/models/UserMsg";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";

// Api route for sending messages to any registered user


export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const body = await request.json();
        const { content, userName } = body;


        // find userId using username

        //message model neeeds userId, content, cretaedAt

        // Query Better Auth user collection to find user by username or email
        const db = client.db(process.env.DB_USERNAME as string);
        const userCollection = db.collection('user');
 

        // Validate input
        if (!content || typeof content !== 'string') {
            return NextResponse.json(
                { success: false, message: 'Message content is required' },
                { status: 400 }
            );
        }

        if (!userName || typeof userName !== 'string') {
            return NextResponse.json(
                { success: false, message: 'User identifier (username or email) is required' },
                { status: 400 }
            );
        }

        // Validate message length
        if (content.length < 10) {
            return NextResponse.json(
                { success: false, message: 'Message must be at least 10 characters long' },
                { status: 400 }
            );
        }

        if (content.length > 200) {
            return NextResponse.json(
                { success: false, message: 'Message must not exceed 200 characters' },
                { status: 400 }
            );
        }


        // Try to find user by username first, then by email
        const user = await userCollection.findOne({ username: userName });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const userId = user._id;

        // Check if user is accepting messages
        const userMessage = await UserMessageModel.findOne({ userId });

        if (!userMessage) {
            return NextResponse.json(
                { success: false, message: 'User message profile not found. User may not have completed signup.' },
                { status: 404 }
            );
        }

        if (!userMessage.isAcceptingMessages) {
            return NextResponse.json(
                { success: false, message: 'User is not accepting messages at this time' },
                { status: 403 }
            );
        }

        // Create new message (plain object, Mongoose will convert it)
        const newMessage = {
            content: content.trim(),
            createdAt: new Date(),
        };

        // Add message to user's messages array
        await UserMessageModel.findOneAndUpdate(
            { userId: userId },
            { $push: { messages: newMessage } },
            { new: true }
        );

        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error occurred while sending message:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}