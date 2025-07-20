import { getProblems } from "@/services/problems.service";
import { ProblemDataGet } from "@/types/types";
import { useEffect, useState } from "react";
import ProblemsTable from "./table";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/pagination";
import FilterSection from "./filter-section";

const ProblemsModule = () => {
  const [listProblems, setListProblems] = useState<ProblemDataGet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("/problema");
  const [error, setError] = useState<string>("");
  const { page, totalPages, setPage, setTotalPages } = usePagination();

  useEffect(() => {
    (async () => {
      try {
        const response = await getProblems({
          url,
          page: 0,
          size: 10,
        });
        if (response.status) {
          setListProblems(response.data as ProblemDataGet[]);
        } else {
          setError(response.data as string);
        }
        setLoading(false);
      } catch (error) {
        setError("Error al obtener los problemas");
        setLoading(false);
      }
    })();
  }, [url]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="">
      <h1 className="font-bold text-2xl mb-4 text-dark-blue">Problemas</h1>
      <FilterSection setUrl={setUrl} />
      <ProblemsTable listProblems={listProblems} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        handlePage={setPage}
      />
    </main>
  );
};

export default ProblemsModule;
