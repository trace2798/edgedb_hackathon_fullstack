"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { revalidatePath } from "next/cache";

const client = createClient();

export async function createCard(
  userId: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  assigneeId: string,
  duedate: Date | undefined,
  listId: string
) {
  try {
    // console.log(title, listId);
    // console.log(userId, "USER ID");
    // console.log(title, "CONTENT");
    // console.log(status, "STATUS");
    // console.log(priority, "PRIORITY");
    // console.log(assigneeId, "ASSIGNEE ID");
    // console.log(duedate, "DUE DATE");
    // console.log(listId, "LIST ID");
    const list = await e
      .select(e.List, (list) => ({
        id: true,
        filter_single: e.op(list.id, "=", e.uuid(listId)),
      }))
      .run(client);
    console.log(list);
    if (!list) {
      return "Error: List not found";
    }
    const lastCard = await e
      .select(e.Card, (card) => ({
        order: true,
        filter_single: e.op(card.list.id, "=", e.uuid(listId)),
        order_by: {
          expression: card.order,
          direction: e.DESC,
        },
        limit: 1,
      }))
      .run(client);
    console.log(lastCard);
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    console.log(newOrder);
    const createCard = await e
      .insert(e.Card, {
        title: title as string,
        description: description as string,
        status: status as string,
        priority: priority as string,
        order: newOrder as number,
        duedate: duedate as Date,
        assigneeId: assigneeId as string,
        list: e.select(e.List, (list) => ({
          filter_single: e.op(list.id, "=", e.uuid(listId as string)),
        })),
      })
      .run(client);
    console.log(createCard);
    // const issueActivity = await e
    //   .insert(e.IssueActivity, {
    //     message: `${userName} added an link called ${url}.` as string,
    //     issue: e.select(e.Issue, (iss) => ({
    //       filter_single: e.op(iss.id, "=", e.uuid(issue?.id as string)),
    //     })),
    //   })
    //   .run(client);
    // console.log(issueActivity);
    return "Done";
  } catch (error) {
    return "Error Adding Link";
  }
}

export async function deleteCard(
  id: string,
  workspaceId: string,
  boardId: string
) {
  try {
    await e
      .delete(e.Card, (card) => ({
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    revalidatePath(`/workspace/${workspaceId}/board/${boardId}`);
    return "Done";
  } catch (error) {
    return "Error Deleting Card";
  }
}

export async function cardToCopy(
  id: string,
  workspaceId: string,
  boardId: string,
  listId: string
) {
  try {
    const card = await e
      .select(e.Card, (card) => ({
        ...e.Card["*"],
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);
    if(!card) {
      return "Error: Card not found";
    }
    const lastCard = await e
      .select(e.Card, (card) => ({
        order: true,
        filter_single: e.op(card.list.id, "=", e.uuid(listId)),
        order_by: {
          expression: card.order,
          direction: e.DESC,
        },
        limit: 1,
      }))
      .run(client);
    console.log(lastCard);
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    const createCard = await e
    .insert(e.Card, {
      title: `${card.title} - Copy` as string,
      order: newOrder as number,
      list: e.select(e.List, (list) => ({
        filter_single: e.op(list.id, "=", e.uuid(listId as string)),
      })),
    })
    .run(client);
  console.log(createCard);
    // await e
    //   .delete(e.Card, (card) => ({
    //     filter_single: e.op(card.id, "=", e.uuid(id)),
    //   }))
    //   .run(client);
    revalidatePath(`/workspace/${workspaceId}/board/${boardId}`);
    return "Done";
  } catch (error) {
    return "Error Deleting Card";
  }
}
