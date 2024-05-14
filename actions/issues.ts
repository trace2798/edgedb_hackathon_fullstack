'use server'
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createIssue(
  userId: string,
  name: string,
  description: string
) {
  try {
    console.log(userId, "USER ID");
    console.log(name, "CONTENT");
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const newIssue = await e
      .insert(e.Workspace, {
        name: name as string,
        description: description as string,
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.id, "=", e.uuid(userId)),
        })),
      })
      .run(client);
    console.log(newIssue);

    // const addWorkspaceCreatorAsOwner = await e
    //   .insert(e.WorkspaceMember, {
    //     name: user.name as string,
    //     email: user.email as string,
    //     memberRole: "owner",
    //     workspace: e.select(e.Workspace, (workspace) => ({
    //       filter_single: e.op(workspace.id, "=", e.uuid(newWorkspace.id)),
    //     })),
    //     user: e.select(e.User, (user) => ({
    //       filter_single: e.op(user.id, "=", e.uuid(userId)),
    //     })),
    //   })
    //   .run(client);
    // console.log(addWorkspaceCreatorAsOwner);

    // const activity = await e
    //   .insert(e.Activity, {
    //     message: `Created Issue: ${name} by ${user.name}` as string,
    //     workspace: e.select(e.Workspace, (workspace) => ({
    //       filter_single: e.op(workspace.id, "=", e.uuid(newWorkspace.id)),
    //     })),
    //     user: e.select(e.User, (user) => ({
    //       filter_single: e.op(user.id, "=", e.uuid(userId)),
    //     })),
    //   })
    //   .run(client);
    // console.log(activity);

    return "Issue Created";
  } catch (error) {
    console.error(error);
    return "Error Creating Issue";
  }
}