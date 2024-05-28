import { cn } from "@/utils/classnames";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useMemo, useState } from "react";

// FIX: The functions with the useCallback hook dont working

/**
 * This a type for the options of the dropdown
 * Be recommend to use this type to define the options of the dropdown and the first option is the default selected
 * @typedef {Object} Option
 * @property {string} value - The value of the option
 * @property {string} label - The label of the option
 */
type Option = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: Option[];
  labelDropdown: string;
  className?: string;
  onChange: (option: Option) => void;
}

/**
 * This components is a simple dropdown select, just show the selected option and the options
 * @param {string} labelDropdown - The label of the dropdown
 * @param {Option[]} options - The options to show in the dropdown, this type is an array of objects with the value and the label
 * @param {Function} onChange - The function to call when the option is selected
 * @param {string} className - The classname to add to the dropdown
 *
 * @returns {JSX.Element} - The dropdown component
 */
const Dropdown = ({
  labelDropdown,
  options,
  className = "",
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [internalSelectedOption, setInternalSelectedOption] = useState<Option>({
    value: options[0].value,
    label: options[0].label,
  });

  useEffect(() => {
    onChange(internalSelectedOption);
  }, [internalSelectedOption]);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen]
  );

  const handleSelect = useCallback(
    (option: Option) => {
      setInternalSelectedOption(option);
      setIsOpen(false);
    },
    [internalSelectedOption]
  );

  const classes = {
    options: cn(
      "absolute z-20 bg-light-blue text-white p-4 w-full rounded-md flex flex-col gap-2 mt-2 hidden opacity-0 transition-all",
      { "block opacity-100": isOpen }
    ),
    item: cn("hover:bg-white/35 cursor-pointer py-1 rounded-md "),
    icon: cn("w-6 h-6 rotate-0 transition-all", { "rotate-180": isOpen }),
  };

  return (
    <div className={`relative min-w-[12rem] ${className}`}>
      <button
        onClick={(e) => handleOpen(e)}
        className="flex gap-2 items-center justify-between w-full  bg-light-blue/35 rounded-md py-2 px-4 font-semibold text-dark-gray">
        {selectedLabel || labelDropdown}
        <ChevronDownIcon className={classes.icon} />
      </button>
      <ul className={classes.options}>
        {options.map(({ label, value }, index) => (
          <li key={index} className={classes.item}>
            <button
              className="w-full text-left pl-3 outline-none"
              onClick={(e) => {
                e.preventDefault();
                handleSelect({ label, value });
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
