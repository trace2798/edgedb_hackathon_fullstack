import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";
import AddWorkspaceButton from "./_components/add-workspace-button";
import e, { createClient } from "@/dbschema/edgeql-js";
import { auth } from "@/auth";
import Link from "next/link";

interface PageProps {}
const client = createClient();
const Page: FC<PageProps> = async ({}) => {
  const session = await auth();
  console.log(session);
  const workspaces = await e
    .select(e.Workspace, (workspace) => ({
      id: true,
      name: true,
      filter: e.op(workspace.user.id, "=", e.uuid(session?.user?.id as string)),
      order_by: {
        expression: workspace.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(workspaces);
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
        <div>
          {workspaces.map((workspace: { id: string; name: string }) => (
            <Link
              href={`/workspace/${workspace.id}`}
              className="group space-y-3 mt-3"
              key={workspace.id}
            >
              <Card
                key={workspace.id}
                className="p-5 text-center group-hover:text-indigo-400 w-[350px] mb-3"
              >
                <h1>{workspace.name}</h1>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
