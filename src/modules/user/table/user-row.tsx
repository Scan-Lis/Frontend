import { UserDataGet } from "@/types/types";

const UserRow = ({ user }: { user: UserDataGet }) => {
  const transformName = user.nombre.toLocaleLowerCase();

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b">
      <td className="px-6 py-4">{user.id}</td>
      <td className="px-6 py-4 capitalize">{transformName}</td>
      <td className="px-6 py-4">{user.cedula}</td>
      <td className="px-6 py-4">{user.correo}</td>
      <td className="px-6 py-4">
        {user.rol === "ADMIN" ? "Administrador" : "Auxiliar de programación"}
      </td>
    </tr>
  );
};

export { UserRow };
