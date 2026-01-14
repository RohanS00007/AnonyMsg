"use client";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptMessageSchema } from "@/lib/zod";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";

export default function AcceptingMsgToggleBtn() {
  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptMessages: true,
    },
  });

  const { watch, getValues, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = async () => {
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue(
        "acceptMessages",
        response?.data?.isAcceptingMessages as boolean,
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error while fectching AcceptMessages switch status...", {
        description: axiosError.message as string,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  useEffect(() => {
    fetchAcceptMessages();
  }, []);

  const handleSwitchChange = async () => {
    try {
      const currentValue = getValues("acceptMessages");
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        isAcceptingMessages: !currentValue,
      });
      setValue("acceptMessages", !currentValue);
      toast("AcceptingMessages status updtaed", {
        description: response.data.message,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast("Error", {
        description: axiosError.message ?? "Failed to update message settings",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <div className="mb-4">
      <span>Accepting Messages: </span>
      <Switch
        checked={acceptMessages ?? true}
        onCheckedChange={handleSwitchChange}
        className={"cursor-pointer accent-black"}
        // disabled={false}
      />
    </div>
  );
}
