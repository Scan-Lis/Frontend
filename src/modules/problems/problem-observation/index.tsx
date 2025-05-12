import { ObservationDataGet } from "@/types/types";

const ProblemObservation = ({
  observation,
}: {
  observation: ObservationDataGet;
}) => {
  return (
    <article className="text-dark-gray border border-gray-400/25 rounded-lg p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Descripción: </span>
        <textarea
          className="w-full border-none resize-none h-auto"
          value={observation.descripcion}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1 border-t border-gray-200 mt-4 pt-4">
        <div>
          <span className="font-semibold">Autor: </span>
          <span>{observation.autor}</span>
        </div>
        <div>
          <span className="font-semibold">Fecha: </span>
          <span>{new Date(observation.fecha).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
};

export { ProblemObservation };
