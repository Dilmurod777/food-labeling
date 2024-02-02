'use server';

import type {Ingredient, Recipe, RecipeItem} from "@/app/lib/models";
import {sql} from "@vercel/postgres";
import {getCurrentUser} from "@/app/lib/actions-user";
import {revalidatePath} from "next/cache";
import {randomBytes} from "crypto";


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
        let query = `SELECT * FROM recipes WHERE user_id='${user.id}' AND id='${id}'`;

        const recipes = await sql.query<Recipe>(query);
        if (recipes.rowCount == 0) return undefined;

        const recipe = recipes.rows[0];
        const recipe_items: RecipeItem[] = JSON.parse(recipe.recipe_items || "[]");
        if (recipe_items.length > 0) {
            query = `SELECT * FROM ingredients WHERE id IN (${recipe_items.map(item => `'${item.ingredient_id}'`).join(",")})`;
            const ingredients = (await sql.query<Ingredient>(query)).rows;
            const filtered_recipe_items: RecipeItem[] = [];
            for (let item of recipe_items) {
                const ingredient = ingredients.filter(ingredient => ingredient.id == item.ingredient_id);
                if (ingredient.length != 0) {
                    filtered_recipe_items.push({
                        ...item,
                        ingredient: ingredient[0]
                    })
                }
            }

            recipe.recipe_items = JSON.stringify(filtered_recipe_items);
        }


        return recipe;
    } catch (error) {
        console.error('Failed to fetch recipe:', error);
        return undefined;
    }
}

export async function create(data: Recipe): Promise<string> {
    try {
        const {id, ...rest}: Recipe = data;
        rest.name = "Recipe " + randomBytes(10).toString('hex');

        const query = `INSERT INTO recipes (${Object.keys(rest).join(',')}) VALUES (${Object.values(rest).map(item => `'${item}'`).join(',')}) RETURNING id`;
        const recipe = await sql.query<Recipe>(query);
        if (recipe.rowCount == 0) return "-1";

        revalidatePath("/dashboard/recipes", "page");
        revalidatePath("/dashboard", "page");

        return recipe.rows[0].id;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        return "-1";
    }
}

export async function deleteById(prevState: Recipe | undefined, formData: FormData): Promise<Recipe | undefined> {
    try {
        const user = await getCurrentUser();
        if (!user) return undefined;

        let id = formData.get("recipe-id");
        if (!id) return;

        const query = `DELETE FROM recipes WHERE user_id='${user.id}' AND id='${id.toString()}'`;
        const result = await sql.query<Recipe>(query)
        revalidatePath("/dashboard/inventory");

        if (result.rowCount == 0) return undefined;
        return result.rows[0];
    } catch (error) {
        console.log("error: ", error)
        return undefined;
    }
}