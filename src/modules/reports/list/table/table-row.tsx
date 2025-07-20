import Modal from "@/components/modal/modal";
import useModal from "@/components/modal/useModal";
import { ReportDataGet } from "@/types/types";
import { truncateText, formatDate, formatEmail } from "@/utils/utils";
import ReportDetail from "../report-detail";

const TableRow = ({ ...report }: ReportDataGet) => {
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50 border-b">
        <td className="px-6 py-4">{report.id}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {truncateText(report.descripcion, 20)}
        </th>
        <td className="px-6 py-4">{formatEmail(report.correo)}</td>
        <td className="px-6 py-4">
          <span className="inline-block py-1 px-2 rounded-md bg-orange-400/50 text-orange-800 text-xs font-semibold">
            {report.tipo}
          </span>
        </td>
        <td className="px-6 py-4">
          {report.almacenado ? (
            <span className="inline-block py-1 px-2 rounded-md bg-red-400/50 text-red-800 text-xs font-semibold">
              Almacenado
            </span>
          ) : (
            <span className="inline-block py-1 px-2 rounded-md bg-green-400/50 text-green-800 text-xs font-semibold">
              No Almacenado
            </span>
          )}
        </td>
        <td className="px-6 py-4 ">{formatDate(report.fecha)}</td>
        <td className="px-6 py-4 text-center">
          <p>PC {report.numeroPc}</p>
          <p>{report.sala}</p>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={openModal}
            className="flex gap-1 items-center text-dark-blue font-medium "
          >
            Ver más
          </button>
        </td>
      </tr>
      {isOpen && (
        <Modal title={`Reporte ${report.id}`} closeModal={closeModal}>
          <ReportDetail closeModal={closeModal} report={report} />
        </Modal>
      )}
    </>
  );
};

export default TableRow;
