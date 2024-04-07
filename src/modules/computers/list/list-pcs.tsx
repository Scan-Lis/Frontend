import { PcStateDB } from "@/types/types";
import PcState from "./pc-state";

const listPcStates = [
  {
    id: 1,
    name: "PC-1",
    state: PcStateDB.alert,
  },
  {
    id: 2,
    name: "PC-2",
    state: PcStateDB.working,
  },
  {
    id: 3,
    name: "PC-3",
    state: PcStateDB.failing,
  },
  {
    id: 4,
    name: "PC-1",
    state: PcStateDB.alert,
  },
  {
    id: 5,
    name: "PC-2",
    state: PcStateDB.maintenance,
  },
  {
    id: 6,
    name: "PC-3",
    state: PcStateDB.failing,
  },
];

const ListPcStates = () => {
  return (
    <section className="w-full grid grid-cols-6 gap-x-4 gap-y-8">
      {listPcStates.map(({ id, name, state }) => (
        <PcState key={id} state={state} pcnumber={name} />
      ))}
    </section>
  );
};

export default ListPcStates;
