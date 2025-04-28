import { AssignProblemToUser } from "@/modules/components/assign-problem-to-user";
import { BadgeProblemState } from "@/modules/components/badge-problem-state";
import { ProblemDataGet } from "@/types/types";
import { parseRoomName } from "@/utils/utils";
import { format } from "date-fns";

const ProblemRow = ({ ...problem }: ProblemDataGet) => {
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b">
      <td className="px-6 py-4">{problem.id}</td>
      <td className="px-6 py-4">{problem.descripcionBase}</td>
      <td className="px-6 py-4">{parseRoomName(problem.sala)}</td>
      <td className="px-6 py-4">PC {problem.numeroPc}</td>
      <td className="px-6 py-4">
        <BadgeProblemState
          state={problem.solucionado}
          problemId={problem.id.toString()}
        />
      </td>
      <td className="px-6 py-4">
        {problem.fechaCreacion
          ? format(new Date(problem.fechaCreacion), "dd/MM/yyyy")
          : "Sin crear"}
      </td>
      <td className="px-6 py-4">
        {problem.fechaTerminacion
          ? format(new Date(problem.fechaTerminacion), "dd/MM/yyyy")
          : "Sin terminar"}
      </td>
      <td className="px-6 py-4">
        <AssignProblemToUser
          problemId={problem.id.toString()}
          auxiliarAsignado={problem.auxiliarAsignado}
        />
      </td>
    </tr>
  );
};
export default ProblemRow;
