"use client";
import { updateStatus } from "@/actions/issues";
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
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/use-current-user";
import { statuses } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpCircle,
  Check,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  status: z.string(),
});
interface CommandMenuStatusProps {
  id: string;
  currentStatus: string;
}

const statusIcons = {
  future: HelpCircle,
  todo: Circle,
  "in progress": ArrowUpCircle,
  done: CheckCircle2,
  canceled: XCircle,
};
const CommandMenuStatus: FC<CommandMenuStatusProps> = ({
  id,
  currentStatus,
}) => {
  const user = useCurrentUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      status: currentStatus,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  const StatusIcon = statusIcons[currentStatus as keyof typeof statusIcons];
  const { watch } = form;
  const watchedStatus = watch("status");

  useEffect(() => {
    if (watchedStatus !== currentStatus) {
      onSubmit({ id, status: watchedStatus });
    }
  }, [watchedStatus]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      console.log(values);
      const response = await updateStatus(
        values.id,
        values.status,
        user?.id as string
      );
      if (response === "Issue Status Updated") {
        toast.success("Status updated");
        router.refresh();
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status.");
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <div
        className="flex items-center space-x-4"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-0 border-none rounded-lg md:px-0 focus-within:shadow-sm border-zinc-800"
          >
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
                          className="text-muted-foreground hover:text-indigo-400"
                        >
                          {field.value ? (
                            <>
                              {StatusIcon && (
                                <StatusIcon className="w-4 h-4 mr-1" />
                              )}
                            </>
                          ) : (
                            "Status"
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Status options..." />
                        <CommandEmpty>No status option found.</CommandEmpty>
                        <CommandGroup>
                          {statuses.map((status) => (
                            <CommandItem
                              disabled={isLoading}
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
          </form>
        </Form>
      </div>
    </>
  );
};

export default CommandMenuStatus;
