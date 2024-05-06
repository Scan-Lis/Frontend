import Filters from "./filters-pc-list";
import ListPcStates from "./list-pcs";
import { useEffect, useState } from "react";
import { PcInfoBack } from "@/types/types";
import { getAllComputers } from "@/services/computers.service";

const StatusPanelModule = () => {
  const [listPc, setListPc] = useState<PcInfoBack[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllComputers();
      if (res.status) {
        setListPc(res.data as PcInfoBack[]);
        setLoading(false);
        return;
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <Filters
        setListPc={setListPc}
        setError={setError}
        setLoading={setLoading}
      />
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && listPc.length === 0 && <p>No hay computadores</p>}
      <ListPcStates listPc={listPc} />
    </div>
  );
};

export default StatusPanelModule;
