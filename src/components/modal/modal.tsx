import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ReactNode, useEffect } from "react";

export interface ModalProps {
  title?: ReactNode;
  children: ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal, title }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const classes = {
    modal: cn(
      "relative bg-white p-4 rounded-2xl fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-xl"
    ),
    close: cn(
      "absolute right-4 bg-light-blue/30 p-1 rounded-md hover:bg-light-blue/40"
    ),
    bgShadow: cn("w-full h-full fixed top-0 left-0 z-10 bg-black/30"),
    childrenWrapper: cn("mt-4"),
    headerWrapper: cn("flex justify-between"),
  };

  return (
    <>
      <div className={classes.bgShadow}></div>
      <article className={classes.modal}>
        <div className={classes.headerWrapper}>
          {title && (
            <header className="mt-4 text-center w-full font-bold uppercase text-lg border-b-[1px] text-dark-blue border-b-gray-300/60 pb-3">
              {title}
            </header>
          )}
          <button className={classes.close} onClick={closeModal}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className={classes.childrenWrapper}>{children}</div>
      </article>
    </>
  );
};

export default Modal;
