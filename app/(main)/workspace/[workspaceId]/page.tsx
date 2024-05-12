import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <div className=" flex justify-center items-center text-center">
        <Card className=" ml-5">
          <CardHeader>
            <CardTitle>Workspaces</CardTitle>
            <CardDescription>Your Workspaces</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Page;
