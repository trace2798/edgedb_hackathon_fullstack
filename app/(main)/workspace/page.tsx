import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FC } from "react";
import AddWorkspaceButton from "./_components/add-workspace-button";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <div className=" flex flex-col justify-center items-center text-center">
        <Card className="ml-5 mb-5 border-none">
          <CardHeader>
            <CardTitle>Workspaces</CardTitle>
            <CardDescription>Your Workspaces</CardDescription>
          </CardHeader>
        </Card>
        <Card className="ml-5 mb-5 border-none">
          <AddWorkspaceButton />
        </Card>
      </div>
    </>
  );
};

export default Page;
