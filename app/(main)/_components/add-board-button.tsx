"use client";
import { Button } from "@/components/ui/button";
import { ClipboardPen } from "lucide-react";
import { FC } from "react";

interface AddBoardButtonProps {
  currentWorkspaceId: string;
}

const AddBoardButton: FC<AddBoardButtonProps> = ({ currentWorkspaceId }) => {
  return (
    <>
      <Button
        variant={"sidebar"}
        size={"sidebar"}
        className="w-full items-middle flex justify-start hover:text-indigo-400 hover:bg-secondary"
      >
        <ClipboardPen className="h-4 w-4 mr-3" />
        Add Board
      </Button>
    </>
  );
};

export default AddBoardButton;
