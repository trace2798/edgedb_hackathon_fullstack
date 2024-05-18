import { FC } from "react";
import e, { createClient } from "@/dbschema/edgeql-js";

interface PageProps {
  params: { workspaceId: string; boardId: string };
}

const client = createClient();

const Page: FC<PageProps> = async ({ params }) => {
  const board = await e
    .select(e.Board, (board) => ({
      id: true,
      name: true,
      backgroundImage: true,
      filter_single: e.op(board.id, "=", e.uuid(params.boardId)),
      order_by: {
        expression: board.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(board);
  return (
    <>
      <h1>Page</h1>
    </>
  );
};

export default Page;
