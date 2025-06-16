import Modal from "@/components/modal/modal";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { UsersEnumType } from "@/types/users-enum-type";
import { CreateUserForm } from "../form/create-user";
import { deleteUser } from "@/services/users.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

interface DeleteUserModalProps {
  fnCallback: () => void;
}

const DeleteUserModal = ({ fnCallback }: DeleteUserModalProps) => {
  const { openModalId, handleCloseModal } = useContextOpenModalId();
  const [isLoading, setIsLoading] = useState(false);
  const { id, open, type } = openModalId;

  const handleDeleteUser = async () => {
    setIsLoading(true);
    const response = await deleteUser(id);
    if (response.status) {
      toast.success("Usuario eliminado correctamente");
      fnCallback();
    } else {
      toast.error(response.data as string);
    }
    handleCloseModal();
    setIsLoading(false);
  };

  if (open && type === UsersEnumType.DELETE_USER) {
    return (
      <Modal closeModal={handleCloseModal} title="Eliminar usuario">
        <section>
          <p className="text-center text-gray-500 mb-6">
            Estás seguro de querer eliminar este usuario?
          </p>
          <footer className="flex justify-end gap-4">
            <button
              onClick={handleCloseModal}
              className="text-red-500 font-semibold bg-red-500/10 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              disabled={isLoading}
              onClick={handleDeleteUser}
              className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Eliminar
            </button>
          </footer>
        </section>
      </Modal>
    );
  }
};

export { DeleteUserModal };
