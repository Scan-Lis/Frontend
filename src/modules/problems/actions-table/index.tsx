import { SuspensiveDotsOptions } from "@/components/suspensive-dots-options";
import IconsList from "@/constants/iconst";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { SuspensiveDotsItems } from "@/types/types";
import { AddObservationModal } from "../modals/add-observation-modal";
import { ProblemEnumType } from "@/types/problem-enum-type";

const ProblemActionsTable = ({ problemId }: { problemId: string }) => {
  const { setOpenModalId } = useContextOpenModalId();

  const items: SuspensiveDotsItems[] = [
    {
      icon: IconsList.chat,
      title: "Agregar observación",
      onClick: () => {
        setOpenModalId({
          open: true,
          id: problemId,
          message: "Agregar observación",
          type: ProblemEnumType.ADD_OBSERVATION,
        });
      },
    },
    {
      icon: IconsList.details,
      title: "Ver detalles",
      onClick: () => {},
    },
  ];

  return (
    <section className="flex justify-center items-center">
      <SuspensiveDotsOptions items={items} />
      <AddObservationModal />
    </section>
  );
};

export { ProblemActionsTable };
