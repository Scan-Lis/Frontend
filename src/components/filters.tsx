import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Dropdown from "./dropdown";
import { SalasLabels } from "@/types/types";

const Filters = () => {
  return (
    <section className="flex gap-4 w-full items-center mt-4 text-ultra-dark-blue">
      <button className="flex gap-2 justify-center bg-light-blue/35 rounded-md py-2 px-4 font-semibold">
        Refrescar
        <ArrowPathIcon className="w-5 h-6" />
      </button>
      <Dropdown options={SalasLabels} />
      <div className="font-semibold flex-1 flex items-center gap-2 bg-light-blue/35 py-2 px-4 rounded-md">
        <label htmlFor="search">
          <MagnifyingGlassIcon className="w-5 h-6" />
        </label>
        <input
          id="search"
          className="bg-transparent outline-none w-full placeholder:text-ultra-dark-blue"
          type="text"
          placeholder="Buscar PC"
        />
      </div>
    </section>
  );
};

export default Filters;
