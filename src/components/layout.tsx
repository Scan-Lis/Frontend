import UserProfileInfo from "@/modules/user/info/user-profile-info";
import Sidebar from "./sidebar/sidebar";
import { RolesDB } from "@/types/types";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </main>
    );
  }

  const role = session.user.rol as RolesDB;

  return (
    <main
      className={`relative p-8 h-screen flex gap-8 overflow-x-hidden ${className}`}>
      <Sidebar role={role} />
      <aside className="flex-1 flex flex-col gap-2">
        <UserProfileInfo
          name={session.user.name as string}
          role={role}
          className="self-end h-fit"
        />
        <div className="flex-1">{children}</div>
      </aside>
    </main>
  );
};

export default Layout;
