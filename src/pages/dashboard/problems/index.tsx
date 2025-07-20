import Layout from "@/components/layout";
import ProblemsModule from "@/modules/problems";
import useSEO from "@/hooks/useSEO";

const ProblemsPage = () => {
  useSEO({
    title: "Problemas",
    description: "Problemas de la aplicación",
  });
  return (
    <Layout>
      <ProblemsModule />
    </Layout>
  );
};

export default ProblemsPage;
