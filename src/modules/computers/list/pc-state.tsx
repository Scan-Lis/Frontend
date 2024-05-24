import { PcInfoBack, PcStateDB, SalasLabels } from "@/types/types";

interface Props {
  pcInfo: PcInfoBack;
}

const PcState = ({ pcInfo }: Props) => {
  const { numeroPc, estado, sala } = pcInfo;

  const pcStateColorsDict = {
    [PcStateDB.Alerta]: "bg-alert",
    [PcStateDB.Mantenimiento]: "bg-orange-500",
    [PcStateDB.Funcionando]: "bg-success",
    [PcStateDB.Fallando]: "bg-failed",
  };

  const color = pcStateColorsDict[estado];

  return (
    <article
      className={
        "relative px-4 pt-8 pb-6 rounded-md flex flex-col gap-4 items-center bg-light-blue/50"
      }>
      <span
        className={`absolute -top-3 inline-block text-white text-[.8rem] py-1 px-3 rounded-full ${color}`}>
        {estado}
      </span>
      <img src="/assets/pc-icon.svg" alt="Icono del pc" />
      <div className="font-semibold text-dark-gray text-center">
        <p>PC {numeroPc} -</p>
        <div>{SalasLabels[sala]}</div>
      </div>
    </article>
  );
};

export default PcState;
