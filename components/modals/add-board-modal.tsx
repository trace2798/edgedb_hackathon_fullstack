"use client";
import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
import { useBoards } from "@/hooks/use-boards";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "next-auth";
import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FileUpload } from "../file-upload";
import { createBoard } from "@/actions/board";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(250),
  backgroundImage: z.string().optional(),
  creatorUserId: z.string().min(2).max(50),
  currentUsersMembershipId: z.string().min(2).max(50),
});

interface AddBoardModalProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddBoardModal({ className, ...props }: AddBoardModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const board = useBoards();
  const members = useBoards((state) => state.members);
  const user = useCurrentUser();
  console.log(user);
  const membershipIdOfCurrentUser = findCurrentUsersMembershipId(
    members as Member[],
    user as User
  ) as string;
  useEffect(() => {
    form.setValue("currentUsersMembershipId", membershipIdOfCurrentUser);
  }, [membershipIdOfCurrentUser]);
  console.log(membershipIdOfCurrentUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      backgroundImage: "",
      creatorUserId: user?.id as string,
      currentUsersMembershipId: membershipIdOfCurrentUser as string,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  {
    console.log(form.getValues());
  }
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);

      console.log(values);
      const response = await createBoard(
        values.creatorUserId,
        values.name,
        values.description,
        values.backgroundImage as string,
        values.currentUsersMembershipId
      );
      console.log(response);
      if (response === "Done") {
        toast.success("Board Created.");
        form.reset();
        router.refresh();
        board.onClose();
      } else {
        toast.error("Error creating Board.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating Workspace.");
    }
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <>
      <Dialog open={board.isOpen} onOpenChange={board.onClose}>
        <DialogContent className="">
          <DialogHeader className="border-b pb-3">
            <h2 className="text-lg font-medium text-neutral-200">
              Create a Board
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="title"
                            placeholder="Task Title"
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
                  <div>
                    <FormField
                      control={form.control}
                      name="backgroundImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileUpload
                              endpoint="boardImage"
                              value={field.value as string}
                              onChange={field.onChange}
                              title="Add  Image"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button disabled={isLoading} className="mt-5">
                    {isLoading && <Spinner />}
                    Create Board
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
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
