"use client";

import { useAuthInfo } from "./auth-query-provider";

export default function UserDashboard() {
  const { data } = useAuthInfo();
  return (
    <div>
      <h1 className="mt-3 mb-3 bg-linear-to-r from-neutral-400 to-neutral-700 bg-clip-text text-center text-xl text-transparent md:text-4xl">{`Welcome, ${data?.user.name} to your user dashboard.`}</h1>
    </div>
  );
}
