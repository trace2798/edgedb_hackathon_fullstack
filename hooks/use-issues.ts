import { create } from "zustand";

type IssuesStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useIssues = create<IssuesStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));