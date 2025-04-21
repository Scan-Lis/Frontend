import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { es } from "date-fns/locale";

const InputDateRangePicker = ({
  onSelectedChange,
}: {
  onSelectedChange?: (range: DateRange | undefined) => void;
}) => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <label className="relative w-64">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full bg-light-blue/35 rounded-md py-2 h-full px-4 font-semibold text-dark-gray flex items-center justify-between"
      >
        {range ? (
          <p className="text-sm text-dark-gray">
            {range.from ? format(range.from, "dd/MM/yyyy") : "Desde"} -{" "}
            {range.to ? format(range.to, "dd/MM/yyyy") : "Hasta"}
          </p>
        ) : (
          "Seleccionar fecha"
        )}
        <CalendarDaysIcon className="w-5 h-5" />
      </button>
      {showCalendar && (
        <div className="absolute z-10 bg-white shadow-lg mt-2 p-4 rounded-md">
          <DayPicker
            mode="range" // Cambia el modo a rango
            selected={range}
            locale={es}
            onSelect={(range) => {
              setRange(range);
              onSelectedChange && onSelectedChange(range);
            }} // El callback ahora actualiza el objeto de rango
            numberOfMonths={1} // Opcional: mostrar dos meses para rangos
            footer={
              <button
                onClick={() => {
                  setRange(undefined);
                  onSelectedChange && onSelectedChange(undefined);
                }}
                className="underline underline-offset-2 text-sm text-dark-gray font-semibold my-4"
              >
                Limpiar
              </button>
            }
            modifiersClassNames={{
              selected: "bg-light-blue text-white", // cambia el azul por verde
              today: "font-bold text-dark-blue", // día actual resaltado
            }}
            classNames={{
              caption_label: "capitalize flex items-center ",
              month_grid: "text-dark-gray",
              day: "hover:bg-light-blue/35",
              chevron: "text-dark-blue",
              focused: "outline-none",
              range_start: "bg-light-blue text-white rounded-l-full",
              range_end: "bg-light-blue text-white rounded-r-full",
              range_middle: "bg-light-blue/50",
            }}
          />
        </div>
      )}
    </label>
  );
};

export default InputDateRangePicker;
