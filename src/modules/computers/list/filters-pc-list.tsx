import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Dropdown from "../../../components/dropdown";
import { useRouter } from "next/router";
import { PcInfoBack, SalasLabels } from "@/types/types";
import { useEffect, useState } from "react";
import {
  getComputerByNumberAndRoom,
  getComputersByRoom,
} from "@/services/computers.service";

interface FiltersProps {
  setListPc: (listPc: PcInfoBack[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const Filters = ({ setListPc, setError, setLoading }: FiltersProps) => {
  const router = useRouter();
  const salas = Object.entries(SalasLabels).map(([key, value]) => {
    return { value: key, label: value };
  });
  const [inputSearch, setInputSearch] = useState<string>("");
  const [selectedOptionSearch, setSelectedOptionSearch] = useState("");
  const [selectedOptionFilter, setSelectedOptionFilter] = useState("");

  /* 
  Funciona como una especie de onChange para cuando cambie el valor de selectedOptionFilter
  se haga una petición a la API para obtener los computadores de la sala seleccionada 
  */
  useEffect(() => {
    if (selectedOptionFilter === "") return;
    (async () => {
      setLoading(true);
      const res = await getComputersByRoom(selectedOptionFilter);
      if (res.status) {
        setListPc(res.data as PcInfoBack[]);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(res.data as string);
      setListPc([]);
    })();
  }, [selectedOptionFilter]);

  /*
  Función para refrescar la página, se utiliza para recargar los computadores
  y restablecer el valor de los filtros
  */
  const refresh = () => {
    router.reload();
  };

  /*
  Función para buscar un computador por número y sala, se utiliza para buscar un computador
  en específico y mostrarlo en la lista de computadores.
  */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSearch === "" || selectedOptionSearch === "") return;
    setLoading(true);
    const response = await getComputerByNumberAndRoom(
      selectedOptionSearch,
      Number(inputSearch)
    );
    if (response.status) {
      setLoading(false);
      setListPc([response.data as PcInfoBack]);
      return;
    }
    setLoading(false);
    setError(response.data as string);
    setListPc([]);
  };

  return (
    <section className="flex gap-4 w-full items-center mt-4 text-ultra-dark-blue">
      <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
        <Dropdown
          labelDropdown="Buscar en la sala"
          setSelectedOption={setSelectedOptionSearch}
          selectedOption={selectedOptionSearch}
          options={salas}
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
        labelDropdown="Filtrar por"
        options={salas}
        selectedOption={selectedOptionFilter}
        setSelectedOption={setSelectedOptionFilter}
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
