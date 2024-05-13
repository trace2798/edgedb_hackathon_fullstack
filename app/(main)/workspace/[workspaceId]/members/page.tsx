import { FC } from "react";
import MemberSelectForm from "./_components/member-select-form";
import e, { createClient } from "@/dbschema/edgeql-js";
import MemberCheckForm from "./_components/member-check-form";

interface MembersPageProps {}
const client = createClient();

const MembersPage = async ({ params }: { params: { workspaceId: string } }) => {
  const users = await e
    .select(e.User, (workspace) => ({
      id: true,
      name: true,
      email: true,
    }))
    .run(client);
  console.log(users);
  return (
    <>
      <div>
        <MemberCheckForm workspaceId={params.workspaceId}/>
        {/* <MemberSelectForm workspaceId={params.workspaceId} users={users} /> */}
      </div>
    </>
  );
};

export default MembersPage;
