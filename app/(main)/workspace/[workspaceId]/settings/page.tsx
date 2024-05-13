import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkStatus } from "@/lib/checkStatus";
import DeleteWorkspace from "./_components/delete-workspace";
import TransferOwnership from "./_components/transfer-ownership";

const SettingsPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const status = await checkStatus({ workspaceId: params.workspaceId });
  console.log(status);
  return (
    <>
      <div className="space-y-5">
        <TransferOwnership status={status} />
        <DeleteWorkspace status={status} workspaceId={params.workspaceId} />
      </div>
    </>
  );
};

export default SettingsPage;
