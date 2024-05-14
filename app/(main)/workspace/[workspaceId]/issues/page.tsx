import { FC } from "react";
import AddIssueButton from "./_components/add-issue-button";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <div className="pt-[50px] lg:mt-0 dark:bg-zinc-900 min-h-screen flex-flex-col rounded-xl">
        <div className="px-5 py-2 border border-secondary text-sm flex justify-between">
          <h1>All Issues</h1>
          <AddIssueButton />
        </div>
      </div>
    </>
  );
};

export default Page;
