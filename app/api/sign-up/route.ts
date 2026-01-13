import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserMessageModel from "@/models/UserMsg";
import { headers } from "next/headers";


export async function POST() {
    await dbConnect();
    try {

        const data = await auth.api.getSession({
            headers: await headers() // you need to pass the headers object.
        })

        if(!data){
            console.error(`session data doesn't exist`)
        }

        const userId = data?.user.id;
        console.log(`UserID: ${userId}`)

        if(!userId){
            return Response.json({
                success: false,
                messsage: "UserId not found",
            }, {
                status: 401
            });
        }

        const userMessage = await UserMessageModel.create({
            userId: userId,
            isAcceptingMessages: true,
            messages: []
        })

        return Response.json({
            success: true,
            message: "UserMessage Model Initialized",
        })

    } catch (error) {
        console.error("Error occured while initiating Message Model");
        return(Response.json({
            success: false,
            message: "Error updating while initiating UserMessage model"
        }, 
        { status: 406}
    ));
    }
}