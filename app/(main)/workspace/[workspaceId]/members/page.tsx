import e, { createClient } from "@/dbschema/edgeql-js";
import MemberCheckForm from "./_components/member-check-form";

const client = createClient();

const MembersPage = async ({ params }: { params: { workspaceId: string } }) => {
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      name: true,
      email: true,
      memberRole: true,
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
        {/* <MemberSelectForm workspaceId={params.workspaceId} users={users} /> */}
      </div>
    </>
  );
};

export default MembersPage;
