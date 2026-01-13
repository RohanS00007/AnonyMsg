import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function StopImpersonationBtn() {
  const cancelImpersonation = async () => {
    try {
      await authClient.admin.stopImpersonating();
      window.location.reload();
    } catch (error) {
      console.error("Failed to stop impersonation:", error);
    }
  };
  return (
    <div>
      <Button
        onClick={cancelImpersonation}
        className={"cursor-pointer hover:bg-blue-900 active:scale-95"}
      >
        Stop Impersonation
      </Button>
    </div>
  );
}
