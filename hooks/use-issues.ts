// import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
// import { create } from "zustand";

// type IssuesStore = {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
//   members?: Member[];
// };

// export const useIssues = create<IssuesStore>((set) => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
import { create } from "zustand";

type IssuesStore = {
  members?: Member[];
  isOpen: boolean;
  onOpen: (members: Member[]) => void;
  onClose: () => void;
};

export const useIssues = create<IssuesStore>((set) => ({
  members: [],
  isOpen: false,
  onOpen: (members: Member[]) => set({ isOpen: true, members}),
  onClose: () => set({ isOpen: false }),
}));
