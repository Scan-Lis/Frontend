import { deleteComputer } from "@/services/computers.service";
import { SalasDB } from "@/types/types";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ButtonDeletePCProps {
  sala: SalasDB;
  numeroPc: number;
}

const ButtonDeletePC = ({ sala, numeroPc }: ButtonDeletePCProps) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDeletePC = async () => {
    try {
      setLoading(true);
      // Aquí llamas a tu servicio para eliminar la PC
      const response = await deleteComputer({ sala, numeroPc });
      if (response.status) {
        toast.success("Computador eliminado con éxito");
      } else {
        toast.error("Error al eliminar el computador");
      }
    } catch (error) {
      console.error("Error eliminando el computador:", error);
      toast.error(
        "Error al eliminar el computador. Por favor intenta de nuevo."
      );
    } finally {
      // Refresca la lista de computadores después de eliminar uno
      queryClient.invalidateQueries({ queryKey: ["computers"] });
      setLoading(false);
    }
  };
  const handleDelete = () => {
    // Aquí puedes implementar la lógica para eliminar la PC
  };

  return (
    <button
      disabled={loading}
      onClick={handleDeletePC}
      className="flex items-center gap-1 text-red-700 disabled:text-gray-400 hover:text-red-800 transition-colors duration-300"
    >
      <p>Eliminar PC</p>
      <TrashIcon className="h-4 w-4 inline-block" />
    </button>
  );
};

export { ButtonDeletePC };
