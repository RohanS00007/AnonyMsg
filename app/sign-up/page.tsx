import SignUpForm from "@/components/custom/new-signupform";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center",
        "bg-[radial-gradient(circle_at_center,var(--color-blue-400)_1px,transparent_1px)] bg-size-[10px_10px]",
      )}
    >
      <SignUpForm />
    </div>
  );
}
