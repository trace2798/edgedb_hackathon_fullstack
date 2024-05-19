"use client";

import { ElementRef, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { List, ListWithCards } from "@/types";

import { CardForm } from "./card-form";
// import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: ListWithCards;
  index: number;
  userInfo: any;
}

export const ListItem = ({ data, index, userInfo }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  console.log(data);
  console.log(userInfo)
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md  bg-slate-600/50 shadow-md pb-2"
          >
            <ListHeader onAddCard={enableEditing} data={data} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {/* {data.cards.map((card, index) => (
                    <CardItem index={index} key={card.id} data={card} userInfo={userInfo} />
                    // <h1 key={index}>{card.title}</h1>
                  ))} */}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            {/* <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              tenant_id={data.tenant_id}
            /> */}
          </div>
        </li>
      )}
    </Draggable>
  );
};
