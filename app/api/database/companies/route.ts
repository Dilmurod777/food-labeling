import type { NextRequest } from "next/server";
import * as databaseActions from "@/app/lib/actions-database";
import { TabFileData } from "@/app/lib/models";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  const company = await databaseActions.getCompany(id);

  return Response.json(company);
}
