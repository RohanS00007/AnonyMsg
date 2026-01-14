import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ShareUsernameTipProps = {
  username?: string;
};

export default function ShareUsernameTip({
  username = "your-username",
}: ShareUsernameTipProps) {
  const profilePath = `/user/${username}`;

  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>Share your inbox link</CardTitle>
        <CardDescription>
          Let people send you anonymous messages by sharing your personal URL.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">
          Add your username to the end of the site URL. Anyone who opens the
          link can write to you without revealing who they are.
        </p>
        <div className="bg-muted text-foreground rounded-lg px-4 py-3 text-sm font-semibold">
          {profilePath}
        </div>
        <p className="text-muted-foreground text-xs">
          Copy and share the link above to start receiving anonymous messages.
        </p>
      </CardContent>
    </Card>
  );
}
