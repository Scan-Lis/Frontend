import Modal from "@/components/modal/modal";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { UsersEnumType } from "@/types/users-enum-type";
import { updateName } from "@/services/users.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import WrapperInput from "@/components/wrapper-input";

interface UpdateNameModalProps {
  fnCallback: () => void;
}

const UpdateNameModal = ({ fnCallback }: UpdateNameModalProps) => {
  const { openModalId, handleCloseModal } = useContextOpenModalId();
  const [isLoading, setIsLoading] = useState(false);
  const { id, open, type, message } = openModalId;
  const [newName, setNewName] = useState("");

  const handleUpdateName = async () => {
    setIsLoading(true);
    const response = await updateName(id, newName);
    if (response.status) {
      toast.success("Nombre actualizado correctamente");
      fnCallback();
    } else {
      toast.error(response.data as string);
    }
    setIsLoading(false);
    setNewName("");
    handleCloseModal();
  };

  const normalizedName = message?.toLowerCase() || "";

  if (open && type === UsersEnumType.UPDATED_NAME) {
    return (
      <Modal closeModal={handleCloseModal} title="Actualizar nombre">
        <section>
          <p className="text-center text-gray-500 mb-6">
            Ingresa el nuevo nombre para:{" "}
            <span className="font-semibold capitalize">{normalizedName}</span>
          </p>
          <section className="flex flex-col gap-4 w-[80%] mx-auto my-6">
            <WrapperInput label="Nuevo nombre">
              <input
                type="text"
                className="input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </WrapperInput>
            <footer className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setNewName("");
                  handleCloseModal();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                disabled={isLoading}
                onClick={handleUpdateName}
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

export { UpdateNameModal };
