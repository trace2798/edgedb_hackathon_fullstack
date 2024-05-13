import { checkStatus } from "@/lib/checkStatus";
import { FC } from "react";
import DialogNonUser from "../_components/dialog-non-member";

const SettingsPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const status = await checkStatus({ workspaceId: params.workspaceId });
  console.log(status);
  if (status === "not member") {
    return <DialogNonUser />;
  }
  return (
    <>
      <div>SettingsPage</div>
    </>
  );
};

export default SettingsPage;
