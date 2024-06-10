import Spinner from "@/components/spinner";
import WrapperInput from "@/components/wrapper-input";
import { LoginFields } from "@/types/types";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, formState, handleSubmit } = useForm<LoginFields>({
    defaultValues: {
      correo: "",
      contrasena: "",
    },
    mode: "onChange",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (data: LoginFields) => {
    setLoading(true);
    console.log(data);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!res?.ok) {
      setLoading(false);
      setError("Usuario o contraseña incorrectos");
      return;
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      method="post"
      className="flex flex-col gap-8 w-[60%] max-w-96 items-center">
      <h2 className="font-extrabold text-4xl text-dark-blue">Iniciar Sesión</h2>
      <section className="w-full flex flex-col gap-4">
        <WrapperInput label="Usuario">
          <input
            className="input"
            placeholder="john.doe"
            type="text"
            {...register("correo", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@udea\.edu\.co$/,
                message: "El correo debe ser de la Universidad de Antioquia",
              },
            })}
          />
        </WrapperInput>
        {formState.errors.correo && (
          <p className="text-red-500 text-xs -mt-2 font-semibold">
            {formState.errors.correo.message}
          </p>
        )}
        <WrapperInput label="Contraseña">
          <input
            className="input"
            placeholder="******"
            type="password"
            {...register("contrasena", {
              required: "Este campo es requerido",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
              maxLength: {
                value: 20,
                message: "La contraseña debe tener máximo 20 caracteres",
              },
            })}
          />
        </WrapperInput>
        {formState.errors.contrasena && (
          <p className="text-red-500 text-xs -mt-2 font-semibold">
            {formState.errors.contrasena.message}
          </p>
        )}
        <button className="flex gap-2 text-white font-semibold bg-dark-blue w-full justify-center items-center rounded-lg p-3">
          Iniciar
          <PaperAirplaneIcon className="w-6 h-6 " />
        </button>
        {error && (
          <p className="text-red-500 text-xs -mt-2 font-semibold">{error}</p>
        )}
        {loading && (
          <div className="font-semibold text-dark-blue flex gap-2 items-center">
            <Spinner width="w-6 h-6" />
            Cargando...
          </div>
        )}
      </section>
    </form>
  );
};

export default LoginForm;
