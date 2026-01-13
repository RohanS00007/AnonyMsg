"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SignOutBtn() {
  const MotionButton = motion.create(Button);
  const router = useRouter();
  const queryClient = useQueryClient();

  const signOut = async () => {
    await authClient.signOut();
  };

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["betterAuth"] });
      router.push("/sign-in");
    },
    
  });

  return (
    // eslint-disable-next-line react-hooks/static-components
    <MotionButton
      className="cursor-pointer bg-blue-400 font-bold text-blue-700 active:bg-blue-100"
      onClick={() => signOutMutation.mutate()}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      disabled={signOutMutation.isPending}
    >
      SignOut
    </MotionButton>
  );
}
