"use server";

import {
  Company,
  CompanyProduct,
  ProductsHistoryItem,
  TodoListItem,
} from "@/app/lib/models";
import { getCurrentUser } from "@/app/lib/actions-user";
import { sql } from "@vercel/postgres";

const tableCompanies = "companies";
const tableCompanyProductList = "companyProductList";
const tableCompanyProducts = "companyProducts";

export async function addCompany(name: string): Promise<Company | null> {
  try {
    let query = `SELECT * FROM ${tableCompanies} WHERE name='${name}'`;
    let result = await sql.query<Company>(query);
    if (result.rowCount == 0) {
      query = `INSERT INTO ${tableCompanies} (name, email) VALUES ('${name}', '') RETURNING *`;
      result = await sql.query<Company>(query);
    }

    if (result.rowCount == 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return null;
  }
}

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

export async function addCompanyProductsList(
  name: string,
  date: number,
  data: string,
): Promise<string> {
  try {
    const user = await getCurrentUser();
    if (!user) return "-1";

    const companyQuery = `SELECT * FROM ${tableCompanies} WHERE name='${name}'`;
    const companyResult = await sql.query<Company>(companyQuery);
    let company: Company;
    if (companyResult.rowCount == 0) {
      const createdCompany = await addCompany(name);
      if (createdCompany) {
        company = createdCompany;
      } else {
        return "-1";
      }
    } else {
      company = companyResult.rows[0];
    }

    const query = `INSERT INTO ${tableCompanyProductList} (company_id, date, list) VALUES ('${company.id}', '${date}', '${data.replaceAll('"', "`").replaceAll("'", "`")}') RETURNING *`;
    const result = await sql.query<ProductsHistoryItem>(query);
    if (result.rowCount == 0) return "-1";

    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return "-1";
  }
}

export async function removeCompanyProductsList(id: string): Promise<string> {
  try {
    const query = `DELETE FROM ${tableCompanyProductList} WHERE id='${id}' RETURNING *`;
    const result = await sql.query<ProductsHistoryItem>(query);
    if (result.rowCount == 0) return "-1";

    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return "-1";
  }
}

export async function getAllTodoList(): Promise<TodoListItem[]> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const query = `SELECT * FROM todolist WHERE user_id='${user.id}'`;

    const result = await sql.query<TodoListItem>(query);
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return [];
  }
}

export async function addNewTodo(value: string): Promise<TodoListItem | null> {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const query = `INSERT INTO todolist (user_id, value, completed) VALUES ('${user.id}', '${value}', '0') RETURNING *`;

    const result = await sql.query<TodoListItem>(query);
    if (result.rows.length == 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return null;
  }
}

export async function updateTodoCompleted(value: string): Promise<string> {
  try {
    const user = await getCurrentUser();
    if (!user) return "-1";

    const query = `UPDATE todolist SET completed='${value}' WHERE user_id='${user.id}' RETURNING id`;

    const result = await sql.query<TodoListItem>(query);
    if (result.rows.length == 0) return "-1";
    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return "-1";
  }
}

export async function deleteTodos(values: string[]): Promise<TodoListItem[]> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const query = `DELETE FROM todolist WHERE user_id='${user.id}' AND id IN (${values.map((item) => `'${item}'`).join(", ")}) RETURNING *`;

    const result = await sql.query<TodoListItem>(query);
    if (result.rows.length == 0) return [];
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return [];
  }
}
