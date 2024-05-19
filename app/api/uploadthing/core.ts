import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  return { userId: session?.user?.id };
};

export const ourFileRouter = {
  boardImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  cardFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
