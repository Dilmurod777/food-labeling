"use client";

import {Recipe, User} from "@/app/lib/models";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import RecipePage from "@/app/ui/recipes/recipe-page";
import IngredientStatementPage from "@/app/ui/recipes/ingredient-statement-page";
import LabelPage from "@/app/ui/recipes/label-page";
import CostPage from "@/app/ui/recipes/cost-page";

interface Props {
    recipe: Recipe;
    user: User
}

export default function Form({recipe, user}: Props) {
    const router = useRouter();
    const [tabIndex, setTabIndex] = useState(1);
    const tabs = ["Dashboard", "Recipe", "Ingredient Statement", "Label", "Cost"];

    return <div className={"flex flex-col w-full px-12 h-full mt-6 mx-auto"}>
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

        <div className={"w-full h-full py-6"}>
            {!recipe && <div className={"flex items-center justify-center text-lg font-bold text-black"}>No recipe with such ID found.</div>}
            {recipe && tabIndex == 1 && <RecipePage recipe={recipe} user={user}/>}
            {recipe && tabIndex == 2 && <IngredientStatementPage recipe={recipe}/>}
            {recipe && tabIndex == 3 && <LabelPage recipe={recipe}/>}
            {recipe && tabIndex == 4 && <CostPage recipe={recipe}/>}
        </div>
    </div>
}