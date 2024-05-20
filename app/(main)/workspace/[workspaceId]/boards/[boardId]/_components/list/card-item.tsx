"use client";

import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/types";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import CardMenuPriority from "../../../_components/priority-menu";
import CardMenuStatus from "../../../_components/status-menu";
import ChangeDueDate from "../../../_components/duedate-menu";
import { LocalDateTime } from "edgedb";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white dark:bg-zinc-800 rounded-md shadow-sm"
        >
          <div onClick={() => cardModal.onOpen(data.id, data)}>
            {data.title}
          </div>
          <Separator className="bg-zinc-600 my-1" />
          <div className="flex flex-row justify-between">
            <CardMenuPriority id={data.id} currentPriority={data.priority} />
            <CardMenuStatus id={data.id} currentStatus={data.status} />
            <ChangeDueDate id={data.id} currentDueDate={data.duedate as LocalDateTime} />
          </div>
        </div>
      )}
    </Draggable>
  );
};
