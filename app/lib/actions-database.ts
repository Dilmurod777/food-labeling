"use server";

import type { CompanyProduct } from "@/app/lib/models";
import { getCurrentUser } from "@/app/lib/actions-user";
import { sql } from "@vercel/postgres";

const TABLE = "companyProducts";

export async function getAllCompanyProducts(): Promise<CompanyProduct[]> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const query = `SELECT * FROM ${TABLE}'`;

    const result = await sql.query<CompanyProduct>(query);
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return [];
  }
}
