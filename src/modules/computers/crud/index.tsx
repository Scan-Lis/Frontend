import { useContextOpenModalId } from "@/context/use-context-open-modal";
import { ComputerEnumType } from "@/types/computer-enum-type";
import "react-toastify/dist/ReactToastify.css";
import { CreatePCModal } from "../modal-create-pc";
import { PcInfoBack, SalasLabels } from "@/types/types";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@/modules/components/table/table-wrapper";
import { TableHead } from "@/modules/components/table/table-head";
import { TableBody } from "@/modules/components/table/table-body";
import { TableTh } from "@/modules/components/table/table-th";
import { TableTd } from "@/modules/components/table/table-td";
import Pagination from "@/components/pagination";
import usePagination from "@/hooks/usePagination";
import { ButtonGenerateQR } from "../button-generate-qr";
import { ButtonDeletePC } from "../button-delete-pc";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const columns: ColumnDef<PcInfoBack>[] = [
  { header: "Número de PC", accessorKey: "numeroPc" },
  {
    header: "Sala",
    accessorKey: "sala",
    cell: ({ row }) => {
      return SalasLabels[row.original.sala as keyof typeof SalasLabels];
    },
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <section className="flex items-center gap-6">
          <ButtonGenerateQR
            sala={row.original.sala}
            numeroPc={row.original.numeroPc}
          />
          <ButtonDeletePC
            sala={row.original.sala}
            numeroPc={row.original.numeroPc}
          />
        </section>
      );
    },
  },
];

const ComputersCrudModule = () => {
  const { setOpenModalId } = useContextOpenModalId();
  const { page, setPage, totalPages, setTotalPages } = usePagination();
  const pageSize = 10;
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["computers", page, pageSize], // Incluir página y tamaño en la clave
    queryFn: async () => {
      const response = await http.get(
        `/computador/all?page=${page}&size=${pageSize}`
      );

      // Actualizar el total de páginas basado en la respuesta del servidor
      if (response?.data?.totalPages) {
        setTotalPages(response.data.totalPages);
      }

      return {
        computers: response?.data?.content ?? [],
        totalElements: response?.data?.totalElements ?? 0,
        totalPages: response?.data?.totalPages ?? 1,
        currentPage: response?.data?.number ?? 0,
      };
    },
  });

  const table = useReactTable({
    data: data?.computers ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // Paginación manual del servidor
    pageCount: totalPages, // Total de páginas del servidor
    state: {
      pagination: {
        pageIndex: page,
        pageSize: pageSize,
      },
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPaginationState = updater({ pageIndex: page, pageSize });
        setPage(newPaginationState.pageIndex);
      }
    },
    globalFilterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const searchTerm = filterValue.toLowerCase();

      // Obtener todos los valores de la fila
      const rowValues = Object.entries(row.original)
        .map(([key, value]) => {
          // Si es la columna de sala, incluir tanto el valor original como el label
          if (key === "sala" && value) {
            const originalValue = String(value).toLowerCase();
            const labelValue =
              SalasLabels[value as keyof typeof SalasLabels]?.toLowerCase() ||
              "";
            return [originalValue, labelValue].join(" ");
          }
          return String(value || "").toLowerCase();
        })
        .join(" ");

      return rowValues.includes(searchTerm);
    },
  });

  return (
    <section className="p-4 flex flex-col gap-y-4">
      <header className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-dark-blue">Computadores</h1>
        <button
          onClick={() =>
            setOpenModalId({
              id: "",
              open: true,
              message: "Agregar computador",
              type: ComputerEnumType.ADD_COMPUTER,
            })
          }
          className="bg-light-blue/30 text-dark-blue font-medium py-2 px-4 rounded-md flex items-center gap-2 hover:bg-light-blue/50 transition-all duration-300"
        >
          Agregar computador
        </button>
      </header>

      {/* Barra de búsqueda */}
      <div className="font-semibold flex-1 flex items-center gap-2 bg-light-blue/35 py-2 px-4 rounded-md max-w-md">
        <MagnifyingGlassIcon className="w-5 h-5 text-ultra-dark-blue/50" />
        <input
          type="text"
          placeholder="Buscar por número de PC o sala"
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
                    Cargando computadores...
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
                No se encontraron computadores
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableTd key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      <CreatePCModal fnCallback={refetch} />
    </section>
  );
};

export default ComputersCrudModule;
