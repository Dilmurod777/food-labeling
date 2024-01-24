'use server';

import {sql} from "@vercel/postgres";
import type {Ingredient} from "@/app/lib/models";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from 'next/navigation'

export async function create(prevState: Ingredient | undefined, formData: FormData) {
    try {
        const user = await getCurrentUser();
        if (!user) return undefined;

        const data: { [key: string]: string } = {};
        for (const entry of formData.entries()) {
            if (entry[1].toString().trim() == "") continue;
            if (!entry[0].startsWith("ingredient-")) continue;

            const key = entry[0].replace("ingredient-", "").replaceAll("-", "_");
            data[key] = `'${entry[1].toString()}'`;
        }

        data["user_id"] = `'${user.id}'`;
        data["updated_at"] = `'${Date.now()}'`;
        const query = `INSERT INTO ingredients (${Object.keys(data).join(", ")}) VALUES (${Object.values(data).join(", ")})`;
        await sql.query<Ingredient>(query)
        redirect("/dashboard/inventory")
    } catch (error) {
        console.log("error: ", error)
        throw error;
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
        throw error;
    }
}