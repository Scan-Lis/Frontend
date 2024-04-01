import WrapperInput from "@/components/wrapper-input";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import LoginForm from "./login-form";

const LoginModule = () => {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col items-center justify-center w-[55%]">
        <figure className="w-[7rem] mb-4">
          <img className="w-full" src="./assets/logo-lis.png" alt="Logo LIS" />
        </figure>
        <LoginForm />
      </section>
      <aside className={"relative flex-1 clip-path bg-gradient-linear"}>
        <div className={"pattern"}>
          <div className="absolute top-12 left-12 flex flex-col gap-0 font-black text-[4rem] text-ultra-dark-blue leading-none">
            <span className="relative after:absolute after:ml-4 after:top-1/2 after:translate-y-1/2 after:w-4/5 after:rounded-lg after:h-2 after:bg-ultra-dark-blue">
              Scan
            </span>
            <span>Lis</span>
          </div>
          <figure className="absolute right-12 bottom-12 w-64">
            <img
              className="w-full h-full object-cover"
              src="/assets/udea-logo.png"
              alt="Logo UdeA"
            />
          </figure>
        </div>
      </aside>
    </main>
  );
};

export default LoginModule;
