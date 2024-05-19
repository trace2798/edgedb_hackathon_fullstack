import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import e, { createClient } from "@/dbschema/edgeql-js";
import Link from "next/link";

const client = createClient();

export const BoardListName = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const boards = await e
    .select(e.Board, (board) => ({
      id: true,
      name: true,
      backgroundImage: true,
      filter: e.op(board.workspace.id, "=", e.uuid(params.workspaceId)),
      order_by: {
        expression: board.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(boards);
  return (
    <div className="flex flex-col">
      {boards.map((board) => (
        <Link key={board.id} href={`/workspace/${params.workspaceId}/boards/${board.id}`}>
          <p
            className={buttonVariants({
              variant: "sidebar",
              size: "sidebar",
              className: "justify-start hover:bg-secondary",
            })}
          >
            {board.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

BoardListName.Skeleton = function SkeletonBoardListName() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-[5vw] mt-5">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
