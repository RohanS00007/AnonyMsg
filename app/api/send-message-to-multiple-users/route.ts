import dbConnect from "@/lib/dbConnect";
import UserMessageModel from "@/models/UserMsg";
import client from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: { usernames: string[] };
};

// POST /api/users/alice/bob -> send the same message to each listed user
export async function POST(
  request: NextRequest,
  { params }: RouteParams,
) {
  await dbConnect();

  try {
    const { usernames } = params;

    if (!Array.isArray(usernames) || usernames.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one username is required in the URL" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { content } = body ?? {};

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { success: false, message: "Message content is required" },
        { status: 400 }
      );
    }

    const trimmedContent = content.trim();

    if (trimmedContent.length < 10) {
      return NextResponse.json(
        { success: false, message: "Message must be at least 10 characters long" },
        { status: 400 }
      );
    }

    if (trimmedContent.length > 200) {
      return NextResponse.json(
        { success: false, message: "Message must not exceed 200 characters" },
        { status: 400 }
      );
    }

    const uniqueUsernames = Array.from(
      new Set(
        usernames
          .map((name) => decodeURIComponent(name).trim())
          .filter(Boolean)
      )
    );

    if (uniqueUsernames.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid usernames were provided" },
        { status: 400 }
      );
    }

    const db = client.db(process.env.DB_USERNAME as string);
    const userCollection = db.collection("user");

    const results = await Promise.all(
      uniqueUsernames.map(async (username) => {
        try {
          const user = await userCollection.findOne({ username });
          if (!user) {
            return { username, status: "failed", reason: "User not found" };
          }

          const userMessage = await UserMessageModel.findOne({ userId: user._id });
          if (!userMessage) {
            return {
              username,
              status: "failed",
              reason: "Message profile missing",
            };
          }

          if (!userMessage.isAcceptingMessages) {
            return {
              username,
              status: "failed",
              reason: "User is not accepting messages",
            };
          }

          // Allow message personalization with {{username}} placeholder
          const personalizedContent = trimmedContent.replace(
            /\{\{\s*username\s*\}\}/gi,
            username
          );

          const newMessage = {
            content: personalizedContent,
            createdAt: new Date(),
          };

          await UserMessageModel.findOneAndUpdate(
            { userId: user._id },
            { $push: { messages: newMessage } },
            { new: true }
          );

          return { username, status: "sent" };
        } catch (err) {
          console.error(`Failed to send message to ${username}`, err);
          return { username, status: "failed", reason: "Unexpected error" };
        }
      })
    );

    const sent = results.filter((r) => r.status === "sent").map((r) => r.username);
    const failed = results.filter((r) => r.status === "failed");

    return NextResponse.json(
      {
        success: failed.length === 0,
        sentTo: sent,
        failed,
        message:
          failed.length === 0
            ? "Message sent to all users"
            : "Message processed with some failures",
      },
      { status: failed.length === 0 ? 200 : 207 }
    );
  } catch (error) {
    console.error("Error sending messages to multiple users:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}