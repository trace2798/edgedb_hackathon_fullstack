import e, { createClient } from "@/dbschema/edgeql-js";
import MemberCheckForm from "./_components/member-check-form";
import { DataTable } from "./_components/members/data-table";
import { Member, columns } from "./_components/members/column";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";

const client = createClient();

const MembersPage = async ({ params }: { params: { workspaceId: string } }) => {
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      name: true,
      email: true,
      memberRole: true,
      created: true,
      filter: e.op(
        workspaceMember.workspaceId,
        "=",
        e.uuid(params.workspaceId)
      ),
    }))
    .run(client);
  console.log(members);
  return (
    <>
      <div>
        <MemberCheckForm workspaceId={params.workspaceId} />
        <Heading title={`Members (${members.length})`} />
        <Separator />
        <DataTable columns={columns} data={members as Member[]} />
      </div>
    </>
  );
};

export default MembersPage;
