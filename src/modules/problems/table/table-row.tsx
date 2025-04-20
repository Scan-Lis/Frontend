import { ProblemDataGet } from "@/types/types";
import { parseRoomName } from "@/utils/utils";

const ProblemRow = ({ ...problem }: ProblemDataGet) => {
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b">
      <td className="px-6 py-4">{problem.id}</td>
      <td className="px-6 py-4">{problem.descripcionBase}</td>
      <td className="px-6 py-4">{parseRoomName(problem.sala)}</td>
      <td className="px-6 py-4">PC {problem.numeroPc}</td>
    </tr>
  );
};
export default ProblemRow;
