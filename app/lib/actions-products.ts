"use server";

import type { Product } from "@/app/lib/models";
import { sql } from "@vercel/postgres";
import { getCurrentUser } from "@/app/lib/actions-user";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";
import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";
import { convertStringToNetWeight } from "@/app/lib/utilities";

const TABLE = "products";

export async function getAll(): Promise<Product[]> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const query = `SELECT * FROM ${TABLE} WHERE user_id='${user.id}'`;

    const recipes = await sql.query<Product>(query);
    return recipes.rows;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getById(id: string): Promise<Product | undefined> {
  try {
    const user = await getCurrentUser();
    if (!user) return undefined;
    let query = `SELECT * FROM ${TABLE} WHERE user_id='${user.id}' AND id='${id}'`;

    const productResult = await sql.query<Product>(query);
    if (productResult.rowCount == 0) return undefined;

    return productResult.rows[0];
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    return undefined;
  }
}

export async function create(data: Product, name = ""): Promise<string> {
  try {
    const { id, ...rest }: Product = data;
    if (name == "") {
      rest.name = "Product " + randomBytes(10).toString("hex");
    } else {
      rest.updated_at = Date.now().toString();
      rest.name = name;
    }

    const values = Object.values(rest).map((value) => {
      if (typeof value == "string") {
        value = value
          .trim()
          .replaceAll("'", "''")
          .replaceAll("`", "``")
          .replaceAll('""', '""');
      }
      return `'${value}'`;
    });

    const query = `INSERT INTO ${TABLE} (${Object.keys(rest).join(",")}) VALUES (${values.join(",")}) RETURNING id`;
    const recipe = await sql.query<Product>(query);
    if (recipe.rowCount == 0) return "-1";

    revalidatePath("/dashboard/products", "page");
    revalidatePath("/dashboard", "page");

    return recipe.rows[0].id;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return "-1";
  }
}

export async function update(data: Product): Promise<string> {
  try {
    const { id, user_id, ...product }: Product = data;

    const columnValuePairs: string[] = [];
    for (let key of Object.keys(product)) {
      let value = product[key];

      if (typeof value == "string") {
        value = value
          .trim()
          .replaceAll("'", "''")
          .replaceAll("`", "``")
          .replaceAll('""', '""');
      }

      columnValuePairs.push(`${key.trim()}='${value}'`);
    }

    const query = `UPDATE ${TABLE} SET ${columnValuePairs.join(",")} WHERE id='${id}' AND user_id='${user_id}' RETURNING id`;
    const result = await sql.query<Product>(query);

    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard");

    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return "-1";
  }
}

export async function deleteById(
  prevState: Product | undefined,
  formData: FormData,
): Promise<Product | undefined> {
  try {
    const user = await getCurrentUser();
    if (!user) return undefined;

    let id = formData.get("id");
    if (!id) return;

    const query = `DELETE FROM ${TABLE} WHERE user_id='${user.id}' AND id='${id.toString()}'`;
    const result = await sql.query<Product>(query);
    revalidatePath("/dashboard/products");

    if (result.rowCount == 0) return undefined;
    return result.rows[0];
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
}

export async function copyById(
  prevState: Product | undefined,
  formData: FormData,
): Promise<Product | undefined> {
  try {
    const user = await getCurrentUser();
    if (!user) return undefined;

    let id = formData.get("id");
    if (!id) return;

    const query = `SELECT * FROM ${TABLE} WHERE user_id='${user.id}' AND id='${id.toString()}'`;
    const result = await sql.query<Product>(query);
    if (result.rowCount == 0) return undefined;
    const product = result.rows[0];
    const newId = await create(product, `${product.name} Copy`);

    revalidatePath("/dashboard/products");

    return getById(newId);
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
}
