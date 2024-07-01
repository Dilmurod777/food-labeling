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
import { Check, ChevronsUpDown, MoreHorizontal } from "lucide-react";
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
import {
  TabFileData,
  ExtendedCompanyProductList,
  Company,
} from "@/app/lib/models";
import { useState } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  companies: Company[];
  productsHistory: ExtendedCompanyProductList[];
  openFile: (data: TabFileData, local: boolean) => void;
}

export function ProductsHistory({
  companies,
  productsHistory,
  openFile,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const router = useRouter();

  const columns: ColumnDef<ExtendedCompanyProductList>[] = [
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
          <Link
            href={`/companies/${item.company_id}`}
            className={"hover:text-main"}
          >
            {row.getValue("name")}
          </Link>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "date",
      header: "Last modified",
      cell: ({ row }) => {
        const date = new Date(0);
        date.setUTCMilliseconds(row.getValue("date"));
        return <div>{date.toDateString()}</div>;
      },
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
                  const { data: rows } = JSON.parse(
                    item.list.replaceAll("`", '"'),
                  );

                  openFile(
                    {
                      id: item.id,
                      name: item.name,
                      rows: rows,
                      date: item.date,
                    },
                    true,
                  );
                }}
              >
                View Record
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/companies/${item.company_id}`);
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  fetch("/api/database/products", {
                    method: "DELETE",
                    body: JSON.stringify({
                      ids: table.getIsSomePageRowsSelected()
                        ? table
                            .getSelectedRowModel()
                            .rows.map((item) => item.original.id)
                        : [item.id],
                    }),
                  }).then(() => {
                    router.refresh();
                    table.resetRowSelection();
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
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination,
    },
  });
  const [uploading, setUploading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company>();
  const [currentFile, setCurrentFile] = useState<File>();
  const [currentDate, setCurrentDate] = useState<number>(Date.now());
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);

  const uploadFileHandler = () => {
    if (!currentCompany) return;
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

        openFile(
          {
            rows: nonNullData.slice(headerIndex),
            name: `${currentCompany.id}__${currentDate}__${uuidV4()}`,
            date: currentDate,
          },
          false,
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

          <Button
            className={"flex gap-2 bg-main hover:bg-main"}
            type={"button"}
            onClick={() => {
              router.push("/companies/all");
            }}
          >
            <span>Show all companies</span>
          </Button>
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
          <DialogContent className="flex h-auto max-h-[80%] w-auto max-w-[80%] flex-col gap-2">
            <DialogHeader className={"w-full"}>
              <DialogTitle>Add new Product List</DialogTitle>
            </DialogHeader>
            <div className={"flex flex-col gap-4"}>
              <div className={"flex w-full items-center gap-2"}>
                <Popover
                  open={showCompanyPopup}
                  onOpenChange={setShowCompanyPopup}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={showCompanyPopup}
                      className="w-[200px] justify-between"
                    >
                      {currentCompany
                        ? companies.find(
                            (company) => company.id === currentCompany.id,
                          )?.name
                        : "Select Company..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Company..." />
                      <CommandEmpty>No company found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {companies.map((company) => (
                            <CommandItem
                              key={company.id}
                              value={company.id}
                              onSelect={(value) => {
                                setCurrentCompany(
                                  companies.find((c) => c.id == value),
                                );
                                setShowCompanyPopup(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${currentCompany?.id === company.id ? "opacity-100" : "opacity-0"}`}
                              />
                              {company.name}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                    !currentCompany
                  }
                >
                  Add
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
