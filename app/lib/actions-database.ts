"use server";

import {
  CompanyProduct,
  ProductsHistoryItem,
  TodoListItem,
} from "@/app/lib/models";
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
