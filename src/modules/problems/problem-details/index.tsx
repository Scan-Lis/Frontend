import { useFetchObservationProblem } from "@/hooks/useFetchObservationProblem";
import { useRouter } from "next/router";
import { ProblemObservation } from "../problem-observation";

const ProblemDetails = () => {
  const router = useRouter();
  const { problem_id } = router.query;
  const { observations, loading, error } = useFetchObservationProblem({
    problemId: problem_id as string,
    page: 0,
    size: 3,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (observations.length === 0) {
    return (
      <section className="flex flex-col">
        <h1 className="font-bold text-2xl mb-4 text-dark-blue">
          Detalles del problema
        </h1>
        <div className="text-gray-500">No hay observaciones</div>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      <h1 className="font-bold text-2xl mb-4 text-dark-blue">
        Detalles del problema
      </h1>
      <section className="flex flex-col gap-4">
        <h2 className="font-bold text-lg text-dark-blue">Observaciones</h2>
        {observations.map((observation) => (
          <ProblemObservation key={observation.id} observation={observation} />
        ))}
      </section>
    </section>
  );
};

export { ProblemDetails };
