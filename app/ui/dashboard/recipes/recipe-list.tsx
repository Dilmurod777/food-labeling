"use client";

import {FaPlus} from "react-icons/fa";
import Link from "next/link";
import {DefaultRecipe, Recipe, User} from "@/app/lib/models";
import {useRouter} from "next/navigation";
import {Fragment, useState} from "react";
import CreateRecipesBtn from "@/app/ui/create-recipes-btn";

interface Props {
    recipes: Recipe[],
    user: User
}

export default function RecipeList({recipes, user}: Props) {
    return <div className={"flex flex-col gap-4 py-12"}>
        <div className={"flex gap-4"}>
            <h2 className={"text-2xl font-bold text-black"}>
                Recipes {user?.email &&
							<span>for&nbsp;
								<span className={"font-thin"}>{user.email}</span>
                            </span>}
            </h2>
            <CreateRecipesBtn user={user}/>
        </div>
        <div className={"flex flex-col"}>
            {recipes.map((recipe, i) => <div
                key={`recipe-${i}`}
                className={"flex gap-2"}
            >
                <Link
                    href={`/recipes/${recipe.id}/edit`}
                    className={"text-lg text-main-blue hover:text-hover-main-blue"}
                >{recipe.id} : {recipe.name}</Link>
            </div>)}
        </div>
    </div>
}