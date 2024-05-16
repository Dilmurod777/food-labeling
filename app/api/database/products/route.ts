import type { NextRequest } from "next/server";
import * as databaseActions from "@/app/lib/actions-database";
import { TabFileData } from "@/app/lib/models";
import { Row as GridRow, Column as GridColumn } from "@silevis/reactgrid";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
  // const id = await databaseActions.addCompanyProducts(await request.json());
  const data: TabFileData = await request.json();
  const companyName = data.name.split("-")[0];

  await databaseActions.addCompany(companyName);
  await databaseActions.addCompanyProductsList(
    companyName,
    data.date,
    JSON.stringify({
      rows: data.rows,
      columns: data.columns,
    }),
  );

  return Response.json({ id: -1 });
}

export async function PUT(request: NextRequest) {
  const data: { id: string; rows: GridRow[]; columns: GridColumn[] } =
    await request.json();

  const updatedItem = await databaseActions.updateCompanyProductsList(
    data.id,
    JSON.stringify({
      rows: data.rows,
      columns: data.columns,
    }),
  );

  return Response.json(updatedItem);
}

export async function DELETE(request: NextRequest) {
  // const id = await databaseActions.addCompanyProducts(await request.json());
  const { ids }: { ids: string[] } = await request.json();
  console.log(ids);

  const returnedId = await databaseActions.removeCompanyProductsLists(ids);

  return Response.json({ id: returnedId });
}
