"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import RecipeEditPage from "@/app/ui/recipes/recipe-edit-page";
import {getRecipeByIdFromLS} from "@/app/lib/actions-localstorage";
import IngredientStatementPage from "@/app/ui/recipes/ingredient-statement-page";
import CostPage from "@/app/ui/recipes/cost-page";
import LabelPage from "@/app/ui/recipes/label-page";
import {Recipe} from "@/app/lib/models";

export default function Page({params}: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const router = useRouter();
    const paramTabIndex = searchParams.get("tab")
    const [tabIndex, setTabIndex] = useState(parseInt(paramTabIndex || '1'))
    const tabs = ["Dashboard", "Recipe", "Ingredient Statement", "Label", "Cost"];
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        setTabIndex(parseInt(paramTabIndex || '1'))
    }, [paramTabIndex])

    useEffect(() => {
        setRecipe(getRecipeByIdFromLS(params.id));
    }, []);

    return <div className={"flex flex-col w-[75%] h-full mt-6 mx-auto"}>
        <div className={"flex items-center h-[45px] border-b-[1px] border-b-[#dbdbdb] mb-8"}>
            {tabs.map((tab, ti) => {
                const isActive = ti == tabIndex;
                return <div
                    key={`dashboard-tab-${ti}`}
                    className={"text-sm text-normal text-black py-2 px-6 cursor-pointer mt-[10px]"}
                    style={{
                        borderTop: `${isActive ? 1 : 0}px solid #dbdbdb`,
                        borderLeft: `${isActive ? 1 : 0}px solid #dbdbdb`,
                        borderRight: `${isActive ? 1 : 0}px solid #dbdbdb`,
                        borderBottom: `${isActive ? 3 : 0}px solid #fff`,
                        borderRadius: "4px 4px 0 0",
                        color: isActive ? "#408abf" : "#000"
                    }}
                    onClick={() => {
                        if (ti == 0) {
                            router.push("/dashboard?tab=0")
                            return;
                        }

                        setTabIndex(ti);
                    }}
                >
                    {tab}
                </div>
            })}
        </div>

        <div className={"h-full py-6"}>
            {!recipe && <div className={"flex items-center justify-center text-lg font-bold text-black"}>No recipe with such ID found.</div>}
            {recipe && tabIndex == 1 && <RecipeEditPage recipe={recipe}/>}
            {recipe && tabIndex == 2 && <IngredientStatementPage recipe={recipe}/>}
            {recipe && tabIndex == 3 && <LabelPage recipe={recipe}/>}
            {recipe && tabIndex == 4 && <CostPage recipe={recipe}/>}
        </div>
    </div>
}