import Filters from "./filters-pc-list";
import ListPcStates from "./list-pcs";
import { useEffect, useState } from "react";
import { PcInfoBack } from "@/types/types";
import { getAllComputers } from "@/services/computers.service";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/pagination";

const StatusPanelModule = () => {
  const { page, totalPages, setPage, setTotalPages } = usePagination();
  const [listPc, setListPc] = useState<PcInfoBack[]>([]);
  const [url, setUrl] = useState<string>("/computador/all");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllComputers({
        url,
        page,
        size: 10,
      });
      if (res.status) {
        if (typeof res.data === "string") return;
        const { computers, totalPages } = res.data;
        setListPc(computers as PcInfoBack[]);
        setTotalPages(totalPages);
        setLoading(false);
        return;
      }
      setLoading(false);
    })();
  }, [url, page]);

  return (
    <div className="flex flex-col gap-10">
      <Filters setUrl={setUrl} />
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && listPc.length === 0 && <p>No hay computadores</p>}
      <ListPcStates listPc={listPc} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        handlePage={setPage}
      />
    </div>
  );
};

export default StatusPanelModule;
