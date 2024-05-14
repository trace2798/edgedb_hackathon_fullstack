"use client";
import { Button } from "@/components/ui/button";
import { useIssues } from "@/hooks/use-issues";
import { CircleDotIcon, Plus, PlusCircle, PlusCircleIcon } from "lucide-react";
import { FC } from "react";

interface AddIssueButtonProps {}

const AddIssueButton: FC<AddIssueButtonProps> = ({}) => {
  const issues = useIssues();
  return (
    <>
      <Button
        onClick={issues.onOpen}
        variant={"sidebar"}
        size={"sidebar"}
        className=" items-middle flex justify-start hover:text-indigo-400 hover:bg-secondary"
      >
        <Plus className="h-4 w-4 mr-3" />
        Add Issue
      </Button>
    </>
  );
};

export default AddIssueButton;
