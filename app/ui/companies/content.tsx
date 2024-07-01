"use client";

import { Company } from "@/app/lib/models";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import readXlsxFile, { Row } from "read-excel-file";
import { v4 as uuidV4 } from "uuid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { LiaAddressCardSolid } from "react-icons/lia";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { overflowText } from "@/app/lib/utilities";
import Loading from "@/app/ui/loading";
import { revalidatePath, revalidateTag } from "next/cache";

interface Props {
  companies: Company[];
}

export default function Content({ companies }: Props) {
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const router = useRouter();

  const columns: ColumnDef<Company>[] = [
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
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Link href={`/companies/${item.id}`} className={"hover:text-main"}>
            {row.getValue("name")}
          </Link>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{overflowText(row.getValue("email"), 30)}</div>,
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => <div>{overflowText(row.getValue("note"), 50)}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row, table }) => {
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
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/companies/${item.id}`);
                }}
              >
                View Company
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.note)}
              >
                Copy note
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setLoading(true);
                  fetch("/api/database/companies", {
                    method: "DELETE",
                    body: JSON.stringify({
                      ids:
                        table.getSelectedRowModel().rows.length > 0
                          ? table
                              .getSelectedRowModel()
                              .rows.map((item) => item.original.id)
                          : [item.id],
                    }),
                  }).then(() => {
                    router.refresh();
                    table.resetRowSelection();
                    setTimeout(() => {
                      setLoading(false);
                    }, 1500);
                  });
                }}
              >
                {table.getSelectedRowModel().rows.length <= 1
                  ? "Delete"
                  : "Delete Selected"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: companies,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination,
    },
  });
  const [saving, setSaving] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company>({
    name: "",
    id: "",
    email: "",
    note: "",
  });

  const saveCompany = async () => {
    setSaving(true);

    await fetch("/api/database/companies", {
      method: currentCompany.id == "" ? "PUT" : "POST",
      body: JSON.stringify({
        ...currentCompany,
      }),
    });

    router.refresh();
    setCurrentCompany({
      id: "",
      name: "",
      email: "",
      note: "",
    });
    setSaving(false);
  };

  return (
    <div className="relative h-full w-full flex-grow px-12 py-4">
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
          {/*<div className="flex-1 text-sm text-muted-foreground">*/}
          {/*  {table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
          {/*  {table.getFilteredRowModel().rows.length} row(s) selected.*/}
          {/*</div>*/}
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
          <DialogContent className="flex h-auto max-h-[80%] w-auto max-w-[80%] flex-col gap-6">
            <DialogHeader className={"w-full"}>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <div className={"flex flex-col gap-4"}>
              <Input
                className={"flex w-full gap-2 focus-within:ring-offset-0"}
                type={"text"}
                placeholder={"Enter company name"}
                defaultValue={currentCompany?.name || ""}
                onChange={(e) =>
                  setCurrentCompany({
                    ...currentCompany,
                    name: e.target.value.trim(),
                  })
                }
              />
              <Input
                className={"flex w-full gap-2 focus-within:ring-offset-0"}
                type={"email"}
                placeholder={"Enter company email"}
                defaultValue={currentCompany?.email || ""}
                onChange={(e) =>
                  setCurrentCompany({
                    ...currentCompany,
                    email: e.target.value.trim(),
                  })
                }
              />
              <Textarea
                className={
                  "flex max-h-96 w-96 gap-2 focus-within:ring-offset-0"
                }
                placeholder={"Enter note"}
                defaultValue={currentCompany?.note || ""}
                onChange={(e) =>
                  setCurrentCompany({
                    ...currentCompany,
                    note: e.target.value.trim(),
                  })
                }
              ></Textarea>
              <DialogClose asChild>
                <Button
                  type={"submit"}
                  onClick={() => saveCompany()}
                  disabled={
                    saving ||
                    currentCompany == null ||
                    currentCompany.name == "" ||
                    currentCompany.email == ""
                  }
                >
                  Add
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      {(loading || saving) && (
        <div
          className={
            "absolute bottom-0 left-0 right-0 top-0 z-10 bg-main-gray/60"
          }
        >
          <Loading />
        </div>
      )}
    </div>
  );
}
