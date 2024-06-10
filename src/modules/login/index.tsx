import { useEffect } from "react";
import LoginForm from "./login-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { directTo } from "@/components/sidebar/sidebar-routes";
import { RolesDB } from "@/types/types";

const LoginModule = () => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const route = directTo(data.user.rol as RolesDB);
      router.push(route);
    }
    return;
  }, [status, router]);

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
