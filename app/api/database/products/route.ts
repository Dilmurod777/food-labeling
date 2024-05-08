import type { NextRequest } from "next/server";
import * as databaseActions from "@/app/lib/actions-database";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
  // const id = await databaseActions.addCompanyProducts(await request.json());

  console.dir(await request.json(), { depth: null });

  return Response.json({ id: -1 });
}
