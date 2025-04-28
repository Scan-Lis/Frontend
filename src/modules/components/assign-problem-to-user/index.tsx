import { assignProblemToUser } from "@/services/problems.service";
import { RolesDB } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignProblemToUser = ({
  problemId,
  auxiliarAsignado,
}: {
  problemId: string;
  auxiliarAsignado: string | null;
}) => {
  const { data: session } = useSession();
  const rolSession = session?.user.rol;
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignProblemToUser = async () => {
    setIsLoading(true);
    const response = await assignProblemToUser({
      problemId,
      userEmail: session?.user.email as string,
    });
    if (response.status) {
      toast.success("Problema asignado al usuario");
      // Add timer to reload page after successful assignment
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Reload after 2 seconds to allow toast to be visible
    } else {
      toast.error(response.data as string);
    }
    setIsLoading(false);
  };

  if (!auxiliarAsignado && rolSession === RolesDB.ROLE_AUXILIAR) {
    return (
      <button
        disabled={isLoading}
        className="underline text-dark-blue disabled:text-gray-400"
        onClick={handleAssignProblemToUser}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <Loader2 className="w-4 h-4 animate-spin" />
            Asignando problema...
          </div>
        ) : (
          "Asignarme problema"
        )}
      </button>
    );
  }

  return <div>{auxiliarAsignado}</div>;
};

export { AssignProblemToUser };
