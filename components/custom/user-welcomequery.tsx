"use client";
import SignOutBtn from "./sign-out";
import { LoaderPinwheel } from "lucide-react";
import SignUpBtn from "./signup-btn";
import { useAuthInfo } from "./auth-query-provider";

export default function UserWelcomeTquery() {
  const authInfo = useAuthInfo();

  if (authInfo?.isLoading) {
    return <LoaderPinwheel className="size-5 animate-spin" />;
  }

  if (authInfo?.isError) {
    return <p>{authInfo.error?.message}</p>;
  }

  if (authInfo?.data) {
    return (
      <div className="ml-5 flex w-[55%] items-center justify-between">
        <div className="mr-4 flex flex-col items-center justify-center text-sm">
          Welcome
          <strong
            className={`text-md ml-3 tracking-widest ${authInfo?.data?.user.role === "admin" ? "text-yellow-300 [font-variant:small-caps]" : "text-white"}`}
          >
            {authInfo?.data?.user.name}
          </strong>
          {authInfo?.isFetching ? (
            <LoaderPinwheel className="size-4 animate-spin" />
          ) : null}
        </div>
        <SignOutBtn />
      </div>
    );
  }
  return <SignUpBtn />;
}
