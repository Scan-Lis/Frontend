import Sidebar from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <main className={`p-8 h-screen flex gap-4 ${className}`}>
      <Sidebar />
      <aside className="flex-1">{children}</aside>
    </main>
  );
};

export default Layout;
