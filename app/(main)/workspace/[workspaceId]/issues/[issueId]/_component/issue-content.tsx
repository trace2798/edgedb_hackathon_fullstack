"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Member } from "../../../members/_components/members/column";
import ChangeDueDate from "../../_components/change-due-date";
import CommandMenuStatus from "../../_components/command-menu-issue";
import CommandMenuPriority from "../../_components/command-menu-priority";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import ChangeAssignee from "../../_components/assignee-button";

interface IssueContentProps {
  issue: any;
  members: Member[];
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(0).max(250),
  status: z.string().min(2).max(50),
  priority: z.string().min(2).max(50),
  assigneeId: z.string().min(2).max(50),
  duedate: z.date().optional(),
  urls: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
});

const IssueContent: FC<IssueContentProps> = ({ issue, members }) => {
  console.log(issue);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: issue.title || "",
      description: issue.description || "",
      status: issue.status,
      priority: issue.priority,
      assigneeId: issue.assigneeId || ("" as string),
      duedate: issue.duedate || undefined,
      urls: issue.urls || [],
    },
  });
  type FormData = z.infer<typeof formSchema>;
  {
    console.log(form.getValues());
  }
  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });
  console.log(fields);
  console.log(append);
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      let urls = values.urls?.map((url) => {
        if (
          !url.value.startsWith("http://") &&
          !url.value.startsWith("https://")
        ) {
          return "https://" + url.value;
        }
        return url.value;
      });

      if (urls?.length === 0) {
        urls = undefined;
      }

      console.log(values);
      //   await createIssue(
      //     user?.id as string,
      //     values.title,
      //     values.description,
      //     values.status,
      //     values.priority,
      //     values.assignee,
      //     values.duedate,
      //     urls
      //   );
      form.reset();
      toast.success("Issue Created.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error creating Workspace.");
    }
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-3/4 space-x-5">
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
                              <Input
                                id="title"
                                placeholder="Issue Title"
                                type="text"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="border-none text-neutral-100 text-3xl"
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
                      name="assigneeId"
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
                                  {field.value
                                    ? members?.find(
                                        (member) =>
                                          (member?.id as string) === field.value
                                      )?.name
                                    : "Assignee"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search members..." />
                                <CommandEmpty>No member found.</CommandEmpty>
                                <CommandGroup>
                                  {members?.map((member) => (
                                    <CommandItem
                                      value={member.id}
                                      key={member.id}
                                      className="flex justify-between"
                                      onSelect={() => {
                                        form.setValue("assigneeId", member.id);
                                      }}
                                    >
                                      <div className="flex items-center">
                                        {member.name}
                                      </div>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          member.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  <div className="mt-3">
                    {fields.map((field, index) => (
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`urls.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Links
                            </FormLabel>
                            <div className="flex items-center justify-between">
                              <FormControl>
                                <Input
                                  placeholder="https://"
                                  className="w-3/4"
                                  {...field}
                                />
                              </FormControl>

                              <Button
                                type="button"
                                variant="sidebar"
                                size="sidebar"
                                onClick={() => remove(index)}
                              >
                                Remove URL
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="sidebar"
                      size="sidebar"
                      className="mt-2 bg-secondary min-w-[80px] hover:text-sm hover:text-indigo-400 hover:bg-inherit"
                      onClick={() => append({ value: "" })}
                    >
                      Add Link
                    </Button>
                  </div>
                  <Button disabled={isLoading} className="mt-5">
                    {isLoading && <Spinner />}
                    Update Issue
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <div className="flex flex-col w-1/4 space-y-5">
            <h1>Properties</h1>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueContent;
