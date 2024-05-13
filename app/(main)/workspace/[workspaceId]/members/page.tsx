import { Heading } from "@/components/heading";
import e, { createClient } from "@/dbschema/edgeql-js";
import { checkStatus } from "@/lib/checkStatus";
import DialogNonUser from "../_components/dialog-non-member";
import AddMemberForm from "./_components/add-member-form";
import { Member, columns } from "./_components/members/column";
import { DataTable } from "./_components/members/data-table";

const client = createClient();

const MembersPage = async ({ params }: { params: { workspaceId: string } }) => {
  const status = await checkStatus({ workspaceId: params.workspaceId });
  console.log(status);
  if (status === "not member") {
    return <DialogNonUser />;
  }
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
  return (
    <>
      <div>
        <Heading title={`Add Member`} description="Add member by email" />
        <AddMemberForm workspaceId={params.workspaceId} />
        <Heading title={`Members (${members.length})`} />
        <DataTable columns={columns} data={members as Member[]} />
      </div>
    </>
  );
};

export default MembersPage;
