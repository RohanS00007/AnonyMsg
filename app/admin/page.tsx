import UsersTanstackTable from "@/components/custom/users-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  return (
    <div className={cn("flex min-h-screen w-full items-start justify-center")}>
      <Card className="mx-auto mt-10 mb-20 w-[90%] resize">
        <CardHeader>
          <CardTitle className="text-center text-3xl tracking-widest text-transparent [font-variant:small-caps]">
            <p className="bg-linear-to-br from-red-500 via-orange-300 to-yellow-300 bg-clip-text text-center text-shadow-md">
              Users List
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTanstackTable />
        </CardContent>
      </Card>
    </div>
  );
}
