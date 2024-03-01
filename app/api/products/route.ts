import type { NextRequest } from "next/server";
import * as recipeActions from "@/app/lib/actions-products";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic"; // defaults to auto
export async function PUT(request: NextRequest) {
  const id = await recipeActions.update(await request.json());
  revalidatePath(`/products/${id}/edit`);

  return Response.json({ id: id });
}

export async function POST(request: NextRequest) {
  const id = await recipeActions.create(await request.json());

  return Response.json({ id: id });
}
