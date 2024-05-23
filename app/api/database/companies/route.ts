import type { NextRequest } from "next/server";
import * as databaseActions from "@/app/lib/actions-database";
import { Company, TabFileData } from "@/app/lib/models";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  const company = await databaseActions.getCompany(id);

  return Response.json(company);
}

export async function PUT(request: NextRequest) {
  const data: Company = await request.json();

  const company = await databaseActions.addCompany(data);

  return Response.json(company);
}

export async function DELETE(request: NextRequest) {
  // const id = await databaseActions.addCompanyProducts(await request.json());
  const { ids }: { ids: string[] } = await request.json();

  const returnedId = await databaseActions.removeCompanies(ids);

  return Response.json({ id: returnedId });
}
