import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "@remix-run/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});
  const [position, setPosition] = useState<string>("author");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="p-4">
      {/* <div className="flex-1 text-lg font-semibold text-black">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="grid grid-cols-4 gap-2">
        <Input
          placeholder={`Filter ${position}...`}
          value={(table.getColumn(position!)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(position!)?.setFilterValue(event.target.value)
          }
          className=" text-black "
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-500 text-white hover:bg-gray-900 hover:text-gray-200"
            >
              Select Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-slate-500 text-white hover:bg-gray-900 hover:text-gray-200">
            <DropdownMenuLabel>Column names</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="author">
                Author
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title">Title</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="published">
                Date
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-400 text-black hover:bg-gray-900 hover:text-gray-700"
            >
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-full">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button>
          <Link to={"/admin/posts/create"}>Creat a Post</Link>
        </Button>
      </div>
      {/* actual table */}
      <Table className="mt-5 bg-black/60 text-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className=" hover:bg-black data-[state=selected]:bg-green-100 data-[state=selected]:text-black"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="text-center" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col space-y-3 text-black sm:p-4 md:flex-row md:items-baseline md:justify-end md:space-x-2">
        <span className="flex items-center gap-1 text-lg">
          <div className="font-mono">Page</div>
          <strong className="font-mono">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="font-mono disabled:text-gray-400"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="font-mono disabled:text-gray-400"
        >
          Next
        </Button>
        <span className="flex items-center gap-1 font-mono text-lg">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border px-3 py-1 font-mono"
            min={1}
            max={table.getPageCount().toLocaleString()}
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="rounded-sm px-1 py-2 font-mono text-lg"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="m-2">
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
