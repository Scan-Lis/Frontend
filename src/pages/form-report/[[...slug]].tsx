import FormReportModule from "@/modules/form-report";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FormReport = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      if (slug.length !== 2) {
        console.log("Invalid slug");
        return;
      }
    }
    return;
  }, [router, slug]);

  const pcId = slug?.at(1);
  const salaId = slug?.at(0);

  if (!pcId || !salaId) {
    return <div>Invalid slug</div>;
  }

  return <FormReportModule pcId={pcId} salaId={salaId} />;
};

export default FormReport;
