import { PcInfoBack } from "@/types/types";
import PcState from "./pc-state";

interface Props {
  listPc: PcInfoBack[];
}

const ListPcStates = ({ listPc }: Props) => {
  return (
    <section className="w-full grid grid-cols-6 gap-x-4 gap-y-8">
      {listPc.map((pc, index) => (
        <PcState key={index} pcInfo={pc} />
      ))}
    </section>
  );
};

export default ListPcStates;
