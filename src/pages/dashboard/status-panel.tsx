import Layout from "@/components/layout";
import useSEO from "@/hooks/useSEO";
import StatusPanelModule from "@/modules/computers/list";

const StatusPanelPage = () => {
  useSEO({
    title: "Panel de Estado",
    description: "Panel de estado de los equipos",
  });
  return (
    <Layout>
      <StatusPanelModule />
    </Layout>
  );
};

export default StatusPanelPage;
