import WrapperInput from "@/components/wrapper-input";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { createUser } from "@/services/users.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserCreateData {
  nombre: string;
  cedula: string;
  correo: string;
  contrasena: string;
  rol: "ADMIN" | "AUXILIAR";
}

interface CreateUserFormProps {
  fnCallback: () => void;
}

const CreateUserForm = ({ fnCallback }: CreateUserFormProps) => {
  const { register, handleSubmit, formState } = useForm<UserCreateData>();
  const { handleCloseModal } = useContextOpenModalId();

  const handleSubmitForm = async (data: UserCreateData) => {
    const response = await createUser(data);
    if (response.status) {
      fnCallback();
      handleCloseModal();
      toast.success("Usuario creado con éxito");
    } else {
      toast.error(response.data as string);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-[80%] mx-auto mt-6 mb-10"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <WrapperInput label="Nombre" error={formState.errors.nombre?.message}>
        <input
          className="w-full outline-none capitalize"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            onChange: (e) => {
              if (e.target.value !== "") {
                e.target.value = e.target.value.toLowerCase();
              }
            },
          })}
        />
      </WrapperInput>

      <WrapperInput label="Cedula" error={formState.errors.cedula?.message}>
        <input
          className="w-full outline-none"
          {...register("cedula", {
            required: "La cédula es obligatoria",
            pattern: {
              value: /^[0-9]+$/,
              message: "La cédula debe contener solo números",
            },
          })}
        />
      </WrapperInput>

      <WrapperInput label="Correo" error={formState.errors.correo?.message}>
        <input
          className="w-full outline-none"
          {...register("correo", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@udea\.edu\.co$/,
              message: "El correo debe ser de la Universidad de Antioquia",
            },
          })}
        />
      </WrapperInput>

      <WrapperInput
        label="Contraseña"
        error={formState.errors.contrasena?.message}
      >
        <input
          className="w-full outline-none"
          type="password"
          {...register("contrasena", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })}
        />
      </WrapperInput>

      <WrapperInput label="Rol" error={formState.errors.rol?.message}>
        <select
          className="input"
          {...register("rol", {
            required: "El rol es obligatorio",
          })}
        >
          <option defaultChecked value="ADMIN">
            Administrador
          </option>
          <option value="AUXILIAR">Auxiliar</option>
        </select>
      </WrapperInput>

      <footer className="flex justify-end gap-4">
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-dark-blue text-white px-4 py-2 rounded-md"
        >
          Crear usuario
        </button>
      </footer>
    </form>
  );
};

export { CreateUserForm };
