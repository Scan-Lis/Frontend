import { useGetUsers } from "@/hooks/useGetUsers";
import { UsersTable } from "../table";
import Pagination from "@/components/pagination";
import { PlusIcon } from "@heroicons/react/20/solid";

const ModuleUserPage = () => {
  const { data, loading, error, fetchUsers, totalPages, page, setPage } =
    useGetUsers();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="flex flex-col">
      <header className="flex items-center justify-between my-4">
        <h1 className="font-bold text-2xl text-dark-blue">Usuarios</h1>
        <button className="bg-light-blue/30 text-dark-blue py-2 px-4 rounded-md flex items-center gap-2 hover:bg-light-blue/50 transition-all duration-300">
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
    </section>
  );
};

export { ModuleUserPage };
