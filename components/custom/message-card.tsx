import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { CrosshairIcon, XIcon } from "lucide-react";

interface Props {
  message: string;
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
    <Card className="border-debug flex h-auto w-full flex-col" key={cardId}>
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
      <CardContent className="flex-1">{message}</CardContent>
      <CardFooter>Received at: </CardFooter>
    </Card>
  );
}
