import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import UserAccountNav from "@/components/user-account-nav";
import e, { createClient } from "@/dbschema/edgeql-js";
import { SelectWorkspaceBox } from "./select-workspace-box";
import BoardListByWorkspace from "./boardlist-by-workspace";
import { SubSidebarItem } from "./sub-sidebar-item";

type Props = {
  className?: string;
  workspaceId: string;
};

const client = createClient();

export const Sidebar = async ({ className, workspaceId }: Props) => {
  const session = await auth();
  console.log(workspaceId);
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
        <Separator />
        <div className="hidden lg:flex">
          <SelectWorkspaceBox
            workspace={workspaces}
            currentWorkspaceId={workspaceId}
          />
        </div>
        <SidebarItem label="Issues" href="/issues" />
        <div className="ml-5 flex flex-col border-l-2 ">
          <SubSidebarItem label="Active" href="/active" />
          <SubSidebarItem label="Backlog" href="/backlog" />
        </div>
        <Separator />
        <BoardListByWorkspace currentWorkspaceId={workspaceId} />
        <Separator />
      </div>
      <div className="divide-x-4">
        <Separator />
        <SidebarItem label="Activity" href="/activity" />
        <SidebarItem label="Members" href="/members" />
        <SidebarItem label="Settings" href="/settings" />
        <Separator />
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
