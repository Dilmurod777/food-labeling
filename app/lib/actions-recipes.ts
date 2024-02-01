'use server';

import type {Recipe} from "@/app/lib/models";
import {sql} from "@vercel/postgres";
import {getCurrentUser} from "@/app/lib/actions-user";


export async function getAll(): Promise<Recipe[]> {
    try {
        const user = await getCurrentUser();
        if (!user) return [];
        const recipes = await sql<Recipe>`SELECT * FROM recipes WHERE user_id=${user.id}`;
        return recipes.rows;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        return [];
    }
}

export async function getById(id: string): Promise<Recipe | undefined> {
    try {
        const user = await getCurrentUser();
        if (!user) return undefined;
        const query = `SELECT * FROM recipes WHERE user_id='${user.id}' AND id='${id}'`;

        const recipes = await sql.query<Recipe>(query);

        if (recipes.rowCount == 0) return undefined;

        return recipes.rows[0];
    } catch (error) {
        console.error('Failed to fetch recipe:', error);
        return undefined;
    }
}


export async function create(data: Recipe): Promise<Recipe | undefined> {
    try {
        const user = await getCurrentUser();
        if (!user) return undefined;

        const recipe = {...data};

        const existingRecipe = await getById(recipe.id);
        if (!existingRecipe) {
            delete recipe.net_weight_unit;
            const columns = Object.keys(recipe);
            const values = Object.values(recipe).map(item => `'${item}'`);
            const query = `INSERT INTO recipes (${columns.join(",")}) VALUES (${values.join(",")})`
            const createdRecipe = await sql.query(query);
            return createdRecipe.rows[0];
        }

        return undefined;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        return undefined;
    }
}