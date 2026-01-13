import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserMessageModel, { UserMessage } from "@/models/UserMsg";
import { headers } from "next/headers";


export async function GET() {
    await dbConnect();
    try {
        const data = await auth.api.getSession({
            headers: await headers()
        })

        const userId = data?.user?.id;

        if(!userId){
            return Response.json({message: "User not found"}, {status: 401})
        } 

        const userMessageDoc = await UserMessageModel.findOne({ userId });

        if(!userMessageDoc){
            return Response.json({
                message: "User messages not found", success: false,
            }, 
            {status: 404})
        }

        // Sort messages by createdAt in descending order (newest first)
        const sortedMessages = userMessageDoc.messages.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

    //    const [ {messages} ] = sortedMessages

        // Return in the format expected by the client
        return Response.json(sortedMessages, {status: 200 })

        
    } catch (error) {
        console.log("Failed to fetch messages" , error)
        return Response.json({message: "Message fetch operation failed completely"}, {status: 500})
    }
}