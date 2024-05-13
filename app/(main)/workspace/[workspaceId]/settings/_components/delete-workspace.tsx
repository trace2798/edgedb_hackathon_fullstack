"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";


const DeleteWorkspace = ({status}: {status: any}) => {
  return (
    <>
      <Card className="border-red-300">
        <CardHeader>
          <CardTitle>Delete Workspace</CardTitle>
          <CardDescription>
            The workspace will be permanently deleted, including all its data.
            This action is irreversible and can not be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-[#2A1214] rounded-xl">
          {typeof status === "object" && status.memberRole === "owner" ? (
            <Button variant="destructive" className="w-[320px] mt-5">
              Delete
            </Button>
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

export default DeleteWorkspace;
