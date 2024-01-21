import {getRecipesFromLS} from "@/app/lib/actions-localstorage";
import {FaPlus} from "react-icons/fa";

export default function RecipeList({onCreateNewRecipe}: { onCreateNewRecipe: () => void }) {
    const recipes = getRecipesFromLS();

    return <div className={"flex flex-col gap-4"}>
        <div className={"flex gap-4"}>
            <h2 className={"text-3xl font-bold text-black"}>Recipes</h2>
            <div
                onClick={onCreateNewRecipe}
                className={"flex gap-2 items-center justify-center text-sm text-white font-normal px-4 py-2 rounded-md bg-main-green hover:bg-hover-main-green cursor-pointer"}
            >
                <FaPlus className={"text-lg"}/>
                <span>Create a recipe</span>
            </div>
        </div>
        <div className={"flex flex-col"}>
            {recipes.map((recipe, i) => <div
                key={`recipe-${i}`}
                className={"flex gap-2"}
            >
                <p>{recipe.id} : {recipe.name}</p>
            </div>)}
        </div>
    </div>
}