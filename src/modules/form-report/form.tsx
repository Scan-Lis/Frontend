import WrapperInput from "@/components/wrapper-input";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

interface FormReportProps {
  pcId: string;
  salaId: string;
}

const FormReport = ({ pcId, salaId }: FormReportProps) => {
  return (
    <form
      action="POST"
      className="min-w-80 w-[40%] bg-white flex flex-col gap-8 px-6 py-8 rounded-lg shadow-lg">
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
            className="input"
            id=""
            placeholder="La pantalla no enciende"></textarea>
        </WrapperInput>
        <WrapperInput label="Tipo de problema">
          <select className="input">
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
          </select>
        </WrapperInput>
        <WrapperInput label="Tu correo">
          <input
            className="input"
            placeholder="pablito@udea.edu.co"
            type="text"
          />
        </WrapperInput>
        <button className="flex gap-2 text-white font-semibold bg-dark-blue w-full justify-center items-center rounded-lg p-3">
          Enviar
          <PaperAirplaneIcon className="w-6 h-6 " />
        </button>
      </section>
    </form>
  );
};

export default FormReport;
