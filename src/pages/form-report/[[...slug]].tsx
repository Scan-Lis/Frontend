import useSEO from "@/hooks/useSEO";
import FormReportModule from "@/modules/form-report";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Form Report Page
 * Route: /form-report/[salaId]/[pcId]
 * Example: /form-report/1/2 - For PC 2 in Room 1
 */
const FormReport = () => {
  const router = useRouter();
  const { slug } = router.query;

  useSEO({
    title: "Formulario de Reporte",
    description: "Reportar un problema con un equipo",
  });

  useEffect(() => {
    if (slug) {
      if (slug.length !== 2) {
        return;
      }
    }
    return;
  }, [router, slug]);

  const pcId = slug?.at(1);
  const salaId = slug?.at(0);

  if (!pcId || !salaId) {
    return (
      <div>Invalid URL format. Expected: /form-report/[salaId]/[pcId]</div>
    );
  }

  return <FormReportModule pcId={pcId} salaId={salaId} />;
};

export default FormReport;
