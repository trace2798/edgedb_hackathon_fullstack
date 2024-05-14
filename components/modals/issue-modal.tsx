"use client";

import { createWorkspace } from "@/actions/workspace";
import { StatusSelector } from "@/app/(main)/workspace/[workspaceId]/issues/_components/status-button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useIssues } from "@/hooks/use-issues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PrioritySelector } from "@/app/(main)/workspace/[workspaceId]/issues/_components/priority-selector";

interface IssueModalProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(250),
  status: z.string().min(2).max(50),
  priority: z.string().min(2).max(50),
});

export function IssueModal({ className, ...props }: IssueModalProps) {
  const issues = useIssues();
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "todo",
      priority: "no priority",
    },
  });
  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      await createWorkspace(
        user?.id as string,
        values.name,
        values.description
      );
      form.reset();
      toast.success("Workspace Created.");
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
            <div className="grid gap-3 ">
              <div className="grid gap-1 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
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
                            placeholder="Add description...(optional)"
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
                <div className="flex space-x-2">
                  <StatusSelector />
                  <PrioritySelector />
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
