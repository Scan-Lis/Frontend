import { Option } from "@/components/dropdown";
import { SalasDB } from "@/types/types";

const ESTADOS_PROBLEMA: Option[] = [
  { label: "Todos los estados", value: null },
  { label: "Solucionado", value: true },
  { label: "Sin solucionar", value: false },
];

export const SalasForm: Record<SalasDB, string> = {
  Sala1: "1",
  Sala2: "2",
  Sala3: "3",
  Sala4: "4",
  Telematica: "Telematica",
  MovilLis: "MovilLis",
};

export default ESTADOS_PROBLEMA;
