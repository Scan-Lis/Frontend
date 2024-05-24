import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Dropdown from "../../../components/dropdown";
import { SalasLabels } from "@/types/types";
import { useState } from "react";

interface FiltersProps {
  setUrl: (url: string) => void;
}

const Filters = ({ setUrl }: FiltersProps) => {
  const salas = Object.entries(SalasLabels).map(([key, value]) => {
    return { value: key, label: value };
  });
  const [inputSearch, setInputSearch] = useState<string>("");
  const [selectedOptionSearch, setSelectedOptionSearch] = useState("");

  /*
  Función para refrescar la página, se utiliza para recargar los computadores
  y restablecer el valor de los filtros
  */
  const refresh = () => {
    setUrl("/computador/all");
  };

  /*
  Función para buscar un computador por número y sala, se utiliza para buscar un computador
  en específico y mostrarlo en la lista de computadores.
  */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSearch === "" || selectedOptionSearch === "") return;
    setUrl(`/computador/${selectedOptionSearch}/${inputSearch}`);
  };

  return (
    <section className="flex gap-4 w-full items-center mt-4 text-ultra-dark-blue">
      <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
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
            type="text"
            placeholder="Buscar por número de PC"
          />
        </div>
        <button
          type="submit"
          className="bg-light-blue/35 px-2 py-2 rounded-md font-semibold">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </form>
      <Dropdown
        labelDropdown="Buscar en la sala"
        options={[{ label: "Todas", value: "All" }, ...salas]}
        onChange={(option) => {
          if (option.value === "All") {
            setUrl("/computador/all");
            return;
          }
          setUrl(`/computador/sala/${option.value}`);
        }}
      />
      <button
        onClick={refresh}
        className="flex gap-2 justify-center bg-light-blue/35 rounded-md py-2 px-4 font-semibold">
        Refrescar
        <ArrowPathIcon className="w-5 h-6" />
      </button>
    </section>
  );
};

export default Filters;
