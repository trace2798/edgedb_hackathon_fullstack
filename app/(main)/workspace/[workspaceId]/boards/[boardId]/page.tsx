import { FC } from "react";
import e, { createClient } from "@/dbschema/edgeql-js";
import { ListContainer } from "./_components/list/list-container";
import { auth } from "@/auth";

interface PageProps {
  params: { workspaceId: string; boardId: string };
}

const client = createClient();

const Page: FC<PageProps> = async ({ params }) => {
  const session = await auth();
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
  // const lists = [] as any;
  const lists = await e
    .select(e.List, (list) => ({
      id: true,
      title: true,
      order: true,
      filter: e.op(list.board.id, "=", e.uuid(params.boardId)),
      order_by: {
        expression: list.order,
        direction: e.ASC,
      },
    }))
    .run(client);
    console.log(lists);
  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer
          boardId={params.boardId}
          data={lists}
          workspaceId={params.workspaceId}
          userInfo={session?.user}
        />
      </div>
    </>
  );
};

export default Page;
