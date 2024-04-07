import { cn } from "@/utils/classnames";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface DropdownProps {
  options: string[];
}

const Dropdown = ({ options }: DropdownProps) => {
  const [isOpen, setisOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOpen = () => {
    setisOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setisOpen(false);
  };

  const classes = {
    options: cn(
      "absolute z-20 bg-light-blue text-white p-4 w-full rounded-md flex flex-col gap-2 mt-2 opacity-0 transition-all",
      { "opacity-100": isOpen }
    ),
    item: cn("hover:bg-white/35 cursor-pointer py-1 px-2 rounded-md"),
    icon: cn("w-6 h-6 rotate-0 transition-all", { "rotate-180": isOpen }),
  };

  return (
    <div className="relative min-w-[8rem]">
      <button
        onClick={handleOpen}
        className="flex gap-2 items-center justify-center w-full bg-light-blue/35 rounded-md py-2 px-4 font-semibold">
        {selectedOption || "Seleccionar sala"}
        <ChevronDownIcon className={classes.icon} />
      </button>
      <ul className={classes.options}>
        {options.map((option, index) => (
          <li
            key={index}
            className={classes.item}
            onClick={() => handleSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
