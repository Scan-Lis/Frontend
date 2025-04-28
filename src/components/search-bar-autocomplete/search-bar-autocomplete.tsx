import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const auxiliares = [
  "José Pérez",
  "María González",
  "Juan Rodríguez",
  "Ana López",
  "Carlos Martínez",
  "Laura Sánchez",
  "Pedro Pérez",
  "Carmen González",
  "Javier Rodríguez",
];

const SearchBarAutocomplete = () => {
  const [searchInput, setSearchInput] = useState("");

  const filteredAuxiliares = auxiliares.filter((auxiliar) => {
    return auxiliar.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className="relative">
      <div className="font-semibold flex-1 flex items-center gap-2 bg-light-blue/35 py-2 px-4 rounded-md">
        <label htmlFor="search">
          <MagnifyingGlassIcon className="w-5 h-6" />
        </label>
        <input
          value={searchInput}
          id="search"
          className="bg-transparent outline-none w-full placeholder:text-ultra-dark-blue"
          type="text"
          placeholder="Buscar auxiliar"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <ul
        className={cn(
          "absolute flex flex-col gap-4 w-full rounded-md bg-light-blue p-4 mt-2 opacity-0 transition-all",
          {
            "opacity-100":
              searchInput.length > 0 && filteredAuxiliares.length > 0,
          }
        )}
      >
        {filteredAuxiliares.map((auxiliar, index) => (
          <li
            onClick={() => setSearchInput(auxiliar)}
            key={index}
            className="hover:bg-white/35 cursor-pointer py-1 px-2 rounded-md"
          >
            {auxiliar}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBarAutocomplete;
