import { MobileHeader } from "./_components/mobile-header";
import { Sidebar } from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  return (
    <>
      <div className="py-24 px-[10vw]">{children}</div>
    </>
  );
};

export default MainLayout;
