import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
// import { CrosshairIcon, XIcon } from "lucide-react";

import type { Message } from "@/models/UserMsg";

interface Props {
  message: Message;
  onMsgDelete: () => void;
  key: string;
  cardId: string;
}

export default function MessageCard({
  message,
  onMsgDelete,
  key,
  cardId,
}: Props) {
  return (
    <Card className="flex h-auto w-full flex-col" key={cardId + key}>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardAction>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive" className="[corner-shape:squircle]">
                <XIcon className="size-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  message from database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onMsgDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 font-semibold tracking-wide">
        {message?.content}
      </CardContent>
      <CardFooter>
        <span className="mr-2 text-sm text-neutral-500">Received at: </span>
        <span className="text-sm font-semibold text-neutral-600">
          {dayjs(message?.createdAt).format("MMM D, YYYY h:mm A")}
        </span>
      </CardFooter>
    </Card>
  );
}
