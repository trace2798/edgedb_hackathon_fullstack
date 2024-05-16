"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createIssue(
  userId: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  assigneeId: string,
  duedate: Date | undefined,
  urls: string[] | undefined
) {
  try {
    console.log(userId, "USER ID");
    console.log(title, "CONTENT");
    console.log(status, "STATUS");
    console.log(priority, "PRIORITY");
    console.log(assigneeId, "ASSIGNEE ID");
    console.log(duedate, "DUE DATE");
    console.log(urls, "URLS");
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
        duedate: duedate as Date | undefined,
        urls: urls as string[] | undefined,
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
        assigneeId: e.uuid(assigneeId as string),
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

export async function updatePriority(
  id: string,
  priority: string,
  userId: string
) {
  try {
    console.log(id);
    console.log(priority, "PRIORITY");
    console.log(userId, "USER ID");

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
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        priority: true,
        workspaceId: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(issue);

    const updateIssuePriority = await e
      .update(e.Issue, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          priority: priority as string,
        },
      }))
      .run(client);
    console.log(updateIssuePriority);

    const activity = await e
      .insert(e.Activity, {
        message:
          `Priority changed from: ${issue?.priority} to: ${priority}. For issue: "${issue?.title}" by  ${user.name}.` as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(issue?.workspaceId as string)
          ),
        })),
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.id, "=", e.uuid(userId)),
        })),
      })
      .run(client);
    console.log(activity);

    return "Issue Priority Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Priority";
  }
}

export async function updateStatus(id: string, status: string, userId: string) {
  try {
    console.log(id);
    console.log(status, "Status");
    console.log(userId, "USER ID");

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
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        status: true,
        workspaceId: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(issue);

    const updateIssuePriority = await e
      .update(e.Issue, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          status: status as string,
        },
      }))
      .run(client);
    console.log(updateIssuePriority);

    const activity = await e
      .insert(e.Activity, {
        message:
          `Status changed from: ${issue?.status} to: ${status}. For issue: "${issue?.title}" by  ${user.name}.` as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(issue?.workspaceId as string)
          ),
        })),
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.id, "=", e.uuid(userId)),
        })),
      })
      .run(client);
    console.log(activity);

    return "Issue Status Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Status";
  }
}

export async function updateDueDate(
  id: string,
  duedate: Date | undefined,
  userId: string
) {
  try {
    console.log(id);
    // console.log(status, "Status");
    console.log(userId, "USER ID");

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
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        duedate: true,
        workspaceId: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(issue);

    const updateIssueDueDate = await e
      .update(e.Issue, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          duedate: duedate,
        },
      }))
      .run(client);
    console.log(updateIssueDueDate);

    const activity = await e
      .insert(e.Activity, {
        message:
          `Due Date changed from: ${issue?.duedate} to: ${duedate}. For issue: "${issue?.title}" by  ${user.name}.` as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(issue?.workspaceId as string)
          ),
        })),
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.id, "=", e.uuid(userId)),
        })),
      })
      .run(client);
    console.log(activity);

    return "Issue Due Date Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Due Date";
  }
}

export async function deleteIssue(id: string, currentUserId: string) {
  try {
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        status: true,
        workspaceId: true,
        workspaceMember: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(issue);
    if (!issue) {
      return "Issue Not Found";
    }

    const currentUserMemberInfo = await e
      .select(e.WorkspaceMember, (wspm) => ({
        id: true,
        memberRole: true,
        filter_single: e.op(
          e.op(wspm.workspaceId, "=", e.uuid(issue?.workspaceId as string)),
          "and",
          e.op(wspm.userId, "=", e.uuid(currentUserId))
        ),
      }))
      .run(client);
    console.log(currentUserMemberInfo);
    if (
      issue.workspaceMember.id === currentUserMemberInfo?.id ||
      currentUserMemberInfo?.memberRole === "owner"
    ) {
      await e
        .delete(e.Issue, (issue) => ({
          filter_single: e.op(issue.id, "=", e.uuid(id)),
        }))
        .run(client);
      return "Done";
    } else {
      return "You do not have permission to delete this issue.";
    }
  } catch (error) {
    return "Error Deleting Issue";
  }
}

// export async function deleteLinkFromIssue(
//   id: string,
//   currentUserId: string,
//   url: string
// ) {
//   try {
//     const issue = await e
//       .select(e.Issue, (issue) => ({
//         id: true,
//         title: true,
//         status: true,
//         workspaceId: true,
//         workspaceMember: true,
//         filter_single: e.op(issue.id, "=", e.uuid(id)),
//       }))
//       .run(client);
//     console.log(issue);
//     if (!issue) {
//       return "Issue Not Found";
//     }

//     const currentUserMemberInfo = await e
//       .select(e.WorkspaceMember, (wspm) => ({
//         id: true,
//         memberRole: true,
//         filter_single: e.op(
//           e.op(wspm.workspaceId, "=", e.uuid(issue?.workspaceId as string)),
//           "and",
//           e.op(wspm.userId, "=", e.uuid(currentUserId))
//         ),
//       }))
//       .run(client);
//     console.log(currentUserMemberInfo);
//     if (
//       issue.workspaceMember.id === currentUserMemberInfo?.id ||
//       currentUserMemberInfo?.memberRole === "owner"
//     ) {
//       await e
//         .update(e.Issue, (issue) => ({
//           filter_single: e.op(issue.id, "=", e.uuid(id)),
//           set: {
//             urls: e.array_remove(issue.urls, e.str(url)),
//           },
//         }))
//         .run(client);
//       return "Done";
//     } else {
//       return "You do not have permission to delete this issue.";
//     }
//   } catch (error) {
//     return "Error Deleting Issue";
//   }
// }
