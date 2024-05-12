import { FC } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import UserAccountNav from "./user-account-nav";
import { Target } from "lucide-react";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = async ({}) => {
  const session = await auth();
  return (
    <>
      <div className="pt-5 pb-2 shadow-md dark:shadow-sm dark:shadow-blue-50 px-[10vw] flex justify-between items-center fixed top-0 left-0 w-full backdrop-blur-sm">
        <div>
          <Link
            href="/"
            className="flex group items-center text-xl font-semibold tracking-wide bg-gradient-to-r bg-clip-text text-transparent from-indigo-500  to-indigo-300 hover:cursor-pointer"
          >
            <Target className="mr-3 text-primary group-hover:text-indigo-400" />{" "}
            <span className="underline-offset-4 group-hover:underline">Productivus</span>
          </Link>
        </div>
        <div className="flex space-x-3 items-center">
          <ModeToggle />
          {session && (
            <UserAccountNav
              email={session?.user?.email as string}
              name={session?.user?.name as string}
              imageUrl={session?.user?.image as string}
            />
          )}
          {!session && (
            <Link href="/sign-in">
              <Button variant="outline">Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
