"use client";

import AcceptingMsgToggleBtn from "./accepting-msg-toggle-btn";
import { useAuthInfo } from "./auth-query-provider";

export default function UserDashboard() {
  const { data } = useAuthInfo();
  return (
    <div>
      <h1>{`Welcome, ${data?.user.name} to your user dashboard.`}</h1>
      <AcceptingMsgToggleBtn />
    </div>
  );
}
