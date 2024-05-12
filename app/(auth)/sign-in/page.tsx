import { Social } from "@/components/social";
import { FC, Suspense } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <Suspense>
        <div>
          <Social />
        </div>
      </Suspense>
    </>
  );
};

export default Page;
