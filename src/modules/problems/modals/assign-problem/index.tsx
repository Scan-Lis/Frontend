import Modal from "@/components/modal/modal";
import WrapperInput from "@/components/wrapper-input";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import {
  addObservationToProblem,
  assignProblemToAuxiliar,
} from "@/services/problems.service";
import { getUsers } from "@/services/users.service";
import { ProblemEnumType } from "@/types/problem-enum-type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignProblemModal = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<
    {
      nombre: string;
      correo: string;
    }[]
  >([]);
  const { openModalId, handleCloseModal } = useContextOpenModalId();
  const { id, open, type } = openModalId;
  const { formState, register, reset, handleSubmit } = useForm<{
    correo: string;
  }>();

  useEffect(() => {
    if (open && type === ProblemEnumType.ASSIGN_PROBLEM) {
      const fetchUsers = async () => {
        const response = await getUsers({
          url: "/user/all",
          page: 0,
        });
        if (response.status) {
          const responseData = response.data as {
            users: { nombre: string; correo: string }[];
            totalPages: number;
          };
          const filtredUsers = responseData.users.filter(
            (user) => user.correo !== session?.user.email
          );
          setUsers(filtredUsers);
        } else {
          toast.error("Error al obtener los usuarios");
        }
      };
      fetchUsers();
    }
  }, [open, session?.user.email, type]);

  const handleFormSubmit = async ({ correo }: { correo: string }) => {
    const response = await assignProblemToAuxiliar({
      problemId: id,
      auxiliarEmail: correo,
    });

    if (response.status) {
      toast.success("Problema asignado al auxiliar");
      reset();
      handleCloseModal();
      router.reload();
      // Optionally, you can reload the page or refetch data here
    } else {
      toast.error(response.data as string);
    }
  };

  if (open && type === ProblemEnumType.ASSIGN_PROBLEM) {
    return (
      <Modal closeModal={handleCloseModal} title="Asignar problema">
        <form
          className="flex flex-col gap-6 my-6 w-[80%] mx-auto"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <WrapperInput
            label="Asignar problema"
            error={formState.errors.correo?.message}
          >
            <select
              disabled={users.length === 0}
              className="input capitalize"
              {...register("correo", { required: "Este campo es requerido" })}
            >
              <option value="">Seleccionar usuario</option>
              {users.map((user) => (
                <option
                  className="capitalize"
                  key={user.correo}
                  value={user.correo}
                >
                  {user.nombre?.toLocaleLowerCase()}
                </option>
              ))}
            </select>
          </WrapperInput>

          <footer className="flex gap-4 items-center mx-auto mt-6">
            <button
              onClick={handleCloseModal}
              type="submit"
              className="flex gap-2 text-white font-semibold bg-red-400 w-full justify-center items-center rounded-lg p-2 min-w-[200px]"
            >
              Cancelar
            </button>
            <button
              disabled={users.length === 0}
              type="submit"
              className="flex gap-2 text-white font-semibold bg-dark-blue w-full justify-center items-center rounded-lg p-2 min-w-[200px]"
            >
              Enviar
            </button>
          </footer>
        </form>
      </Modal>
    );
  }
  return null;
};

export { AssignProblemModal };
