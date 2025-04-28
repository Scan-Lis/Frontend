import Badge from "@/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { markProblemAsSolved } from "@/services/problems.service";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BadgeProblemState = ({
  state,
  problemId,
}: {
  state: boolean;
  problemId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const stateLabel = state ? "Solucionado" : "Sin Solucionar";
  const stateColor = state ? "#039300" : "#ff3c00d1";

  const options = [
    {
      value: true,
      label: "Solucionado",
    },
    {
      value: false,
      label: "Sin Solucionar",
    },
  ];

  const filteredOptions = options.filter((option) => option.value !== state);

  const handleChangeState = async () => {
    setIsLoading(true);
    const response = await markProblemAsSolved({ id: problemId });
    if (response.status) {
      toast.success("Problema solucionado");
      // Add timer to reload page after successful state change
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Reload after 2 seconds to allow toast to be visible
    } else {
      toast.error(response.data as string);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        className="w-full"
        style={{
          backgroundColor: stateColor,
          color: "white",
        }}
      >
        <p className="truncate text-xs font-bold">{stateLabel}</p>
      </Badge>
      {!state && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filteredOptions.map((option) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={option.label}
                onClick={() => handleChangeState()}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export { BadgeProblemState };
