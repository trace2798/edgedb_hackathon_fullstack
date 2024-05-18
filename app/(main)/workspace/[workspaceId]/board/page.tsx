"use client";
import { FileUpload } from "@/components/file-upload";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div>
        <FileUpload
          endpoint="cardFile"
          onChange={(value) => {
            console.log(value);
          }}
          value=""
        />
      </div>
    </>
  );
};

export default page;
