import { MobileHeader } from "./_components/mobile-header";
import { Sidebar } from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  return (
    <>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      <Sidebar className="hidden lg:flex" />
      <div className="py-24 px-[10vw] lg:ml-[256px]">{children}</div>
    </>
  );
};

export default MainLayout;
