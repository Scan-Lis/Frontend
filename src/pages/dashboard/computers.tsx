import Layout from "@/components/layout";
import useSEO from "@/hooks/useSEO";
import ComputersCrudModule from "@/modules/computers/crud";

const ComputersPage = () => {
  useSEO({
    title: "Computadoras",
    description: "Computadoras de la aplicación",
  });
  return (
    <Layout>
      <ComputersCrudModule />
    </Layout>
  );
};

export default ComputersPage;
