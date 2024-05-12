"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  href: string;
};

export const SidebarItem = ({ label, href }: Props) => {
  const pathname = usePathname();
  // console.log(pathname);
  // const active = pathname === href;
  const parts = pathname.split("/");
  const firstTwoParts = parts.slice(1, 3); // slice(1, 3) because array indices start at 0 and parts[0] will be an empty string due to the leading '/'
  const newPath = "/" + firstTwoParts.join("/");
  const lastPart = parts[parts.length - 1];
  // console.log(lastPart);
  // console.log(href);
  const active = `/${lastPart}` === href;

  return (
    <Button
      variant={active ? "secondary" : "special"}
      className="justify-start h-[52px] hover:bg-secondary font-ranadeRegular"
      asChild
    >
      <Link href={`${newPath}/${href}`}>{label}</Link>
    </Button>
  );
};
