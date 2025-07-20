import Layout from "@/components/layout";
import useSEO from "@/hooks/useSEO";
import { ModuleUserPage } from "@/modules/user/page";

const UsersPage = () => {
  useSEO({
    title: "Usuarios",
    description: "Usuarios de la aplicación",
  });
  return (
    <Layout>
      <ModuleUserPage />
    </Layout>
  );
};

export default UsersPage;
