import { getProblems } from "@/services/problems.service";
import { ProblemDataGet } from "@/types/types";
import { useEffect, useState } from "react";
import ProblemsTable from "./table";

const ProblemsModule = () => {
  const [listProblems, setListProblems] = useState<ProblemDataGet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await getProblems({
          url: "/problema",
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
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="">
      <h1 className="font-bold text-4xl text-dark-blue">
        Página en construcción
      </h1>
      <ProblemsTable listProblems={listProblems} />
    </main>
  );
};

export default ProblemsModule;
