"use client";
import MessageForm from "@/components/custom/message-form";
import { useParams } from "next/navigation";

export default function PublicMessageApp() {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="flex max-h-screen w-[90%] flex-col md:w-[70%]">
      <h1 className="mt-5 -mb-4 bg-linear-to-bl from-blue-600 to-blue-300 bg-clip-text py-5 text-center text-2xl font-extrabold text-transparent [font-variant:small-caps] sm:text-3xl md:text-4xl lg:text-5xl">
        Public Messaging Page
      </h1>
      <p className="mb-8 text-center text-sm font-semibold text-neutral-500">
        Just get the username url and message anyone...
      </p>
      <MessageForm className="flex-1" userName={username} />
    </div>
  );
}
