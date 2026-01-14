"use client";
import Link from "next/link";
import { ArrowUpRight, LoaderPinwheel } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuthInfo } from "./auth-query-provider";

type UserTileProps = {
  subtitle?: string;
};

export default function UserTile({
  subtitle = "Open public inbox",
}: UserTileProps) {
  const { data, isLoading, error, isError } = useAuthInfo();

  if (isLoading) return <LoaderPinwheel className="animate-spin" />;
  if (isError) return <p>{error?.message}</p>;

  return (
    <Link
      href={`/user/${data?.user.username}`}
      className="group mt-2 mb-2 block w-[80%] max-w-xs"
    >
      <Card className="transition hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold md:text-lg">
              @{data?.user?.username}
            </CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          <ArrowUpRight className="text-muted-foreground size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </CardHeader>
      </Card>
    </Link>
  );
}
