"use client";
import { updateIssue } from "@/actions/issues";
import AddLinkModal from "@/components/modals/add-link-modal";
import { Spinner } from "@/components/spinner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Member } from "../../../members/_components/members/column";
import ChangeAssignee from "../../_components/assignee-button";
import CommandMenuStatus from "../../_components/command-menu-issue";
import CommandMenuPriority from "../../_components/command-menu-priority";

import ActivityAccordian from "./activity-accordian";
import LinkAccordian from "./link-accordian";

interface IssueContentProps {
  issue: any;
  members: Member[];
}

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2).max(50),
  description: z.string().min(0).max(250),
  duedate: z.date().optional(),
});

const IssueContent: FC<IssueContentProps> = ({ issue, members }) => {
  const [isModified, setIsModified] = useState(false);

  const user = useCurrentUser();
  console.log(issue);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: issue.id || "",
      title: issue.title || "",
      description: issue.description || "",
      duedate: issue.duedate || undefined,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  {
    console.log(form.getValues());
  }
  const { watch } = form;
  const watchedFields = watch();
  useEffect(() => {
    const initialValues = {
      id: issue.id || "",
      title: issue.title || "",
      description: issue.description || "",
      duedate: issue.duedate || undefined,
    };

    setIsModified(
      JSON.stringify(watchedFields) !== JSON.stringify(initialValues)
    );
  }, [watchedFields]);
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      await updateIssue(
        values.id,
        user?.id as string,
        values.title,
        values.description,
        values.duedate
      );
      form.reset();
      toast.success("Issue Updated.");
      window.location.reload();
      setIsModified(false);
    } catch (error) {
      console.error(error);
      toast.error("Error creating Workspace.");
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-0 border-none rounded-lg md:px-0 focus-within:shadow-sm border-zinc-800"
            >
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <div className="flex lg:flex-row space-x-5">
                    <div className="w-full pr-5 space-y-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                id="title"
                                placeholder="Issue Title"
                                // type="text"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="border-none text-neutral-100 text-3xl h-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                id="description"
                                placeholder="Add description...(optional) [max 250 words]"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="border-none focus-none text-xl"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <FormField
                      control={form.control}
                      name="duedate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="sidebar"
                                  size={"sidebar"}
                                  role="combobox"
                                  className="bg-secondary min-w-[80px] hover:text-sm hover:text-indigo-400 hover:bg-inherit"
                                >
                                  {field.value ? (
                                    format(field.value, "MMM dd")
                                  ) : (
                                    <span>Due Date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-fit p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {isModified && (
                    <Button
                      disabled={!isModified || isLoading}
                      className="mt-5"
                    >
                      {isLoading && <Spinner />}
                      Update Issue
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>

          <div className="grid grid-cols-1 gap-3 mt-5 lg:hidden">
            <CommandMenuStatus
              id={issue.id as string}
              currentStatus={issue.status as string}
              displayTitle={true}
            />
            <CommandMenuPriority
              id={issue.id as string}
              currentPriority={issue.priority as string}
              displayTitle={true}
            />
            <ChangeAssignee
              id={issue.id as string}
              currentAssigneeId={issue.assigneeId as string}
              members={members}
            />
            <AddLinkModal issueId={issue.id as string} />
          </div>

          <LinkAccordian issue={issue} />
          <ActivityAccordian issue={issue} />
        </div>
        <div className="max-w-sm hidden lg:block">
          <div className="flex flex-col w-full space-y-3 pl-3 justify-end">
            <CommandMenuStatus
              id={issue.id as string}
              currentStatus={issue.status as string}
              displayTitle={true}
            />
            <CommandMenuPriority
              id={issue.id as string}
              currentPriority={issue.priority as string}
              displayTitle={true}
            />
            <ChangeAssignee
              id={issue.id as string}
              currentAssigneeId={issue.assigneeId as string}
              members={members}
            />
            <AddLinkModal issueId={issue.id as string} />
            {/* <FileUpload
              endpoint="cardFile"
              value={""}
              onChange={(value) => {
                console.log(value);
              }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueContent;
