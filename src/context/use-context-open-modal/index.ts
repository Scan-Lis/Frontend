import { atom, useAtom } from "jotai";

interface OpenModalIdContextProps {
  open: boolean;
  id: string;
  message: string;
  type: string | null;
  extraData?: unknown;
}

const openModalIdContext = atom<OpenModalIdContextProps>({
  open: false,
  id: "",
  message: "",
  type: null,
});

const useContextOpenModalId = () => {
  const [openModalId, setOpenModalId] = useAtom(openModalIdContext);

  const handleCloseModal = () => {
    setOpenModalId({
      open: false,
      id: "",
      message: "",
      type: null,
      extraData: undefined,
    });
  };
  return { openModalId, setOpenModalId, handleCloseModal };
};

export { useContextOpenModalId };
