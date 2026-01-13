"use client";
import UserDashboard from "@/components/custom/user-dashboard";
import { UserMessage } from "@/models/UserMsg";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { Message } from "@/models/UserMsg";
import MessageCard from "@/components/custom/message-card";

export default function DashBoardPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get<Message[]>("/api/get-message");
      console.log("DATA ==> ", response.data);
      return response.data;
    } catch (error) {
      if (error as AxiosError) {
        console.error("Couldn't fetech user messages", error);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      const newMessages = await fetchMessages();
      if (newMessages) {
        setMessages(newMessages);
      }
    };
    loadMessages();
  }, [setMessages]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <UserDashboard />
      <div className="text-3xl font-extrabold text-cyan-500">All Messages</div>

      <div className="mx-auto mt-10 flex w-[80%] space-x-3 px-5 py-5 shadow-md">
        {messages.map((message) => (
          <MessageCard
            key={message._id.toString()}
            cardId={message._id.toString()}
            message={message.content}
            onMsgDelete={() => console.log("delete")}
          />
        ))}
      </div>
    </div>
  );
}

// SignIn and SignUp functionality are sorted with all authentication systems are working perfectly creating all collections

// messages are getting successfully sended to a user whether we is authenticated through github, google or credential login.

// Message display with aggregation pipelines.

// extract UserSession data from useAuthInfo
// based on userID we will fetch messages from database using aggregation pipelines.

// UserMessages {}[] { content: string, userId: string, createdAt: Date}
