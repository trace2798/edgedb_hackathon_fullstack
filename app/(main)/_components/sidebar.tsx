import { Loader } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

import { auth } from "@/auth";
import UserAccountNav from "@/components/user-account-nav";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

export const Sidebar = async ({ className }: Props) => {
  const session = await auth();
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <h1 className="text-xl font-satoshiBold tracking-wide bg-gradient-to-r bg-clip-text text-transparent from-indigo-500  to-indigo-300">
            Productivus
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Search Web" href="/web-search" />
        <SidebarItem label="Wikipedia" href="/wiki" />
        <SidebarItem label="Document" href="/documents" />
        <Separator />
        {session && (
          <>
            <SidebarItem label="Activity" href="/activity" />
            <SidebarItem label="Settings" href="/settings" />
            <SidebarItem label="Restore Files" href="/deleted" />
          </>
        )}
        {!session && (
          <>
            <div className="flex flex-col items-center gap-y-8">
              <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
                <Link href="/sign-in">
                  <Button variant="outline">Get Started</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <UserAccountNav
          email={session?.user?.email as string}
          name={session?.user?.name as string}
          imageUrl={session?.user?.image as string}
        />
      </div>
    </div>
  );
};
