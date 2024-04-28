import DataTable from "@/app/ui/database/data-table";

export default async function Page() {
  return (
    <div className={"flex h-full w-full flex-grow flex-col gap-2 px-8 py-2"}>
      <DataTable />
    </div>
  );
}
