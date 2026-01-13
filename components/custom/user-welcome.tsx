"use client";
import { Activity, Suspense } from "react";
import { useAuthInfo } from "./auth-provider";
import SignOutBtn from "./sign-out";
import SignUpBtn from "./signup-btn";

export default function UserWelcome() {
  const authInfo = useAuthInfo();

  if (authInfo) {
    return (
      <div className="ml-5 flex w-[55%] items-center justify-between">
        <Suspense fallback={<p className="text-white">Loading...</p>}>
          <Activity mode={authInfo ? "visible" : "hidden"}>
            <div className="mr-4">
              Welcome
              <strong
                className={`ml-3 tracking-widest ${authInfo.user.role === "admin" ? "text-yellow-300 [font-variant:small-caps]" : "text-white"}`}
              >
                {authInfo?.user.name || authInfo.user.email}
              </strong>
            </div>
          </Activity>
        </Suspense>
        <SignOutBtn />
      </div>
    );
  }
  return <SignUpBtn />;
}
