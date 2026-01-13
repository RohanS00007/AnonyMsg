import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserMessageModel from "@/models/UserMsg";
import { headers } from "next/headers";



// Api for user who wants to toggle its Accepting Message status

// getting user comes 
// we check session
// if session not found then he is not allowed to toggle status,
// if session found then he can change his own status
// pressing on toogle will send a POST request on /api/acccept-message 
// with a body of data 

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { isAcceptingMessages } = body;

        if (typeof isAcceptingMessages !== 'boolean') {
            return Response.json({ success: false, message: 'Invalid payload: isAcceptingMessages must be boolean' }, { status: 400 });
        }

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;

        // Update the user's message settings. Use upsert so we create a record for authenticated users if missing.
        const userMessage = await UserMessageModel.findOneAndUpdate(
            { userId: userId },
            { $set: { isAcceptingMessages: !!isAcceptingMessages } },
            { new: true }
        );

        return Response.json({ success: true, message: 'Message acceptance status updated successfully', userMessage }, { status: 200 });

    } catch (error) {
        console.error('Error occurred while updating isAcceptingMessage toggle', error);
        return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET() {
    await dbConnect(); 

    const authData = await auth.api.getSession({
        headers: await headers()
    });

    const user = authData?.user;
    const session = authData?.session;

  // Check if the user is authenticated
  if (!session || !user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const foundUser = await UserMessageModel.find({userId: user.id});

    if (!foundUser) {
      // User not found
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // console.log(foundUser[0])

    // Return the user's message acceptance status
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser[0]?.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error retrieving message acceptance status' },
      { status: 500 }
    );
  }
}