"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();
export const getUserByEmail = async (email: string) => {
  try {
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.email, "=", e.str_lower(email)),
      }))
      .run(client);
    console.log(user);
    return user;
  } catch {
    return null;
  }
};

export const addMemberByEmail = async (email: string, workspaceId: string) => {
  try {
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.email, "=", e.str(email)),
      }))
      .run(client);
    console.log(user);
    if (!user) {
      return "User not found in database";
    }
    const workspace = await e
      .select(e.Workspace, (workspace) => ({
        id: true,
        name: true,
        filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
      }))
      .run(client);
    console.log(workspace);
    if (!workspace) {
      return "Workspace not found in database";
    }
    const workspaceMember = await e
      .select(e.WorkspaceMember, (workspaceMember) => ({
        id: true,
        filter_single: e.op(
          e.op(workspaceMember.workspaceId, "=", e.uuid(workspaceId)),
          "and",
          e.op(workspaceMember.userId, "=", e.uuid(user.id))
        ),
      }))
      .run(client);
    console.log(workspaceMember);
    if (workspaceMember) {
      return "User is already a member of this workspace";
    }
    const addNewWorkspaceMember = await e.insert(e.WorkspaceMember, {
      name: user.name as string,
      email: user.email as string,
      memberRole: "member",
      workspace: e.select(e.Workspace, (workspace) => ({
        filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
      })),
      user: e.select(e.User, (user) => ({
        filter_single: e.op(user.email, "=", e.str_lower(email)),
      })),
    }).run(client);
    console.log(addNewWorkspaceMember);
    return "Done";
  } catch {
    return null;
  }
};
