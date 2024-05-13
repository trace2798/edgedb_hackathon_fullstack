import { Card, CardHeader } from "@/components/ui/card";
import { checkStatus } from "@/lib/checkStatus";
import DialogNonUser from "./_components/dialog-non-member";

const Page = async ({ params }: { params: { workspaceId: string } }) => {
  const status = await checkStatus({ workspaceId: params.workspaceId });
  console.log(status);
  if (status === "not member") {
    return <DialogNonUser />;
  }
  return (
    <>
      <div className=" flex justify-center items-center text-center">
        <Card className=" ml-5">
          <CardHeader>{params.workspaceId}</CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Page;
