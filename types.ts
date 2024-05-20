import { LocalDateTime } from "edgedb";

export type List = {
  id: string;
  boardId: string;
  workspaceId: string;
  title: string;
  order: number;
  created: LocalDateTime | null;
  updated: LocalDateTime | null;
};

export type Card = {
  id: string;
  title: string;
  order: number;
  listId: string;
  description?: string;
  list_id?: string;
  created: LocalDateTime | null;
  updated: LocalDateTime | null;
  status: string;
  priority: string;
  assigneeId?: string;
  duedate?: LocalDateTime | null;
};


export type ListWithCards = List & { cards: Card[] };
