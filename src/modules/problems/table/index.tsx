import { ProblemDataGet } from "@/types/types";
import ProblemRow from "./table-row";

const ProblemsTable = ({
  listProblems,
}: {
  listProblems: ProblemDataGet[];
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-ultra-dark-blue uppercase bg-light-blue/30">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3">
              Sala
            </th>
            <th scope="col" className="px-6 py-3">
              Computador
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de creación
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de terminación
            </th>
            <th scope="col" className="px-6 py-3">
              Asignado a
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {listProblems.map((problem) => (
            <ProblemRow key={problem.id} {...problem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsTable;
