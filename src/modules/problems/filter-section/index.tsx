import Dropdown from "@/components/dropdown";
import InputDateRange from "@/components/input-date/input-date-range";
import ESTADOS_PROBLEMA from "@/constants";
import { SalasLabels } from "@/types/types";

interface FilterSectionProps {
  setUrl: (url: string) => void;
}

const FilterSection = ({ setUrl }: FilterSectionProps) => {
  const salas = Object.entries(SalasLabels).map(([key, value]) => {
    return { value: key, label: value };
  });

  return (
    <section className="mb-4 flex flex-col gap-2">
      <section className="flex gap-2 w-full">
        <Dropdown
          labelDropdown="Buscar por sala"
          options={[{ label: "Todas las salas", value: null }, ...salas]}
          onChange={(option) => {
            if (!option.value) {
              setUrl("/problema");
              return;
            }
            setUrl(`/problema/sala/${option.value}`);
          }}
        />
        <Dropdown
          labelDropdown="Buscar por estado"
          options={ESTADOS_PROBLEMA}
          onChange={(option) => {
            if (!option.value) {
              setUrl("/problema");
              return;
            }
            setUrl(`/problema/estado/${option.value}`);
          }}
        />
        <InputDateRange
          onSelectedChange={(range) => {
            if (!range) {
              setUrl("/problema");
              return;
            }
            if (range.from && range.to) {
              const from = new Date(range.from).toISOString();
              const to = new Date(range.to).toISOString();
              const fromEncoded = encodeURIComponent(from);
              const toEncoded = encodeURIComponent(to);
              const encodedUrl = `/problema/fechaCreacion?fechaInicio=${fromEncoded}&fechaFin=${toEncoded}`;
              setUrl(encodedUrl);
            }
          }}
        />
      </section>
    </section>
  );
};

export default FilterSection;
