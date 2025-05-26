import Modal from "@/components/modal/modal";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { UsersEnumType } from "@/types/users-enum-type";
import { CreateUserForm } from "../form/create-user";

interface CreateUserModalProps {
  fnCallback: () => void;
}

const CreateUserModal = ({ fnCallback }: CreateUserModalProps) => {
  const { openModalId, handleCloseModal } = useContextOpenModalId();
  const { id, open, type } = openModalId;

  if (open && type === UsersEnumType.CREATE_USER) {
    return (
      <Modal closeModal={handleCloseModal} title="Crear usuario">
        <p className="text-center text-gray-500 mb-6">
          Ingresa los datos del usuario que deseas crear
        </p>
        <CreateUserForm fnCallback={fnCallback} />
      </Modal>
    );
  }
};

export { CreateUserModal };
