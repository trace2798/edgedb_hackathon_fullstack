import AddBoardButton from "@/app/(main)/_components/add-board-button";
import { FileUpload } from "@/components/file-upload";
import { FC } from "react";
import e, { createClient } from "@/dbschema/edgeql-js";
import { Member } from "../members/_components/members/column";
import Link from "next/link";

const client = createClient();

const page = async ({ params }: { params: { workspaceId: string } }) => {
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      name: true,
      email: true,
      memberRole: true,
      userId: true,
      created: true,
      filter: e.op(
        workspaceMember.workspaceId,
        "=",
        e.uuid(params.workspaceId)
      ),
      order_by: {
        expression: workspaceMember.created,
        direction: e.DESC,
      },
    }))
    .run(client);

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
    <>
      <div>
        <div className="pt-[50px] lg:pt-0 lg:mt-0 dark:bg-[#0f1011] min-h-screen flex-flex-col rounded-2xl">
          <div className="px-5 py-2 border border-secondary text-sm flex justify-between items-center">
            <div>
              <h1>Boards</h1>
            </div>
            <div>
              <AddBoardButton
                members={members as Member[]}
                currentWorkspaceId={params.workspaceId}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-[5vw] mt-5">
            {boards.map((board) => (
              <Link
                key={board.id}
                href={`boards/${board.id}`}
                className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                style={{ backgroundImage: `url(${board.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                <p className="relative font-semibold text-white">
                  {board.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
