import Modal from "@/components/modal/modal";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { UsersEnumType } from "@/types/users-enum-type";
import { CreateUserForm } from "../form/create-user";
import { deleteUser, updatePassword } from "@/services/users.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import WrapperInput from "@/components/wrapper-input";

interface UpdatePasswordModalProps {
  fnCallback: () => void;
}

const UpdatePasswordModal = ({ fnCallback }: UpdatePasswordModalProps) => {
  const { openModalId, handleCloseModal } = useContextOpenModalId();
  const [isLoading, setIsLoading] = useState(false);
  const { id, open, type, message } = openModalId;
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    const response = await updatePassword(id, newPassword);
    if (response.status) {
      toast.success("Contraseña actualizada correctamente");
      fnCallback();
    } else {
      toast.error(response.data as string);
    }
    setIsLoading(false);
    setNewPassword("");
    handleCloseModal();
  };

  const normalizedName = message?.toLowerCase() || "";

  if (open && type === UsersEnumType.UPDATED_PASSWORD) {
    return (
      <Modal closeModal={handleCloseModal} title="Actualizar contraseña">
        <section>
          <p className="text-center text-gray-500 mb-6">
            Ingresa la nueva contraseña para:{" "}
            <span className="font-semibold capitalize">{normalizedName}</span>
          </p>
          <section className="flex flex-col gap-4 w-[80%] mx-auto my-6">
            <WrapperInput label="Nueva contraseña">
              <input
                type="password"
                className="input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </WrapperInput>
            <footer className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setNewPassword("");
                  handleCloseModal();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                disabled={isLoading}
                onClick={handleUpdatePassword}
                className="bg-dark-blue text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-blue/80 transition-all duration-300"
              >
                Actualizar
              </button>
            </footer>
          </section>
        </section>
      </Modal>
    );
  }
};

export { UpdatePasswordModal };
