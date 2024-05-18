"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createBoard(
  creatorUserId: string,
  name: string,
  description: string,
  backgroundImage: string,
  currentUsersMembershipId: string
) {
  try {
    console.log(name, "NAME");
    console.log(description, "DESCRIPTION");
    console.log(backgroundImage, "BACKGROUND IMAGE");
    console.log(creatorUserId, "CREATOR USER ID");
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(creatorUserId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const verifyMember = await e
      .select(e.WorkspaceMember, (member) => ({
        id: true,
        email: true,
        name: true,
        workspaceId: true,
        filter_single: e.op(member.id, "=", e.uuid(currentUsersMembershipId)),
      }))
      .run(client);
    console.log(verifyMember);
    if (!verifyMember) {
      return "Member not found";
    }
    const newBoard = await e
      .insert(e.Board, {
        name: name as string,
        description: description as string,
        backgroundImage: backgroundImage as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(verifyMember?.workspaceId as string)
          ),
        })),
        workspaceMember: e.select(e.WorkspaceMember, (member) => ({
          filter_single: e.op(
            member.id,
            "=",
            e.uuid(verifyMember?.id as string)
          ),
        })),
      })
      .run(client);
    console.log(newBoard);
    return "Done";
  } catch (error) {
    return "Error creating Board";
  }
}
