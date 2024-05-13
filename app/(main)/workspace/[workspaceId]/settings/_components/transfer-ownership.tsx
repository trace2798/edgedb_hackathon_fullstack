"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TransferOwnership = ({ status }: { status: any }) => {
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
            <Button className="w-[320px] mt-5">Transfer Ownership</Button>
          ) : (
            <Button
              disabled={true}
              variant="destructive"
              className="w-[320px] mt-5"
            >
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default TransferOwnership;
