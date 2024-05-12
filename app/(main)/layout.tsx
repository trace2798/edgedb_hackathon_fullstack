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
      {children}
    </>
  );
};

export default MainLayout;
