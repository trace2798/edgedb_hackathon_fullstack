export type List = {
  id: string;
  boardId: string;
  workspaceId: string;
  title: string;
  order: number;
  created: Date;
  updated: Date;
};

export type Card = {
  id: string;
  title: string;
  order: number;
  listId: string;
  description?: string;
  list_id?: string;
  // createdAt: Date;
  // updatedAt: Date;
  // status: string;
  // assign_id: string;
  // assign_name: string;
  // due_date: Date;
};


export type ListWithCards = List & { cards: Card[] };
