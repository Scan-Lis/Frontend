import Modal from "@/components/modal/modal";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { UsersEnumType } from "@/types/users-enum-type";
import { updateEmail } from "@/services/users.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import WrapperInput from "@/components/wrapper-input";

interface UpdateEmailModalProps {
  fnCallback: () => void;
}

const UpdateEmailModal = ({ fnCallback }: UpdateEmailModalProps) => {
  const { openModalId, handleCloseModal } = useContextOpenModalId();
  const [isLoading, setIsLoading] = useState(false);
  const { id, open, type, message } = openModalId;
  const [newEmail, setNewEmail] = useState(id || "");

  const handleUpdateEmail = async () => {
    setIsLoading(true);
    const response = await updateEmail(id, newEmail);
    if (response.status) {
      toast.success("Correo actualizado correctamente");
      fnCallback();
    } else {
      toast.error(response.data as string);
    }
    setIsLoading(false);
    setNewEmail("");
    handleCloseModal();
  };

  const normalizedEmail = message?.toLowerCase() || "";

  if (open && type === UsersEnumType.UPDATED_EMAIL) {
    return (
      <Modal closeModal={handleCloseModal} title="Actualizar correo">
        <section>
          <p className="text-center text-gray-500 mb-6">
            Ingresa el nuevo correo para:{" "}
            <span className="font-semibold">{normalizedEmail}</span>
          </p>
          <section className="flex flex-col gap-4 w-[80%] mx-auto my-6">
            <WrapperInput label="Nuevo correo">
              <input
                type="email"
                className="input"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </WrapperInput>
            <footer className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setNewEmail("");
                  handleCloseModal();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                disabled={isLoading}
                onClick={handleUpdateEmail}
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

export { UpdateEmailModal };
