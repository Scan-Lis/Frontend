import Modal from "@/components/modal/modal";
import WrapperInput from "@/components/wrapper-input";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { addObservationToProblem } from "@/services/problems.service";
import { ProblemEnumType } from "@/types/problem-enum-type";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddObservationModal = () => {
  const { openModalId, handleCloseModal } = useContextOpenModalId();
  const { id, open, type } = openModalId;
  const [observation, setObservation] = useState("");
  const { data: session } = useSession();

  const handleAddObservation = async () => {
    const response = await addObservationToProblem({
      problemId: id,
      observation: observation,
      author: session?.user?.email || "",
    });

    if (response.status) {
      toast.success("Observación agregada correctamente");
      setObservation("");
      handleCloseModal();
      return;
    }
    toast.error(response.data as string);
    setObservation("");
    return;
  };

  if (open && type === ProblemEnumType.ADD_OBSERVATION) {
    return (
      <Modal closeModal={handleCloseModal} title="Agregar observación">
        <section className="flex flex-col gap-6 my-6 w-[80%] mx-auto">
          <WrapperInput label="Agregar observación">
            <textarea
              name="observation"
              className="input"
              id="observation"
              placeholder="La pantalla no enciende"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            ></textarea>
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
              onClick={handleAddObservation}
              type="submit"
              disabled={!observation}
              className="flex gap-2 text-white font-semibold bg-dark-blue w-full justify-center items-center rounded-lg p-2 min-w-[200px]"
            >
              Enviar
            </button>
          </footer>
        </section>
      </Modal>
    );
  }
  return null;
};

export { AddObservationModal };
