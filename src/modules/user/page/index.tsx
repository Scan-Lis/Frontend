import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { UsersEnumType } from "@/types/users-enum-type";
import { CreateUserModal } from "../modals/create-user";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { UserDataGet } from "@/types/types";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import Table from "@/modules/components/table/table-wrapper";
import { TableHead } from "@/modules/components/table/table-head";
import { TableBody } from "@/modules/components/table/table-body";
import { TableTh } from "@/modules/components/table/table-th";
import { TableTd } from "@/modules/components/table/table-td";
import { useState } from "react";
import Badge from "@/components/badge";
import { UserActionsTable } from "../table/actions-table";
import { DeleteUserModal } from "../modals/delete-user";
import { UpdatePasswordModal } from "../modals/update-password";
import { UpdateNameModal } from "../modals/update-name";
import { UpdateEmailModal } from "../modals/update-email";
import Pagination from "@/components/pagination";
import usePagination from "@/hooks/usePagination";

const RoleColors: Record<"ADMIN" | "AUXILIAR", { bg: string; color: string }> =
  {
    ADMIN: {
      bg: "#bbf7d0", // verde claro (bg-green-600/40)
      color: "#16a34a", // verde (text-green-600)
    },
    AUXILIAR: {
      bg: "#dbeafe", // azul claro (bg-light-blue/40)
      color: "#3d5883", // azul oscuro (text-dark-blue)
    },
  };

const columns: ColumnDef<UserDataGet>[] = [
  { header: "Id", accessorKey: "id" },
  {
    header: "Nombre",
    accessorKey: "nombre",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.nombre.toLocaleLowerCase()}
      </span>
    ),
  },
  { header: "Cédula", accessorKey: "cedula" },
  { header: "Correo", accessorKey: "correo" },
  {
    header: "Rol",
    accessorKey: "rol",
    cell: ({ row }) => {
      return (
        <Badge
          style={{
            backgroundColor: RoleColors[row.original.rol].bg,
            color: RoleColors[row.original.rol].color,
          }}
          className="min-w-[150px]"
        >
          {row.original.rol === "ADMIN" ? "Administrador" : "Auxiliar"}
        </Badge>
      );
    },
  },
  {
    header: "Acciones",
    accessorKey: "acciones",
    cell: ({ row }) => {
      return <UserActionsTable props={row.original} />;
    },
  },
];

const ModuleUserPage = () => {
  const { setOpenModalId } = useContextOpenModalId();
  const { page, setPage, totalPages, setTotalPages } = usePagination();
  const pageSize = 5;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["users", page, pageSize], // Incluir página y tamaño en la clave
    queryFn: async () => {
      const response = await http.get(
        `/user/all?page=${page}&size=${pageSize}`
      );

      // Actualizar el total de páginas basado en la respuesta del servidor
      if (response?.data?.totalPages) {
        setTotalPages(response.data.totalPages);
      }

      return {
        users: response?.data?.content ?? [],
        totalElements: response?.data?.totalElements ?? 0,
        totalPages: response?.data?.totalPages ?? 1,
        currentPage: response?.data?.number ?? 0,
      };
    },
  });

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination: {
        pageIndex: page,
        pageSize: pageSize,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPaginationState = updater({ pageIndex: page, pageSize });
        setPage(newPaginationState.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // Paginación manual del servidor
    pageCount: totalPages, // Total de páginas del servidor
    globalFilterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const searchTerm = filterValue.toLowerCase();

      // Obtener todos los valores de la fila
      const rowValues = Object.entries(row.original)
        .map(([key, value]) => {
          // Si es la columna de rol, incluir tanto el valor original como el label
          if (key === "rol" && value) {
            const originalValue = String(value).toLowerCase();
            const labelValue = value === "ADMIN" ? "administrador" : "auxiliar";
            return [originalValue, labelValue].join(" ");
          }
          return String(value || "").toLowerCase();
        })
        .join(" ");

      return rowValues.includes(searchTerm);
    },
  });

  if (isLoading) {
    return (
      <section className="flex flex-col">
        <div className="text-center py-8">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark-blue"></div>
            <span className="ml-2 text-gray-600">Cargando usuarios...</span>
          </div>
        </div>
      </section>
    );
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
        <div className="font-semibold flex-1 flex items-center gap-2 bg-light-blue/35 py-2 px-4 rounded-md max-w-md">
          <MagnifyingGlassIcon className="w-5 h-5 text-ultra-dark-blue/50" />
          <input
            type="text"
            placeholder="Buscar por nombre o correo"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="bg-transparent outline-none w-full placeholder:text-ultra-dark-blue/50 text-ultra-dark-blue/50"
          />
        </div>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableTh key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableTh>
                ))}
              </tr>
            ))}
          </TableHead>
          <TableBody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark-blue"></div>
                    <span className="ml-2 text-gray-600">
                      Cargando usuarios...
                    </span>
                  </div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-red-600"
                >
                  Error al cargar los datos
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No se encontraron usuarios
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableTd key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableTd>
                  ))}
                </tr>
              ))
            )}
          </TableBody>
        </Table>

        {/* Componente de paginación */}
        {!isLoading && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            handlePage={setPage}
          />
        )}
      </div>
      <CreateUserModal
        fnCallback={() => {
          refetch();
        }}
      />
      <DeleteUserModal
        fnCallback={() => {
          refetch();
        }}
      />
      <UpdatePasswordModal
        fnCallback={() => {
          refetch();
        }}
      />
      <UpdateNameModal
        fnCallback={() => {
          refetch();
        }}
      />
      <UpdateEmailModal
        fnCallback={() => {
          refetch();
        }}
      />
    </section>
  );
};

export { ModuleUserPage };
