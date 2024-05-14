"use client";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserSearch } from "lucide-react";

type Assignee = {
  value: string;
  label: string;
};

const assignees: Assignee[] = [
  {
    value: "no assignee",
    label: "No Assignee",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

export function AssigneeSelector() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedAssignee, setSelectedAssignee] =
    React.useState<Assignee | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"sidebar"}
            size={"sidebar"}
            className="bg-secondary min-w-[80px]"
          >
            {selectedAssignee ? (
              <>{selectedAssignee.label}</>
            ) : (
              <>
                {" "}
                <UserSearch className="w-4 h-4 mr-1" /> Set Assignee
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <AssigneeList
            setOpen={setOpen}
            setSelectedAssignee={setSelectedAssignee}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={"sidebar"}
          size={"sidebar"}
          className="bg-secondary min-w-[80px]"
        >
          {selectedAssignee ? (
            <>{selectedAssignee.label}</>
          ) : (
            <>
              {" "}
              <UserSearch className="w-4 h-4 mr-1" /> Set Assignee
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <AssigneeList
            setOpen={setOpen}
            setSelectedAssignee={setSelectedAssignee}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function AssigneeList({
  setOpen,
  setSelectedAssignee,
}: {
  setOpen: (open: boolean) => void;
  setSelectedAssignee: (assignee: Assignee | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter Assignee..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {assignees.map((assignee) => (
            <CommandItem
              key={assignee.value}
              value={assignee.value}
              onSelect={(value) => {
                setSelectedAssignee(
                  assignees.find((assignee) => assignee.value === value) || null
                );
                setOpen(false);
              }}
            >
              {assignee.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
