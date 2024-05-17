"use client";

import { useEffect, useState } from "react";
import { IssueModal } from "../modals/issue-modal";
import { WorkspaceModal } from "../modals/workspaces-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <WorkspaceModal />
      <IssueModal />
    </>
  );
};
