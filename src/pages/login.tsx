import useSEO from "@/hooks/useSEO";
import LoginModule from "@/modules/login";

const LoginPage = () => {
  useSEO({
    title: "Iniciar Sesión",
    description: "Inicia sesión en tu cuenta",
  });
  return <LoginModule />;
};

export default LoginPage;
