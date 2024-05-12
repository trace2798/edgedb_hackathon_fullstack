import { MobileHeader } from "./_components/mobile-header";
import { Sidebar } from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  return <>{children}</>;
};

export default MainLayout;
