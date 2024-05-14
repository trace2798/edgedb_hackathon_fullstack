import { FC } from "react";
import AddIssueButton from "./_components/add-issue-button";
import e, { createClient } from "@/dbschema/edgeql-js";
import { Member } from "../members/_components/members/column";

const client = createClient();
const Page = async ({ params }: { params: { workspaceId: string } }) => {
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      name: true,
      email: true,
      memberRole: true,
      userId:true,
      created: true,
      filter: e.op(
        workspaceMember.workspaceId,
        "=",
        e.uuid(params.workspaceId)
      ),
      order_by: {
        expression: workspaceMember.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(members);
  return (
    <>
      <div className="pt-[50px] lg:mt-0 dark:bg-zinc-900 min-h-screen flex-flex-col rounded-xl">
        <div className="px-5 py-2 border border-secondary text-sm flex justify-between">
          <h1>All Issues</h1>
          <AddIssueButton members={members as Member[]} />
        </div>
      </div>
    </>
  );
};

export default Page;
