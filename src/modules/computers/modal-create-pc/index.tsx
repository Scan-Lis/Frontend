import Modal from "@/components/modal/modal";
import WrapperInput from "@/components/wrapper-input";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { ComputerEnumType } from "@/types/computer-enum-type";
import { PcInfoBack, PcStateDB, SalasDB, SalasOptions } from "@/types/types";
import { useForm } from "react-hook-form";
import { createComputer } from "@/services/computers.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreatePCModalProps {
  fnCallback?: () => void;
}

const CreatePCModal = ({ fnCallback }: CreatePCModalProps) => {
  const { handleCloseModal, openModalId } = useContextOpenModalId();
  const { formState, register, handleSubmit, reset } = useForm<PcInfoBack>();
  const { open, type } = openModalId;

  const handelFormSubmit = async (data: PcInfoBack) => {
    const response = await createComputer({
      numeroPc: Number(data.numeroPc),
      sala: data.sala as SalasDB,
      estado: PcStateDB.Funcionando,
    });
    if (!response.status) {
      toast.error(response.data as string);
      return;
    }
    toast.success("Computador creado con éxito");
    reset();
    if (fnCallback) {
      fnCallback();
    }
    handleCloseModal();
  };

  if (open && type === ComputerEnumType.ADD_COMPUTER) {
    return (
      <Modal closeModal={handleCloseModal} title="Agregar computador">
        <section>
          <form
            className="flex flex-col gap-4 w-[80%] mx-auto mb-4"
            onSubmit={handleSubmit(handelFormSubmit)}
          >
            <WrapperInput
              label="Número de PC"
              error={formState.errors.numeroPc?.message}
            >
              <input
                type="number"
                className="input"
                {...register("numeroPc", {
                  required: "Por favor ingresa el número de PC",
                  min: {
                    value: 1,
                    message: "El número de PC debe ser mayor a 0",
                  },
                })}
              />
            </WrapperInput>
            <WrapperInput label="Sala" error={formState.errors.sala?.message}>
              <select
                className="input"
                {...register("sala", {
                  required: "Por favor selecciona una sala",
                })}
              >
                <option value="">Selecciona una sala</option>
                {SalasOptions.map((sala) => (
                  <option key={sala.value} value={sala.value}>
                    {sala.label}
                  </option>
                ))}
              </select>
            </WrapperInput>
            <footer className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  reset();
                  handleCloseModal();
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-dark-blue text-white px-4 py-2 rounded-md"
              >
                Crear computador
              </button>
            </footer>
          </form>
        </section>
      </Modal>
    );
  }
  return null;
};

export { CreatePCModal };
