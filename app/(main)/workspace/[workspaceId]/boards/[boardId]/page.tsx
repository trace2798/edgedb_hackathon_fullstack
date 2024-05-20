import { auth } from "@/auth";
import e, { createClient } from "@/dbschema/edgeql-js";
import { FC } from "react";
import { ListContainer } from "./_components/list/list-container";
import { ListWithCards } from "@/types";

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
      cards: e.select(e.Card, (card) => ({
        id: true,
        title: true,
        order: true,
        listId: true,
        filter: e.op(card.list.id, "=", list.id),
        order_by: {
          expression: card.order,
          direction: e.ASC,
        },
      })),
    }))
    .run(client);

  console.log(lists);
  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer
          boardId={params.boardId}
          data={lists as ListWithCards[]}
          workspaceId={params.workspaceId}
          userInfo={session?.user}
        />
      </div>
    </>
  );
};

export default Page;
