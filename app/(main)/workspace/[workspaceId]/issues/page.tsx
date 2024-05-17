import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import e, { createClient } from "@/dbschema/edgeql-js";
import { format } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";
import { Member } from "../members/_components/members/column";
import AddIssueButton from "./_components/add-issue-button";
import CommandMenuStatus from "./_components/command-menu-issue";
import CommandMenuPriority from "./_components/command-menu-priority";
import DeleteIssueButton from "./_components/delete-issue-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTaskButtonFooter from "./_components/add-task-button-footer";

const client = createClient();

const Page = async ({ params }: { params: { workspaceId: string } }) => {
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
      duedate: true,
      // urls: true,
      filter: e.op(issue.workspaceId, "=", e.uuid(params.workspaceId)),
      order_by: {
        expression: issue.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(issues);
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  return (
    <>
      <div className="pt-[50px] lg:pt-0 lg:mt-0 dark:bg-[#0f1011] min-h-screen flex-flex-col rounded-2xl">
        <div className="px-5 py-2 border border-secondary text-sm flex justify-between">
          <h1>All Tasks</h1>
          <AddIssueButton members={members as Member[]} defaultStatus="todo" />
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <div>
            {issues.length === 0 && (
              <div className="h-screen flex flex-col items-center justify-center ">
                <Card className="bg-secondary max-w-lg">
                  <CardHeader className="space-y-5">
                    <CardTitle>Tasks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p>
                      Tasks are fundamental units of work, each serving a
                      specific purpose towards achieving a larger goal. They
                      vary in complexity and duration, ranging from simple,
                      short-term actions to intricate, long-term projects.
                    </p>
                    <p>
                      Effective task management involves prioritizing,
                      scheduling, and tracking progress, which enhances
                      productivity and ensures timely completion. Tasks, whether
                      individual or collaborative, are the building blocks that
                      drive progress and success in any endeavor.
                    </p>
                  </CardContent>
                  <CardFooter>
                    {" "}
                    <AddTaskButtonFooter
                      members={members as Member[]}
                      defaultStatus="future"
                      title="Add A Task"
                    />
                  </CardFooter>
                </Card>
              </div>
            )}
            {issues.map((issue, index) => {
              return (
                <div
                  key={index}
                  className="px-5 py-2 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center dark:hover:bg-zinc-800 hover:cursor-pointer"
                >
                  <div className="flex  justify-between items-center">
                    <div className="flex space-x-1 mr-5">
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
                      {/* <LinkAlert
                        id={issue.id as string}
                        currentUrls={issue.urls as string[]}
                      /> */}
                    </div>
                    <Link href={`issues/${issue.id}`}>
                      <div className="line-clamp-1">{issue.title}</div>
                    </Link>
                  </div>
                  <div className="flex space-x-3">
                    <div>
                      {issue.duedate ? (
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <h1 className="w-[60px] px-1">
                              {format(
                                new Date(issue.duedate as Date),
                                "MMM dd"
                              )}
                            </h1>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit text-sm py-1 px-2">
                            Due on:{" "}
                            {format(
                              new Date(issue.duedate as Date),
                              "MMM dd, yyyy"
                            )}
                          </HoverCardContent>
                        </HoverCard>
                      ) : (
                        <h1 className="w-[60px] px-1"></h1>
                      )}
                    </div>
                    <div className="hidden lg:flex">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <h1 className="w-[60px] px-1">
                            {format(new Date(issue.updated as Date), "MMM dd")}
                          </h1>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit text-sm py-1 px-2">
                          Updated on:{" "}
                          {format(
                            new Date(issue.updated as Date),
                            "MMM dd, yyyy"
                          )}
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Suspense>
      </div>
    </>
  );
};
export default Page;
