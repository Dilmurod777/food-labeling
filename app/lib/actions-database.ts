"use server";

import {
  Company,
  CompanyProduct,
  CompanyProductList,
  ProductsHistoryItem,
  TodoListItem,
} from "@/app/lib/models";
import { getCurrentUser } from "@/app/lib/actions-user";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const tableCompanies = "companies";
const tableCompanyProductList = "companyProductList";
const tableCompanyProducts = "companyProducts";

export async function getAllCompanies(): Promise<Company[]> {
  try {
    let query = `SELECT * FROM ${tableCompanies} ORDER BY id DESC`;
    let result = await sql.query<Company>(query);
    if (result.rowCount == 0) return [];

    return result.rows;
  } catch (error) {
    console.error("Failed to fetch company:", error);
    return [];
  }
}

export async function getCompany(id: string) {
  try {
    let query = `SELECT * FROM ${tableCompanies} WHERE id='${id}'`;
    let result = await sql.query<Company>(query);
    if (result.rowCount == 0) return null;

    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch company:", error);
    return null;
  }
}

export async function addCompany(data: Company): Promise<Company | null> {
  try {
    let name = data.name ?? "";
    let email = data.email ?? "";
    let note = data.note ?? "";
    if (name == "") return null;

    let query = `SELECT * FROM ${tableCompanies} WHERE name='${name}'`;
    let result = await sql.query<Company>(query);
    if (result.rowCount == 0) {
      query = `INSERT INTO ${tableCompanies} (name, email, note) VALUES ('${name}', '${email}', '${note}') RETURNING *`;
      result = await sql.query<Company>(query);
    }

    if (result.rowCount == 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to add company products:", error);
    return null;
  } finally {
    revalidatePath("/companies/all", "page");
  }
}

export async function updateCompany(company: Company): Promise<Company | null> {
  try {
    const query = `UPDATE ${tableCompanies} SET name='${company.name}', email='${company.email}', note='${company.note}' WHERE id='${company.id}'`;
    const result = await sql.query<Company>(query);

    revalidatePath("/database");

    if (result.rowCount == 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return null;
  } finally {
    revalidatePath("/database");
  }
}

export async function removeCompanies(ids: string[]): Promise<Company[]> {
  try {
    let joinedIds = ids.map((item) => `'${item}'`).join(", ");
    console.log(joinedIds);
    let companyListQuery = `DELETE FROM ${tableCompanyProductList} WHERE company_id IN (${joinedIds}) RETURNING *`;
    let companyListResult =
      await sql.query<CompanyProductList>(companyListQuery);

    let companyQuery = `DELETE FROM ${tableCompanies} WHERE id IN (${joinedIds}) RETURNING *`;
    let companyResult = await sql.query<Company>(companyQuery);

    return companyResult.rows;
  } catch (error) {
    console.error("Failed to fetch company:", error);
    return [];
  }
}

export async function getAllCompanyProductsList(): Promise<
  ProductsHistoryItem[]
> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const query = `SELECT cp.id, c.id as company_id, name, date, email, cp.list FROM companyProductList AS cp INNER JOIN companies AS c ON c.id=cp.company_id`;

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
      const createdCompany = await addCompany({
        name: name,
        email: "",
        note: "",
        id: "",
      });
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

export async function removeCompanyProductsLists(
  ids: string[],
): Promise<string> {
  try {
    const query = `DELETE FROM ${tableCompanyProductList} WHERE id IN (${ids.map((id) => `'${id}'`).join(", ")}) RETURNING *`;
    const result = await sql.query<ProductsHistoryItem>(query);
    if (result.rowCount == 0) return "-1";

    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to remove company products:", error);
    return "-1";
  }
}

export async function updateCompanyProductsList(
  id: string,
  list: string,
): Promise<ProductsHistoryItem | null> {
  try {
    const query = `UPDATE ${tableCompanyProductList} SET list='${list}' WHERE id='${id}' RETURNING *`;
    const result = await sql.query<ProductsHistoryItem>(query);
    if (result.rowCount == 0) return null;

    revalidatePath("/database");

    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch company products:", error);
    return null;
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
