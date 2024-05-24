import TableReports from "./table/table";
import { useEffect, useState } from "react";
import { ReportDataGet } from "@/types/types";
import { getReports } from "@/services/reports.service";
import Pagination from "@/components/pagination";
import ReportsFilterSection from "./filter-section";
import usePagination from "@/hooks/usePagination";

const ReportsModule = () => {
  const [listReports, setListReports] = useState<ReportDataGet[]>([]);
  const [url, setUrl] = useState<string>("/reporte");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { page, totalPages, setPage, setTotalPages } = usePagination();

  useEffect(() => {
    (async () => {
      try {
        const response = await getReports({
          url,
          page,
          size: 5,
        });
        if (response.status) {
          if (typeof response.data === "string") return;
          const { reports, totalPages } = response.data;
          setListReports(reports as ReportDataGet[]);
          setTotalPages(totalPages);
        } else {
          setError(response.data as string);
        }
        setLoading(false);
      } catch (error) {
        setError("Error al obtener los reportes");
        setLoading(false);
      }
    })();
  }, [page, url]);

  return (
    <section className="py-4">
      <ReportsFilterSection setUrl={setUrl} />
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : listReports.length === 0 ? (
        <p>No hay reportes</p>
      ) : (
        <TableReports listReports={listReports} />
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        handlePage={setPage}
      />
    </section>
  );
};

export default ReportsModule;
