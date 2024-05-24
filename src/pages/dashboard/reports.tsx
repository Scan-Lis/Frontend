import Layout from "@/components/layout";
import useSEO from "@/hooks/useSEO";
import ReportsModule from "@/modules/reports/list";

const ReportsPage = () => {
  useSEO({
    title: "Reportes",
    description: "Reportes de la aplicación",
  });
  return (
    <Layout>
      <ReportsModule />
    </Layout>
  );
};

export default ReportsPage;
