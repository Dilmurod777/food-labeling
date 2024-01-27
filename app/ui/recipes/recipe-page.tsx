import {Recipe, RecipeItem, Tag, User} from "@/app/lib/models";
import {convertToHumanReadableTime} from "@/app/lib/utilities";
import Title from "@/app/ui/recipes/recipe-page/title";
import Tags from "@/app/ui/recipes/recipe-page/tags";
import SearchBar from "@/app/ui/recipes/recipe-page/searchbar";
import RecipeItems from "@/app/ui/recipes/recipe-page/recipe-items";
import Link from "next/link";
import {FaPlus} from "react-icons/fa"
import {useEffect, useState} from "react";

interface Props {
    recipe: Recipe,
    user: User,
    updateRecipe: (data: { [key: string]: string | RecipeItem[] | Tag[] }) => void
}

export default function RecipePage({recipe, user, updateRecipe}: Props) {
    const items = recipe.recipe_items || [];
    const [lastUpdatedTime, setLastUpdatedTime] = useState("")

    useEffect(() => {
        setLastUpdatedTime(`Updated ${convertToHumanReadableTime(Date.now() - parseInt(recipe.updated_at))}`)
    }, [recipe.updated_at])

    const removeRecipeItem = (id: string) => {
        const newRecipeItems = (recipe.recipe_items || []).filter(item => item.id != id);

        updateRecipe({
            ingredient_list: JSON.stringify((newRecipeItems.map(item => item.id))),
            recipe_items: newRecipeItems
        })
        
        console.log(`remove recipe item: ${id}`)
    }

    return <div className={"flex flex-col items-start"}>
        <div className={"flex justify-between items-end w-full flex-grow gap-8"}>
            <div className={"flex flex-col items-start"}>
                <Title
                    recipe={recipe}
                    updateRecipe={updateRecipe}
                />

                <Tags
                    recipe={recipe}
                    updateRecipe={updateRecipe}
                    user={user}
                />
            </div>

            <p className={"text-xs text-main-blue font-thin"}>{lastUpdatedTime}</p>
        </div>

        <div className={"w-full flex gap-4 items-stretch justify-between *:flex-grow mt-6"}>
            <SearchBar recipe={recipe} updateRecipe={updateRecipe}/>

            <Link
                href={"/ingredients/create"}
                className={"w-[275px] px-4 py-2 flex gap-2 items-center justify-start bg-main-blue hover:bg-hover-main-blue cursor-pointer text-white rounded-xl text-xs font-normal"}
            >
                <FaPlus/>
                <span>Create your own ingredient</span>
            </Link>
        </div>
        <div className={"items-start gap-8 w-full mt-8"} style={{display: items.length == 0 ? "none" : "flex"}}>
            <RecipeItems items={items} removeRecipeItem={removeRecipeItem}/>
            <div className={"w-[300px] h-[500px] bg-main-gray"}></div>
        </div>
    </div>
}