import WrapperInput from "@/components/wrapper-input";
import { createReport } from "@/services/reports.service";
import { ReportDataPost } from "@/types/types";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormReportProps {
  pcId: string;
  salaId: string;
}

interface FormReportData {
  detail: string;
  type: string;
  email: string;
}

const FormReport = ({ pcId, salaId }: FormReportProps) => {
  const [loading, setLoading] = useState(false);
  const { formState, register, handleSubmit, reset } =
    useForm<FormReportData>();

  const handleSubmitForm = async (data: FormReportData) => {
    setLoading(true);
    const dataToSend: ReportDataPost = {
      correo: data.email,
      tipo: data.type,
      descripcion: data.detail,
      almacenado: false,
      fecha: new Date().toISOString(),
      sala: salaId,
      numeroPc: Number(pcId),
    };
    const response = await createReport(dataToSend);
    if (!response.status) {
      toast.error(response.data as string);
      return;
    }
    toast.success("Reporte enviado con éxito");
    reset();
    setLoading(false);
    return;
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      action="POST"
      className="min-w-80 w-[40%] bg-white flex flex-col gap-8 px-6 py-8 rounded-lg shadow-lg"
    >
      <header className="w-[70%] flex flex-col gap-2 mx-auto text-center font-semibold text-dark-blue">
        <h2 className="font-bold text-3xl">Reporte</h2>
        <div className="w-1/2 h-[1px] bg-dark-blue mx-auto"></div>
        <span>
          PC {pcId} - SALA {salaId}
        </span>
      </header>
      <section className="flex flex-col gap-6">
        <WrapperInput label="Detalle del problema">
          <textarea
            {...register("detail", {
              required: "Por favor ingresa una descripción del problema",
            })}
            className="input"
            id=""
            placeholder="La pantalla no enciende"
          ></textarea>
        </WrapperInput>
        {formState.errors.detail && (
          <p className="text-red-500 text-xs -mt-2 font-semibold">
            {formState.errors.detail.message}
          </p>
        )}
        <WrapperInput label="Tipo de problema">
          <select className="input" {...register("type")}>
            <option defaultChecked value="Hardware">
              Hardware
            </option>
            <option value="Software">Software</option>
          </select>
        </WrapperInput>
        <WrapperInput label="Tu correo">
          <input
            className="input"
            placeholder="pablito@udea.edu.co"
            type="text"
            {...register("email", {
              required: "Por favor ingresa tu correo",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@udea\.edu\.co$/,
                message: "El correo debe ser de la Universidad de Antioquia",
              },
            })}
          />
        </WrapperInput>
        {formState.errors.email && (
          <p className="text-red-500 text-xs -mt-2 font-semibold">
            {formState.errors.email.message}
          </p>
        )}
        <button
          disabled={loading}
          type="submit"
          className="flex gap-2 text-white font-semibold bg-dark-blue w-full justify-center items-center rounded-lg p-3 disabled:opacity-50 transition-all duration-300 hover:bg-dark-blue/80"
        >
          {loading && "Enviando..."}
          <PaperAirplaneIcon className="w-6 h-6 " />
        </button>
      </section>
    </form>
  );
};

export default FormReport;
