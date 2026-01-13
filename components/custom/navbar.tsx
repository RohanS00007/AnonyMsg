import Link from "next/link";
import UserWelcomeTquery from "./user-welcomequery";
// import UserWelcome from "./user-welcome";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 text-white shadow-md md:p-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="mb-4 text-xl font-bold md:mb-0">
          True Feedback
        </Link>
        {/* <UserWelcome /> */}
        <UserWelcomeTquery />
      </div>
    </nav>
  );
}
