"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { uuid } from "edgedb/dist/codecs/ifaces";

const client = createClient();

export async function createWorkspace(
  userId: string,
  name: string,
  description: string
) {
  try {
    console.log(userId, "USER ID");
    console.log(name, "CONTENT");
    const user = await e
      .select(e.User, (user) => ({
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const newWorkspace = e.insert(e.Workspace, {
      name: name as string,
      description: description as string,
      user: e.select(e.User, (user) => ({
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      })),
    });
    await newWorkspace.run(client);
    return "Workspace Created";
  } catch (error) {
    console.error(error);
    return "Workspace Action Error";
  }
}
