"use client";
import MessageForm from "@/components/custom/message-form";
import { useParams } from "next/navigation";

export default function PublicMessageApp() {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="flex w-[70%] flex-col">
      <h1 className="mt-5 mb-5 bg-linear-to-bl from-blue-600 to-blue-300 bg-clip-text py-5 text-center text-2xl font-extrabold text-transparent [font-variant:small-caps] md:text-6xl">
        Public Page
      </h1>
      <MessageForm className="flex-1" userName={username} />
    </div>
  );
}
