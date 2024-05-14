"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createIssue(
  userId: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  assigneeId: string
) {
  try {
    console.log(userId, "USER ID");
    console.log(title, "CONTENT");
    console.log(status, "STATUS");
    console.log(priority, "PRIORITY");
    console.log(assigneeId, "ASSIGNEE ID");
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
    const verifyMember = await e
      .select(e.WorkspaceMember, (member) => ({
        id: true,
        email: true,
        name: true,
        workspaceId: true,
        filter_single: e.op(member.id, "=", e.uuid(assigneeId)),
      }))
      .run(client);
    console.log(verifyMember);
    const newIssue = await e
      .insert(e.Issue, {
        title: title as string,
        description: description as string,
        status: status as string,
        priority: priority as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(verifyMember?.workspaceId as string)
          ),
        })),
        workspaceMember: e.select(e.WorkspaceMember, (member) => ({
          filter_single: e.op(member.id, "=", e.uuid(assigneeId as string)),
        })),
      })
      .run(client);
    console.log(newIssue);

    const activity = await e
      .insert(e.Activity, {
        message:
          `${user.name} created an issue: "${title}". Issue assigned to : ${verifyMember?.name} ` as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(verifyMember?.workspaceId as string)
          ),
        })),
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.id, "=", e.uuid(userId)),
        })),
      })
      .run(client);
    console.log(activity);

    return "Issue Created";
  } catch (error) {
    console.error(error);
    return "Error Creating Issue";
  }
}
