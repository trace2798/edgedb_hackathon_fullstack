import { User2 } from "lucide-react";
import Link from "next/link";
import e, { createClient } from "@/dbschema/edgeql-js";
import { Skeleton } from "@/components/ui/skeleton";

const client = createClient();

export const BoardList = async ({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-[5vw] mt-5">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={`boards/${board.id}`}
          className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          style={{ backgroundImage: `url(${board.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
          <p className="relative font-semibold text-white">{board.name}</p>
        </Link>
      ))}
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
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
