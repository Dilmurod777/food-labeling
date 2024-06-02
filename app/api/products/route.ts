import type { NextRequest } from "next/server";
import * as recipeActions from "@/app/lib/actions-products";
import { revalidatePath } from "next/cache";
import { Product } from "@/app/lib/models";

export const dynamic = "force-dynamic"; // defaults to auto

export async function PUT(request: NextRequest) {
  const id = await recipeActions.update(await request.json());
  revalidatePath(`/products/${id}/edit`);

  return Response.json({ id: id });
}

export async function POST(request: NextRequest) {
  const product: Product = await request.json();
  const id = await recipeActions.create(product, product.name || "");

  return Response.json({ id: id });
}
