import {
  deleteReport,
  updateStateStoreReport,
} from "@/services/reports.service";
import { ReportDataGet } from "@/types/types";
import { formatDate } from "@/utils/utils";
import { CheckIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ReportDetail {
  report: ReportDataGet;
  closeModal: () => void;
}

const ReportDetail = ({ report, closeModal }: ReportDetail) => {
  const [toggle, setToggle] = useState<boolean>(report.almacenado);

  const updateStore = async () => {
    if (toggle === report.almacenado) return;
    const response = await updateStateStoreReport(report.id, toggle);
    if (response.status) {
      toast.success("Se ha cambiado el estado exitosamente");
      return;
    }
    toast.error(response.data as string);
  };

  const handleDelete = async (idReport: number, pcLabel: string) => {
    const response = await deleteReport({ idReport, pcLabel });
    if (response.status) {
      toast.success(response.data);
      window.location.reload();
      return;
    }
    toast.error(response.data as string);
  };

  return (
    <section className="px-4">
      <div className="flex flex-col gap-2">
        <div>
          <p className="font-bold">Descripción:</p>
          <p>{report.descripcion}</p>
        </div>
        <div>
          <p className="font-bold">Reportado por:</p>
          <p>{report.correo}</p>
        </div>

        <div>
          <p className="font-bold">Reportado el:</p>
          <p>{formatDate(report.fecha)}</p>
        </div>
        <div>
          <p className="font-bold">Computador:</p>
          <p>
            PC {report.numeroPc} - {report.sala}
          </p>
        </div>
        <div>
          <p className="font-bold mb-1">Tipo:</p>
          <span className="inline-block py-1 px-2 rounded-md bg-orange-400/50 text-orange-800 text-xs font-semibold">
            {report.tipo}
          </span>
        </div>
        <div>
          <p className="font-bold mb-1">Estado:</p>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                onChange={() => setToggle(!toggle)}
                type="checkbox"
                defaultChecked={toggle}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-light-blue"></div>
              <span className="ms-3 text-sm font-medium text-light-gray dark:text-gray-300">
                {toggle ? "Almacenado" : "Sin Almacenar"}
              </span>
            </label>
            <button
              onClick={updateStore}
              className="px-4 py-1 flex items-center gap-1 rounded-md bg-light-blue/40 text-dark-blue font-bold hover:bg-light-blue/30 transition-all text-xs">
              Actualizar
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 my-4 py-4 border-y-[1px] border-gray-300/60">
        <button
          onClick={() =>
            handleDelete(report.id, `${report.numeroPc} - ${report.sala}`)
          }
          className="px-6 py-2 flex items-center gap-1 rounded-md bg-red-600/40 text-red-600 font-bold hover:bg-red-600/30 transition-all">
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </button>
        <button className="px-6 py-2 flex items-center gap-1 rounded-md bg-light-blue/40 text-dark-blue font-bold hover:bg-light-blue/30 transition-all">
          <CheckIcon className="w-5 h-5" />
          Aprobar
        </button>
      </div>
    </section>
  );
};

export default ReportDetail;
