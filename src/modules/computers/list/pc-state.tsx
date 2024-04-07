import { PcStateDB } from "@/types/types";

interface Props {
  state: PcStateDB;
  pcnumber: string;
}

const PcStateColorsDict = {
  [PcStateDB.alert]: "bg-alert",
  [PcStateDB.maintenance]: "bg-orange-500",
  [PcStateDB.working]: "bg-success",
  [PcStateDB.failing]: "bg-failed",
};

const PcState = ({ state, pcnumber }: Props) => {
  console.log(PcStateColorsDict[state]);

  return (
    <article
      className={
        "relative px-4 pt-8 pb-6 rounded-md flex flex-col gap-4 items-center bg-light-blue/50"
      }>
      <span
        className={`absolute -top-3 inline-block text-white text-[.8rem] py-1 px-3 rounded-full ${PcStateColorsDict[state]}`}>
        {state}
      </span>
      <img src="/assets/pc-icon.svg" alt="Icono del pc" />
      <span className="font-semibold text-dark-gray">{pcnumber}</span>
    </article>
  );
};

export default PcState;
