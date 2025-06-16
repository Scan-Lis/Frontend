import { SuspensiveDotsOptions } from "@/components/suspensive-dots-options";
import IconsList from "@/constants/iconst";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { SuspensiveDotsItems, UserDataGet } from "@/types/types";
import router from "next/router";
import { UsersEnumType } from "@/types/users-enum-type";

const UserActionsTable = ({ props }: { props: UserDataGet }) => {
  const { setOpenModalId } = useContextOpenModalId();

  const { id, correo, rol, nombre } = props;
  const items: SuspensiveDotsItems[] = [
    {
      icon: IconsList.update,
      title: "Actualizar correo",
      onClick: () => {
        setOpenModalId({
          open: true,
          id: correo,
          message: nombre,
          type: UsersEnumType.UPDATED_EMAIL,
        });
      },
    },
    {
      icon: IconsList.update,
      title: "Actualizar contraseña",
      onClick: () => {
        setOpenModalId({
          open: true,
          id: correo,
          message: nombre,
          type: UsersEnumType.UPDATED_PASSWORD,
        });
      },
    },
    /*     {
      icon: IconsList.chat,
      title: "Actualizar rol",
      onClick: () => {
        setOpenModalId({
          open: true,
          id: "",
          message: "Agregar observación",
          type: UsersEnumType.UPDATED_EMAIL,
        });
      },
    }, */
    {
      icon: IconsList.update,
      title: "Actualizar nombre",
      onClick: () => {
        setOpenModalId({
          open: true,
          id: correo,
          message: nombre,
          type: UsersEnumType.UPDATED_NAME,
        });
      },
    },
    {
      icon: IconsList.delete,
      title: "Eliminar usuario",
      onClick: () => {
        setOpenModalId({
          open: true,
          id: correo,
          message: "Agregar observación",
          type: UsersEnumType.DELETE_USER,
        });
      },
    },
  ];

  return (
    <section className="">
      <SuspensiveDotsOptions items={items} />
    </section>
  );
};

export { UserActionsTable };
