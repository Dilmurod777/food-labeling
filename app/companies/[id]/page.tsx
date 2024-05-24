"use client";

import * as databaseActions from "@/app/lib/actions-database";
import {
  Company,
  CompanyProductList,
  ExtendedCompanyProductList,
} from "@/app/lib/models";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import Loading from "@/app/ui/loading";

export default function Page() {
  const [company, setCompany] = useState<Company | null>();
  const [companyProductLists, setCompanyProductLists] = useState<
    ExtendedCompanyProductList[]
  >([]);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const params = useParams<{ id: string }>();

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
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(0);
        date.setUTCMilliseconds(row.getValue("date"));
        return <div>{date.toDateString()}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const productList = row.original;

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
                onClick={async () => {
                  setDeleting(true);
                  const removedIds =
                    await databaseActions.removeCompanyProductsLists([
                      productList.id,
                    ]);

                  setCompanyProductLists(
                    companyProductLists.filter(
                      (item) => !removedIds.includes(item.id),
                    ),
                  );
                  setDeleting(false);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable<ExtendedCompanyProductList>({
    data: companyProductLists,
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setFetching(true);
    const company = await databaseActions.getCompany(params.id);
    setCompany(company);

    if (company) {
      const companyProductLists =
        await databaseActions.getAllCompanyProductsList(company.id);
      setCompanyProductLists(companyProductLists);
    }

    setFetching(false);
  };

  const saveCompanyData = async () => {
    if (!company) return;

    setUpdating(true);

    await databaseActions.updateCompany(company);

    setUpdating(false);
  };

  if (fetching) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-main-gray/60"
        }
      >
        <Loading />
      </div>
    );
  }

  if (!company) {
    return (
      <div className={"flex h-16 w-full items-center justify-center"}>
        No such company was found.
      </div>
    );
  }

  return (
    <div className={"relative flex h-full w-full flex-grow"}>
      {deleting && (
        <div
          className={
            "absolute flex h-full w-full items-center justify-center bg-main-gray/60"
          }
        >
          <Loading />
        </div>
      )}
      <div className={"flex h-full w-full flex-grow flex-col gap-2 px-12 py-6"}>
        <h2 className={"text-xl/none"}>Company info</h2>
        <hr />
        <div className={"flex h-full w-full flex-grow"}>
          <div
            className={
              "flex h-full w-full max-w-[50%] flex-grow flex-col gap-4"
            }
          >
            <div className={"mt-2 flex w-full flex-col gap-4"}>
              <div className="flex w-full max-w-sm flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id={"name"}
                  type="text"
                  placeholder="Enter name"
                  value={company.name}
                  maxLength={50}
                  className={"focus-visible:ring-main-orange"}
                  onChange={(e) =>
                    setCompany({ ...company, name: e.target.value.trim() })
                  }
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={company.email}
                  className={"focus-visible:ring-main-orange"}
                  onChange={(e) =>
                    setCompany({ ...company, email: e.target.value.trim() })
                  }
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  placeholder="Enter note"
                  value={company.note || ""}
                  className={
                    "h-36 max-h-48 min-h-32 focus-visible:ring-main-orange"
                  }
                  onChange={(e) =>
                    setCompany({ ...company, note: e.target.value.trim() })
                  }
                />
              </div>
            </div>

            <Button
              variant={"default"}
              className={"w-20"}
              onClick={saveCompanyData}
              disabled={updating || company.name == ""}
            >
              {updating ? "Saving..." : "Save"}
            </Button>
          </div>

          {companyProductLists.length > 0 && (
            <div className="w-full">
              <div className={"flex w-full py-4"}>History</div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
