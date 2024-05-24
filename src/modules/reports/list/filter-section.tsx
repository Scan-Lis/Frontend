import Dropdown from "@/components/dropdown";
import { SalasLabels } from "@/types/types";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { FormEvent, useState } from "react";

interface ReportsFilterSectionProps {
  setUrl: (url: string) => void;
}

const ReportsFilterSection = ({ setUrl }: ReportsFilterSectionProps) => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [selectedOptionSearch, setSelectedOptionSearch] = useState("");

  const salas = Object.entries(SalasLabels).map(([key, value]) => {
    return { value: key, label: value };
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUrl(`/reporte/Computador/${selectedOptionSearch}/${inputSearch}`);
  };

  const refresh = () => {
    setUrl("/reporte");
  };

  return (
    <section className="mb-4 flex flex-col gap-2">
      <section className="flex gap-2 w-full">
        <Dropdown
          labelDropdown="Filtrar por tipo"
          options={[
            { value: "All", label: "Todos" },
            { value: "Hardware", label: "Hardware" },
            { value: "Software", label: "Software" },
          ]}
          onChange={(option) => {
            if (option.value === "All") {
              setUrl("/reporte");
              return;
            }
            setUrl(`/reporte/tipo/${option.value}`);
          }}
        />
        <Dropdown
          labelDropdown="Filtrar por estado"
          options={[
            { value: "All", label: "Todos" },
            { value: "Almacenado", label: "Almacenado" },
            { value: "NoAlmacendao", label: "No Almacenado" },
          ]}
          onChange={(option) => {
            if (option.value === "All") {
              setUrl("/reporte");
              return;
            }
            const almacenado: boolean =
              option.value === "Almacenado" ? true : false;
            setUrl(`/reporte/almacenado/${almacenado}`);
          }}
        />
        <Dropdown
          labelDropdown="Buscar en la sala"
          options={[{ label: "Todas", value: "All" }, ...salas]}
          onChange={(option) => {
            if (option.value === "All") {
              setUrl("/reporte");
              return;
            }
            setUrl(`/reporte/sala/${option.value}`);
          }}
        />
        <button
          onClick={refresh}
          className="flex gap-2 justify-center text-dark-gray bg-light-blue/35 rounded-md py-2 px-4 font-semibold">
          Refrescar
          <ArrowPathIcon className="w-5 h-6" />
        </button>
      </section>
      <form
        className="flex items-center gap-2 w-1/2"
        onSubmit={(e) => handleSearch(e)}>
        <Dropdown
          labelDropdown="Buscar en la sala"
          options={salas}
          onChange={(option) => {
            setSelectedOptionSearch(option.value);
          }}
        />
        <div className="font-semibold flex-1 flex items-center gap-2 bg-light-blue/35 py-2 px-4 rounded-md">
          <input
            id="search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="bg-transparent outline-none w-full placeholder:text-ultra-dark-blue/50"
            type="number"
            placeholder="Buscar por número de PC"
          />
        </div>
        <button
          type="submit"
          className="bg-light-blue/35 px-2 py-2 rounded-md font-semibold">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </form>
    </section>
  );
};

export default ReportsFilterSection;
