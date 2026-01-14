"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconLogout } from "@tabler/icons-react";

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
      className="group cursor-pointer bg-black font-bold text-blue-600 active:bg-blue-100"
      onClick={() => signOutMutation.mutate()}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      disabled={signOutMutation.isPending}
    >
      <IconLogout className="size-5" />
      <span className="hidden text-base group-hover:text-white md:block md:text-sm">
        Sign Out
      </span>
    </MotionButton>
  );
}
