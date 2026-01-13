"use client";

import { useContext, createContext } from "react";
import type { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
  data: Session | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthInfo = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthInfo must be used within AuthQueryProvider");
  }
  return context;
};

const fetchSession = async () => {
  const { data: session } = await authClient.getSession();
  return session;
};

interface ChildProps {
  children: React.ReactNode;
}

export default function AuthQueryProvider({ children }: ChildProps) {
  // eslint-disable-next-line prefer-const
  let { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["betterAuth"],
    queryFn: fetchSession,
    staleTime: 10 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    // initialData: null,
  });

  data = data ?? null;

  return (
    <AuthContext.Provider
      value={{
        data,
        isLoading,
        isError,
        error,
        isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
