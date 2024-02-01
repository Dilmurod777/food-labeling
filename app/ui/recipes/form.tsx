"use client";

import {Recipe, RecipeItem, Tag, User} from "@/app/lib/models";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import RecipePage from "@/app/ui/recipes/recipe-page";
import IngredientStatementPage from "@/app/ui/recipes/ingredient-statement-page";
import LabelPage from "@/app/ui/recipes/label-page";
import CostPage from "@/app/ui/recipes/cost-page";

interface Props {
    recipe: Recipe;
    user: User
}

enum SavingState {Saved, Saving, NotSaved}

export default function Form({recipe, user}: Props) {
    const router = useRouter();
    const [tabIndex, setTabIndex] = useState(1);
    const tabs = ["Dashboard", "Recipe", "Ingredient Statement", "Label", "Cost"];
    const [savingState, setSavingState] = useState<SavingState>(SavingState.Saved);
    const [_recipe, setRecipe] = useState<Recipe>({...recipe})

    const updateRecipe = (data: { [key: string]: string | number | RecipeItem[] | Tag[] }) => {
        setRecipe({
            ..._recipe,
            ...data,
            updated_at: Date.now().toString()
        })
        setSavingState(SavingState.NotSaved)
    }

    const saveRecipeToDB = async () => {
        setSavingState(SavingState.Saving);

        const {id, user_id, tags, recipe_items, ...filteredRecipe} = _recipe;

        await fetch("/api/recipes", {
            method: "POST",
            body: JSON.stringify({
                id: _recipe.id,
                user_id: _recipe.user_id,
                recipe: filteredRecipe
            })
        })

        setSavingState(SavingState.Saved);
    }

    return <div className={"flex flex-col w-full px-12 h-full mt-6 mx-auto"}>
        <div className={"flex justify-between items-center h-[45px] border-b-[1px] border-b-[#dbdbdb] mb-8"}>
            <div className={"flex items-center"}>
                {tabs.map((tab, ti) => {
                    const isActive = ti == tabIndex;
                    return <div
                        key={`dashboard-tab-${ti}`}
                        className={`relative text-sm text-normal text-black py-2 px-6 cursor-pointer mt-[10px] ${isActive && "after:content-[''] after:w-full after:h-2 after:bg-white after:absolute after:bottom-0 after:left-0"}`}
                        style={{
                            borderTop: `${isActive ? 1 : 0}px solid #dbdbdb`,
                            borderLeft: `${isActive ? 1 : 0}px solid #dbdbdb`,
                            borderRight: `${isActive ? 1 : 0}px solid #dbdbdb`,
                            borderBottom: `${isActive ? 1 : 0}px solid #fff`,
                            borderRadius: "4px 4px 0 0",
                            color: isActive ? "#408abf" : "#000",
                        }}
                        onClick={() => {
                            if (ti == 0) {
                                router.push("/dashboard/recipes")
                                return;
                            }

                            setTabIndex(ti);
                        }}
                    >
                        {tab}
                    </div>
                })}
            </div>

            <div
                className={`flex justify-center items-center text-sm text-white font-thin rounded-md px-6 py-2 cursor-pointer ${SavingState.Saved ? "bg-gray-500 hover:bg-gray-600" : "bg-main-blue hover:bg-hover-main-blue"}`}
                onClick={saveRecipeToDB}
            >
                {savingState == SavingState.Saving && "Saving..."}
                {savingState == SavingState.Saved && "Saved"}
                {savingState == SavingState.NotSaved && "Not Saved"}
            </div>
        </div>

        <FormPages recipe={_recipe} tabIndex={tabIndex} user={user} updateRecipe={updateRecipe}/>
    </div>
}

const FormPages = React.memo(function FormPages({recipe, tabIndex, user, updateRecipe}: {
    recipe: Recipe,
    tabIndex: number,
    user: User,
    updateRecipe: (data: { [key: string]: string | number | RecipeItem[] | Tag[] }) => void
}) {
    return <div className={"w-full h-full py-6"}>
        {!recipe &&
            <div className={"flex items-center justify-center text-lg font-bold text-black"}>No recipe with such ID
                found.</div>}
        {recipe && tabIndex == 1 && <RecipePage recipe={recipe} user={user} updateRecipe={updateRecipe}/>}
        {recipe && tabIndex == 2 && <IngredientStatementPage recipe={recipe}/>}
        {recipe && tabIndex == 3 && <LabelPage recipe={recipe} updateRecipe={updateRecipe}/>}
        {recipe && tabIndex == 4 && <CostPage recipe={recipe}/>}
    </div>
});