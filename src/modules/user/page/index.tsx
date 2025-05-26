import { useGetUsers } from "@/hooks/useGetUsers";
import { UsersTable } from "../table";
import Pagination from "@/components/pagination";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { UsersEnumType } from "@/types/users-enum-type";
import { CreateUserModal } from "../modals/create-user";

const ModuleUserPage = () => {
  const { data, loading, error, fetchUsers, totalPages, page, setPage } =
    useGetUsers();
  const { setOpenModalId } = useContextOpenModalId();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="flex flex-col">
      <header className="flex items-center justify-between my-4">
        <h1 className="font-bold text-2xl text-dark-blue">Usuarios</h1>
        <button
          onClick={() =>
            setOpenModalId({
              open: true,
              id: "",
              message: "Crear usuario",
              type: UsersEnumType.CREATE_USER,
            })
          }
          className="bg-light-blue/30 text-dark-blue py-2 px-4 rounded-md flex items-center gap-2 hover:bg-light-blue/50 transition-all duration-300"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo usuario
        </button>
      </header>
      <div className="flex flex-col gap-4">
        <UsersTable users={data} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          handlePage={setPage}
        />
      </div>
      <CreateUserModal fnCallback={() => fetchUsers(0)} />
    </section>
  );
};

export { ModuleUserPage };
