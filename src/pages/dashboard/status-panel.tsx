import Filters from "@/components/filters";
import Layout from "@/components/layout";
import ListPcStates from "@/modules/computers/list/list-pcs";

const StatusPanel = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <Filters />
        <ListPcStates />
      </div>
    </Layout>
  );
};

export default StatusPanel;
