"use client";
import UserDashboard from "@/components/custom/user-dashboard";
// import { UserMessage } from "@/models/UserMsg";
// import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { Message } from "@/models/UserMsg";
import MessageCard from "@/components/custom/message-card";
import AcceptingMsgToggleBtn from "@/components/custom/accepting-msg-toggle-btn";
import Navbar from "@/components/custom/navbar";

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
    <div className="border-debug flex min-h-screen w-full flex-col items-center">
      <UserDashboard />
      <AcceptingMsgToggleBtn />
      <div className="grid grid-cols-1 gap-y-0">
        <div className="mx-auto grid w-[80%] grid-cols-1 gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}

// SignIn and SignUp functionality are sorted with all authentication systems are working perfectly creating all collections

// messages are getting successfully sended to a user whether we is authenticated through github, google or credential login.

// Message display with aggregation pipelines.

// extract UserSession data from useAuthInfo
// based on userID we will fetch messages from database using aggregation pipelines.

// UserMessages {}[] { content: string, userId: string, createdAt: Date}
