import { FC } from "react";
import e, { createClient } from "@/dbschema/edgeql-js";
import Link from "next/link";
import DeleteIssueButton from "../_components/delete-issue-button";
import CommandMenuPriority from "../_components/command-menu-priority";
import CommandMenuStatus from "../_components/command-menu-issue";
import LinkAlert from "../_components/link-alert";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from "date-fns";

interface PageProps {
  params: { workspaceId: string; issueId: string };
}

const client = createClient();

const Page: FC<PageProps> = async ({ params }) => {
  const issue = await e
    .select(e.Issue, (issue) => ({
      id: true,
      title: true,
      status: true,
      priority: true,
      created: true,
      updated: true,
      duedate: true,
      urls: true,
      filter_single: e.op(issue.id, "=", e.uuid(params.issueId)),
      order_by: {
        expression: issue.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(issue);
  if (!issue) {
    return <div>Issue not found</div>;
  }
  return (
    <>
      <div>
       
        <div className="px-5 py-2 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center dark:hover:bg-zinc-800 hover:cursor-pointer">
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
              <LinkAlert
                id={issue.id as string}
                currentUrls={issue.urls as string[]}
              />
            </div>
            <div className="line-clamp-1">{issue.title}</div>
          </div>
          <div className="flex space-x-3">
            <div className="hidden lg:flex">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <h1 className="w-[60px] px-1">
                    {format(new Date(issue.updated as Date), "MMM dd")}
                  </h1>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm py-1 px-2">
                  Updated on:{" "}
                  {format(new Date(issue.updated as Date), "MMM dd, yyyy")}
                </HoverCardContent>
              </HoverCard>
            </div>
            <div>
              {issue.duedate ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <h1 className="w-[60px] px-1">
                      {format(new Date(issue.duedate as Date), "MMM dd")}
                    </h1>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit text-sm py-1 px-3">
                    Due on:{" "}
                    {format(new Date(issue.duedate as Date), "MMM dd, yyyy")}
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <h1 className="w-[60px] px-1"></h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
