import { useState } from "react";

interface ModalHookReturn {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const useModal = (): ModalHookReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    openModal,
    closeModal,
    isOpen,
  };
};

export default useModal;
