import type { NextRequest } from "next/server";
import * as databaseActions from "@/app/lib/actions-database";
import { TabFileData } from "@/app/lib/models";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
  // const id = await databaseActions.addCompanyProducts(await request.json());
  const data: TabFileData = await request.json();
  const companyName = data.name.split("-")[0];

  console.log(data.name, data.date);

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

export async function DELETE(request: NextRequest) {
  // const id = await databaseActions.addCompanyProducts(await request.json());
  const { id }: { id: string } = await request.json();
  console.log(id);

  const returnedId = await databaseActions.removeCompanyProductsList(id);

  return Response.json({ id: returnedId });
}
