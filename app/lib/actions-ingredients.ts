'use server';

import {sql} from "@vercel/postgres";
import type {Ingredient, Recipe} from "@/app/lib/models";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from 'next/navigation'
import {revalidatePath} from "next/cache";
import {randomBytes} from "crypto";

export async function create(data: Ingredient) {
    try {
        const {id, ...rest}: Ingredient = data;
        rest.name = "Ingredient " + randomBytes(10).toString('hex');

        const query = `INSERT INTO ingredients (${Object.keys(rest).join(',')}) VALUES (${Object.values(rest).map(item => `'${item}'`).join(',')}) RETURNING id`;
        const recipe = await sql.query<Ingredient>(query);
        if (recipe.rowCount == 0) return "-1";

        revalidatePath("/dashboard/ingredients", "page");
        revalidatePath("/dashboard", "page");

        return recipe.rows[0].id;
    } catch (error) {
        console.log("error: ", error)
        throw error
    }
}

export async function update(prevState: Ingredient | undefined, formData: FormData) {
    try {
        const user = await getCurrentUser();
        if (!user) return undefined;

        let id = "";
        const pairs: string[] = [];
        for (const entry of formData.entries()) {
            if (entry[1].toString().trim() == "") continue;
            if (!entry[0].startsWith("ingredient-")) continue;

            const key = entry[0].replace("ingredient-", "").replaceAll("-", "_");
            if (key == "id") {
                id = entry[1].toString()
                continue;
            }
            pairs.push(`${key}='${entry[1].toString()}'`);
        }

        pairs.push(`updated_at='${Date.now()}'`);

        if (id == "") return undefined;

        const query = `UPDATE ingredients SET ${pairs.join(", ")} WHERE user_id='${user.id}' AND id='${id}'`;
        await sql.query<Ingredient>(query)
        revalidatePath(`/ingredients/${id}/view`, "page");
        redirect(`/ingredients/${id}/view`);
    } catch (error) {
        console.log("error: ", error)
        throw error
    }
}

export async function getAll(): Promise<Ingredient[]> {
    try {
        const user = await getCurrentUser();
        if (!user) return [];

        const query = `SELECT * FROM ingredients WHERE user_id='${user.id}'`;
        const result = await sql.query<Ingredient>(query)

        return result.rows;
    } catch (error) {
        console.log("error: ", error)
        return [];
    }
}

export async function getById(id: string): Promise<Ingredient | undefined> {
    try {
        const user = await getCurrentUser();
        if (!user) return undefined;

        if (id == "") return undefined;

        const query = `SELECT * FROM ingredients WHERE user_id='${user.id}' AND id='${id}'`;
        const result = await sql.query<Ingredient>(query)

        if (result.rowCount == 0) return undefined;
        return result.rows[0];
    } catch (error) {
        console.log("error: ", error)
        return undefined;
    }
}

export async function getByQuery(searchQuery: string, columns: string[]): Promise<Ingredient[]> {
    try {
        const user = await getCurrentUser();
        if (!user) return [];

        if (searchQuery == "") return [];

        const columns_to_get = columns.length == 0 ? "*" : columns.join(", ");
        const query = `SELECT ${columns_to_get} FROM ingredients WHERE user_id='${user.id}' AND LOWER(name) LIKE '%${searchQuery.toLowerCase()}%'`;
        const result = await sql.query<Ingredient>(query)

        return result.rows;
    } catch (error) {
        console.log("error: ", error)
        return [];
    }
}

export async function deleteById(prevState: Ingredient | undefined, formData: FormData): Promise<Ingredient | undefined> {
    try {
        const user = await getCurrentUser();
        if (!user) return undefined;

        let id = formData.get("ingredient-id");
        if (!id) return;

        const query = `DELETE FROM ingredients WHERE user_id='${user.id}' AND id='${id.toString()}'`;
        const result = await sql.query<Ingredient>(query)
        revalidatePath("/dashboard/inventory");

        if (result.rowCount == 0) return undefined;
        return result.rows[0];
    } catch (error) {
        console.log("error: ", error)
        return undefined;
    }
}