"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Column as GridColumn, Row as GridRow } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsHistoryItem } from "@/app/lib/models";
import { useEffect, useState } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { DatePicker } from "@/components/ui/date-picker";

export const columns: ColumnDef<ProductsHistoryItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "date",
    header: "Last modified",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.name)}
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface Props {
  productsHistory: ProductsHistoryItem[];
  openFile: (url: string) => void;
}

export function ProductsHistory({ productsHistory, openFile }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: productsHistory,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const [uploading, setUploading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentFile, setCurrentFile] = useState<File>();
  const [currentDate, setCurrentDate] = useState<number>(Date.now());

  const uploadFileHandler = () => {
    setUploading(true);

    try {
      if (!currentFile) return;

      readXlsxFile(currentFile, { trim: true }).then(function (data: Row[]) {
        const nonNullData = data.filter(
          (row) => row.findIndex((item) => item != null) != -1,
        );

        const headerIndex = nonNullData.findIndex(
          (row) =>
            row[0] != null && row[0].toString().toLowerCase().startsWith("no"),
        );

        const headers = nonNullData[headerIndex];
        const headersRow: GridRow = {
          rowId: "header",
          cells: headers.map((item) => ({
            type: "header",
            text: item ? item.toString() : "",
          })),
        };

        const columns: GridColumn[] = headers.map((item) => ({
          columnId: item ? item.toString() : "",
          width: item
            ? item.toString().toLowerCase().startsWith("no.")
              ? 20
              : 150
            : 150,
          resizable: true,
        }));

        const rows: GridRow[] = [headersRow];
        for (let i = headerIndex + 1; i < nonNullData.length; i++) {
          const row: GridRow = {
            rowId: i,
            cells: [],
          };
          for (let j = 0; j < headers.length; j++) {
            let value = nonNullData[i][j];

            if (typeof value == "number") {
              value = Number(value.toFixed(2));
              row.cells.push({ type: "number", value: value });
            } else {
              row.cells.push({
                type: "text",
                text: value ? value.toString() : "",
              });
            }
          }
          rows.push(row);
        }

        openFile(
          JSON.stringify({
            rows: rows,
            columns: columns,
          }),
        );
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <Dialog open={showAddDialog} onOpenChange={(v) => setShowAddDialog(v)}>
        <div className="flex items-center gap-2 py-4">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DialogTrigger asChild>
            <Button className={"flex gap-2"} type={"button"}>
              <PiMicrosoftExcelLogo className={"text-xl"} />
              <span>Add</span>
            </Button>
          </DialogTrigger>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
        <DialogPortal>
          <DialogContent className="flex h-auto max-h-[80%] w-auto max-w-[80%] flex-col gap-2">
            <DialogHeader className={"w-full"}>
              <DialogTitle>Add new Product List</DialogTitle>
            </DialogHeader>
            <DialogBody className={"flex flex-col gap-4"}>
              <div className={"flex w-full items-center gap-2"}>
                <Input
                  className={"flex w-60 gap-2 focus-within:ring-offset-0"}
                  type={"text"}
                  autoFocus={false}
                  defaultValue={currentName}
                  onChange={(e) => setCurrentName(e.target.value.trim())}
                />
                <DatePicker
                  initialDate={currentDate}
                  updateDate={setCurrentDate}
                />
              </div>
              <Input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setCurrentFile(e.target.files[0]);
                  }
                }}
                className={"w-full"}
                type={"file"}
              />
              <DialogClose asChild>
                <Button
                  type={"submit"}
                  onClick={() => uploadFileHandler()}
                  disabled={
                    uploading ||
                    !currentFile ||
                    currentDate == -1 ||
                    currentName == ""
                  }
                >
                  Add
                </Button>
              </DialogClose>
            </DialogBody>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
