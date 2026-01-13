"use client";

import axios from "axios";
import { useAuthInfo } from "./auth-query-provider";
import { useQuery } from "@tanstack/react-query";

const fetchMessages = async () => {
  await axios.get("/api/get-messsage");
};

export default function ViewMessages() {
  const { data } = useAuthInfo();

  const { data } = useQuery({
    queryKey: ["get-messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) return <p>Loading Messages</p>;
  if (isError) return <p>{error?.message}</p>;
  return <div></div>;
}
