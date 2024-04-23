import FormReport from "./form";

interface FormReportModuleProps {
  pcId: string;
  salaId: string;
}

const FormReportModule = ({ pcId, salaId }: FormReportModuleProps) => {
  return (
    <main className="h-screen pattern_reportpage flex items-center justify-center">
      <div className="absolute top-6 left-6 flex gap-4">
        <figure className="w-[5rem] mb-4">
          <img className="w-full" src="/assets/logo-lis.png" alt="Logo LIS" />
        </figure>
        <div className="flex flex-col gap-0 font-black text-[2.5rem] text-dark-blue leading-none">
          <span className="relative after:absolute after:ml-4 after:top-1/2 after:translate-y-1/2 after:w-4/5 after:rounded-lg after:h-[0.4rem] after:bg-dark-blue">
            Scan
          </span>
          <span>Lis</span>
        </div>
      </div>

      <FormReport pcId={pcId} salaId={salaId} />
    </main>
  );
};

export default FormReportModule;
