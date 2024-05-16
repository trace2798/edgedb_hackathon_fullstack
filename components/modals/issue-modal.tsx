"use client";

import { createIssue } from "@/actions/issues";
import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useIssues } from "@/hooks/use-issues";
import { priorities, statuses } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface IssueModalProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(0).max(250),
  status: z.string().min(2).max(50),
  priority: z.string().min(2).max(50),
  assignee: z.string().min(2).max(50),
  duedate: z.date().optional(),
  urls: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
});

export function IssueModal({ className, ...props }: IssueModalProps) {
  const issues = useIssues();
  const members = useIssues((state) => state.members);
  console.log(members);
  const user = useCurrentUser();
  console.log(user);
  const membershipIdOfCurrentUser = findCurrentUsersMembershipId(
    members as Member[],
    user as User
  ) as string;
  console.log(membershipIdOfCurrentUser);

  useEffect(() => {
    form.setValue("assignee", membershipIdOfCurrentUser);
  }, [membershipIdOfCurrentUser]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "no priority",
      assignee: membershipIdOfCurrentUser as string,
      duedate: undefined,
      urls: [{ value: "" }],
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
      const urls = values.urls?.map((url) => {
        if (
          !url.value.startsWith("http://") &&
          !url.value.startsWith("https://")
        ) {
          return "https://" + url.value;
        }
        return url.value;
      });
      console.log(values);
      await createIssue(
        user?.id as string,
        values.title,
        values.description,
        values.status,
        values.priority,
        values.assignee,
        values.duedate,
        urls
        // values.urls?.map((url) => url.value)
      );
      form.reset();
      toast.success("Issue Created.");
      router.refresh();
      issues.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error creating Workspace.");
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={issues.isOpen} onOpenChange={issues.onClose}>
      <DialogContent className="">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium text-neutral-200">
            Create an Issue
          </h2>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-0 border-none rounded-lg md:px-0 focus-within:shadow-sm border-zinc-800"
          >
            <div className="grid gap-3">
              <div className="grid gap-1">
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
                          className="border-none text-neutral-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
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
                            className="border-none focus-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-3 mt-3">
                  <FormField
                    control={form.control}
                    name="status"
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
                                  ? statuses.find(
                                      (status) => status.value === field.value
                                    )?.label
                                  : "Status"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search options..." />
                              <CommandEmpty>
                                No status option found.
                              </CommandEmpty>
                              <CommandGroup>
                                {statuses.map((status) => (
                                  <CommandItem
                                    value={status.label}
                                    key={status.value}
                                    className="flex justify-between"
                                    onSelect={() => {
                                      form.setValue("status", status.value);
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <status.icon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          status.value === field?.value
                                            ? "opacity-100"
                                            : "opacity-40"
                                        )}
                                      />
                                      {status.label}
                                    </div>

                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        status.value === field.value
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
                    name="priority"
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
                                  ? priorities.find(
                                      (priority) =>
                                        priority.value === field.value
                                    )?.label
                                  : "Priority"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search options..." />
                              <CommandEmpty>
                                No priority option found.
                              </CommandEmpty>
                              <CommandGroup>
                                {priorities.map((priority) => (
                                  <CommandItem
                                    value={priority.label}
                                    key={priority.value}
                                    className="flex justify-between"
                                    onSelect={() => {
                                      form.setValue("priority", priority.value);
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <priority.icon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          priority.value === field?.value
                                            ? "opacity-100"
                                            : "opacity-40"
                                        )}
                                      />
                                      {priority.label}
                                    </div>

                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        priority.value === field.value
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
                    name="assignee"
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
                                      form.setValue("assignee", member.id);
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

                  {/* <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <AlertDialogTrigger  
                        // onClick={() => append({ value: "" })}
                        >
                          <DropdownMenuItem>Add Link</DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                      <AlertDialogContent>
                        <AlertDialogHeader>Add Link</AlertDialogHeader>
                        <div>
                          {fields.map((field, index) => (
                            <FormField
                              control={form.control}
                              key={field.id}
                              name={`urls.${index}.value`}
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel
                                    className={cn(index !== 0 && "sr-only")}
                                  >
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
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              // onClick={() => append({ value: "" })}
                            >
                              Add Link
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </div>
                      </AlertDialogContent>
                    </DropdownMenu>
                  </AlertDialog> */}
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
                  Create Issue
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function findCurrentUsersMembershipId(members: Member[], user: User) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].userId === user.id) {
      return members[i].id;
    }
  }
  return null;
}
