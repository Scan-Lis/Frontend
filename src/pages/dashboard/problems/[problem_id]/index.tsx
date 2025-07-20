import Layout from "@/components/layout";
import useSEO from "@/hooks/useSEO";
import { ProblemDetails } from "@/modules/problems/problem-details";
import { useRouter } from "next/router";

const ProblemPage = () => {
  const router = useRouter();
  const { problem_id } = router.query;

  useSEO({
    title: `Problema ${problem_id || ""}`,
    description: `Problema ${problem_id} de la aplicación`,
  });
  return (
    <Layout>
      <ProblemDetails />
    </Layout>
  );
};

export default ProblemPage;
