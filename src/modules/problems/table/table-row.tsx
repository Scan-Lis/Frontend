import Badge from "@/components/badge";
import { ProblemDataGet } from "@/types/types";
import { parseRoomName } from "@/utils/utils";
import { format } from "date-fns";

const ProblemRow = ({ ...problem }: ProblemDataGet) => {
  const stateLabel = problem.solucionado ? "Solucionado" : "Sin Solucionar";
  const stateColor = problem.solucionado ? "#039300" : "#ff3c00d1";

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b">
      <td className="px-6 py-4">{problem.id}</td>
      <td className="px-6 py-4">{problem.descripcionBase}</td>
      <td className="px-6 py-4">{parseRoomName(problem.sala)}</td>
      <td className="px-6 py-4">PC {problem.numeroPc}</td>
      <td className="px-6 py-4">
        <Badge
          style={{
            backgroundColor: stateColor,
            color: "white",
          }}
        >
          <p className="truncate text-xs font-bold">{stateLabel}</p>
        </Badge>
      </td>
      <td className="px-6 py-4">
        {problem.fechaCreacion
          ? format(new Date(problem.fechaCreacion), "dd/MM/yyyy")
          : "Sin crear"}
      </td>
      <td className="px-6 py-4">
        {problem.fechaTerminacion
          ? problem.fechaTerminacion.toLocaleDateString()
          : "Sin terminar"}
      </td>
      <td className="px-6 py-4">
        {problem.auxiliarAsignado ? problem.auxiliarAsignado : "Sin asignar"}
      </td>
    </tr>
  );
};
export default ProblemRow;
