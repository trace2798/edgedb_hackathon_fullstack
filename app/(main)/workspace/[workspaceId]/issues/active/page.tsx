import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import e, { createClient } from "@/dbschema/edgeql-js";
import { format } from "date-fns";
import AddIssueButton from "../_components/add-issue-button";
import { Member } from "../../members/_components/members/column";
import CommandMenuPriority from "../_components/command-menu-priority";
import CommandMenuStatus from "../_components/command-menu-issue";
import DeleteIssueButton from "../_components/delete-issue-button";

const client = createClient();

const ActivePage = async ({ params }: { params: { workspaceId: string } }) => {
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
  console.log(members);
  const issues = await e
    .select(e.Issue, (issue) => ({
      id: true,
      title: true,
      status: true,
      priority: true,
      created: true,
      updated: true,
      filter: e.op(
        e.op(issue.workspaceId, "=", e.uuid(params.workspaceId)),
        "and",
        e.op(issue.status, "!=", e.str("future"))
      ),
      order_by: {
        expression: issue.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(issues);
  return (
    <>
      <div className="pt-[50px] lg:pt-0 lg:mt-0 dark:bg-[#0f1011] min-h-screen flex-flex-col rounded-2xl">
        <div className="px-5 py-2 border border-secondary text-sm flex justify-between">
          <h1>Active Issues</h1>
          <AddIssueButton members={members as Member[]} />
        </div>
        <div>
          {issues.map((issue, index) => {
            return (
              <div
                key={index}
                className="px-5 py-2 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center dark:hover:bg-zinc-800 hover:cursor-pointer"
              >
                <div className="flex  justify-between items-center">
                  <div className="flex space-x-3 w-18 mr-5">
                    {" "}
                    <DeleteIssueButton issueId={issue.id as string} />
                    <CommandMenuPriority
                      id={issue.id as string}
                      currentPriority={issue.priority as string}
                    />
                    <CommandMenuStatus
                      id={issue.id as string}
                      currentStatus={issue.status as string}
                    />
                  </div>
                  <div className="line-clamp-1">{issue.title}</div>
                </div>

                <div className="lg:flex space-x-3 hidden">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h1>
                        {format(new Date(issue.created as Date), "MMM dd")}
                      </h1>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit dark:bg-zinc-800 text-sm py-1 px-2">
                      Created on:{" "}
                      {format(
                        new Date(issue.created as Date),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h1>
                        {format(new Date(issue.updated as Date), "MMM dd")}
                      </h1>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit text-sm py-1 px-2">
                      Updated on:{" "}
                      {format(
                        new Date(issue.updated as Date),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ActivePage;
