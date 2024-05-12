import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      Hello
    </main>
  );
}
