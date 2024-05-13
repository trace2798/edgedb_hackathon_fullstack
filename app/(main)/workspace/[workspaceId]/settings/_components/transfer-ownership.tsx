"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TransferOwnershipForm from "./add-member-form";

const TransferOwnership = ({
  status,
  workspaceId,
}: {
  status: any;
  workspaceId: string;
}) => {
  return (
    <>
      <Card className="border-teal-300">
        <CardHeader>
          <CardTitle>Transfer Workspace ownership</CardTitle>
          <CardDescription>
            The owner of the workspace will change. Only the current owner has
            the privilege to transfer ownership. This action is irreversible and
            can not be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-primary-foreground rounded-xl">
          {typeof status === "object" && status.memberRole === "owner" ? (
            // <Button className="w-[320px] mt-5">Transfer Ownership</Button>
            <TransferOwnershipForm workspaceId={workspaceId} />
          ) : (
            <Button disabled={true} className="w-[320px] mt-5">
              Transfer Ownership
            </Button>

            // <AlertDialog>
            //   <AlertDialogTrigger>
            //  <Button
            //   disabled={true}
            //   variant="destructive"
            //   className="w-[320px] mt-5"
            // >
            //   Delete
            // </Button>
            //   </AlertDialogTrigger>
            //   <AlertDialogContent>
            //     <AlertDialogHeader>
            //       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            //       <AlertDialogDescription>
            //         This action cannot be undone. This will permanently delete
            //         your account and remove your data from our servers.
            //       </AlertDialogDescription>
            //     </AlertDialogHeader>
            //     <AlertDialogFooter>
            //       <AlertDialogCancel>Cancel</AlertDialogCancel>
            //       <AlertDialogAction>Continue</AlertDialogAction>
            //     </AlertDialogFooter>
            //   </AlertDialogContent>
            // </AlertDialog>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default TransferOwnership;
