import { cn } from "@/utils/classnames";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: Option[];
  setSelectedOption: (option: string) => void;
  selectedOption?: string;
  labelDropdown: string;
}

const Dropdown = ({
  labelDropdown,
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) => {
  const [isOpen, setisOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setisOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setisOpen(false);
  };

  const classes = {
    options: cn(
      "absolute z-20 bg-light-blue text-white p-4 w-full rounded-md flex flex-col gap-2 mt-2 hidden opacity-0 transition-all",
      { "block opacity-100": isOpen }
    ),
    item: cn("hover:bg-white/35 cursor-pointer py-1 px-2 rounded-md "),
    icon: cn("w-6 h-6 rotate-0 transition-all", { "rotate-180": isOpen }),
  };

  return (
    <div className="relative min-w-[12rem]">
      <button
        onClick={(e) => handleOpen(e)}
        className="flex gap-2 items-center justify-center w-full bg-light-blue/35 rounded-md py-2 px-4 font-semibold">
        {selectedLabel || labelDropdown}
        <ChevronDownIcon className={classes.icon} />
      </button>
      <ul className={classes.options}>
        {options.map(({ label, value }, index) => (
          <li key={index} className={classes.item}>
            <button
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                handleSelect(value);
                setSelectedLabel(label);
              }}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
