"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createCard(title: string, listId: string) {
  try {
    console.log(title, listId);
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
        order: newOrder as number,
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

export async function deleteWebLink(id: string, currentUserId?: string) {
  try {
    await e
      .delete(e.WebsiteAddress, (web) => ({
        filter_single: e.op(web.id, "=", e.uuid(id)),
      }))
      .run(client);
    return "Done";
  } catch (error) {
    return "Error Deleting Issue";
  }
}
