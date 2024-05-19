"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

// import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
// import { createList } from "@/actions/create-list";
import { FormInput } from "../form-input";
import { FormSubmit } from "../form-submit";

import { ListWrapper } from "./list-wrapper";

export const ListForm = ({ tenant_id }: { tenant_id: string }) => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  // const { execute, fieldErrors } = useAction(createList, {
  //   onSuccess: (data) => {
  //     toast.success(`List "${data[0].title}" created`);
  //     disableEditing();
  //     router.refresh();
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });
  const createList = ({ title, boardId, tenant_id }: any) => {};
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    const tenant_id = formData.get("tenant_id") as string;
    // execute({
    //   title,
    //   boardId,
    //   tenant_id,
    // });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            // errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" />
          <input hidden value={tenant_id} name="tenant_id" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md  bg-slate-600/50 hover:bg-indigo-600 transition p-3 flex items-center font-medium text-sm text-neutral-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
