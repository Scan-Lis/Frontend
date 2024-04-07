import UserProfileInfo from "@/modules/user/info/user-profile-info";
import Sidebar from "./sidebar";
import { RolesDB } from "@/types/types";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  const { data: session } = useSession();

  const role: RolesDB = session?.user?.rol as RolesDB;
  console.log(role);

  return (
    <main
      className={`relative p-8 h-screen flex gap-8 overflow-x-hidden ${className}`}>
      <Sidebar role={RolesDB.ROLE_AUXILIAR} />
      <aside className="flex-1 flex flex-col gap-2">
        <UserProfileInfo
          role={RolesDB.ROLE_AUXILIAR}
          className="self-end h-fit"
        />
        <div className="flex-1">{children}</div>
      </aside>
    </main>
  );
};

export default Layout;
