"use server";

import { CompanyProduct, ProductsHistoryItem } from "@/app/lib/models";
import { getCurrentUser } from "@/app/lib/actions-user";
import { sql } from "@vercel/postgres";

export async function getAllCompanyProducts(): Promise<ProductsHistoryItem[]> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const query = `SELECT cp.id, name, date, email FROM companyProductList AS cp INNER JOIN companies AS c ON c.id=cp.company_id`;

    const result = await sql.query<ProductsHistoryItem>(query);
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return [];
  }
}

export async function addCompanyProducts() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const query = `INSERT INTO companyProducts`;

    const result = await sql.query<ProductsHistoryItem>(query);
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return -1;
  }
}
