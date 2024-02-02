import {IRecipe, Recipe, RecipeItem, User} from "@/app/lib/models";
import {convertToHumanReadableTime} from "@/app/lib/utilities";
import Title from "@/app/ui/recipes/recipe-page/title";
import Tags from "@/app/ui/recipes/recipe-page/tags";
import SearchBar from "@/app/ui/recipes/recipe-page/searchbar";
import RecipeItems from "@/app/ui/recipes/recipe-page/recipe-items";
import Link from "next/link";
import {FaPlus} from "react-icons/fa"
import {useEffect, useState} from "react";
import RecipeSettings from "@/app/ui/recipes/recipe-page/recipe-settings";
import RecipeLabel from "@/app/ui/labels/recipe-label";

interface Props {
    recipe: Recipe,
    user: User,
    updateRecipe: (data: IRecipe) => void
}

export default function RecipePage({recipe, updateRecipe}: Props) {
    const items: RecipeItem[] = JSON.parse(recipe.recipe_items || "[]");
    const [lastUpdatedTime, setLastUpdatedTime] = useState("")

    useEffect(() => {
        setLastUpdatedTime(`Updated ${convertToHumanReadableTime(Date.now() - parseInt(recipe.updated_at))}`)
    }, [recipe.updated_at])

    return <div className={"w-full flex flex-col items-start"}>
        <div className={"w-full flex justify-between items-end flex-grow gap-8"}>
            <div className={"w-full flex flex-col items-start"}>
                <Title
                    recipe={recipe}
                    updateRecipe={updateRecipe}
                />

                <Tags
                    recipe={recipe}
                    updateRecipe={updateRecipe}
                />
            </div>

            <p className={"w-full text-right text-xs text-main-orange font-thin"}>{lastUpdatedTime}</p>
        </div>

        <div className={"w-full flex gap-4 items-stretch justify-between *:flex-grow mt-6"}>
            <SearchBar recipe={recipe} updateRecipe={updateRecipe}/>

            <Link
                href={"/ingredients/full-form"}
                className={"w-[275px] px-4 py-2 flex gap-2 items-center justify-start bg-main-orange hover:bg-hover-main-orange cursor-pointer text-white rounded-xl text-xs font-normal"}
            >
                <FaPlus/>
                <span>Create your own ingredient</span>
            </Link>
        </div>
        <div className={"items-start gap-8 w-full my-8"} style={{display: items.length == 0 ? "none" : "flex"}}>
            <div className={"flex flex-col gap-8 flex-grow"}>
                <RecipeItems recipe={recipe} updateRecipe={updateRecipe}/>
                {items.length && <RecipeSettings recipe={recipe} updateRecipe={updateRecipe}/>}
            </div>
            <div className={"w-fit flex flex-col gap-4 h-full bg-[#fafafa] border-main-gray border-[1px] rounded-md py-4 px-3"}>
                <div className={'flex flex-col gap-0'}>
                    <h2 className={"text-lg font-bold text-black"}>Label Preview</h2>
                    <Link
                        href={"#"}
                        className={"text-sm text-main-orange hover:text-hover-main-orange text-thin"}
                    >
                        Customize it
                    </Link>
                </div>

                <RecipeLabel recipe={recipe}/>
            </div>
        </div>
    </div>
}