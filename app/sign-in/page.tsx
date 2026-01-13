import SignInForm from "@/components/custom/sign-in";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center",
        "bg-[radial-gradient(circle_at_center,var(--color-blue-400)_1px,transparent_1px)] bg-size-[10px_10px]",
      )}
    >
      <SignInForm />
    </div>
  );
}

//clip-path: circle(40%);
//shape-outside: circle(45%);

// return (
//   <div className="flex min-h-screen w-full items-center justify-center">
//     <p>Session already exists you can't access sign-in form.</p>
//   </div>
// );
