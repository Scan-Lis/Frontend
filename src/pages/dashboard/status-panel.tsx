import Filters from "@/components/filters";
import Layout from "@/components/layout";
import StatusPanelModule from "@/modules/computers/list";
import ListPcStates from "@/modules/computers/list/list-pcs";

const StatusPanelPage = () => {
  return (
    <Layout>
      <StatusPanelModule />
    </Layout>
  );
};

export default StatusPanelPage;
