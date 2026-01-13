"use client";
import { authClient } from "@/lib/auth-client";
import { createContext, useContext, useMemo, memo } from "react";
import type { Session } from "@/lib/auth";

const AuthContext = createContext<Session | null>(null);

// just import useAuthInfo() in context consumer component, which will return the authdata value and just use it.

export const useAuthInfo = (): Session | null => {
  return useContext(AuthContext);
};

interface ChildProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: ChildProps) {
  const { data: session } = authClient.useSession();

  // Memoize the context value to prevent unnecessary re-renders
  // Only updates when session actually changes
  const contextValue = useMemo(() => session ?? null, [session]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Memoize the provider component to prevent re-renders when parent re-renders
export default memo(AuthProvider);
