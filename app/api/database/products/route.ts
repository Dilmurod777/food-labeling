import type { NextRequest } from "next/server";
import * as databaseActions from "@/app/lib/actions-database";
import { TabFileData } from "@/app/lib/models";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
  // const id = await databaseActions.addCompanyProducts(await request.json());
  const json = await request.json();
  const data: TabFileData = JSON.parse(json);

  console.dir(data, { depth: null });
  console.log(`companyName: ${data.name}`);

  await databaseActions.addCompanyProducts();

  return Response.json({ id: -1 });
}
