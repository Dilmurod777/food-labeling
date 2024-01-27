import {FaSearch} from "react-icons/fa";
import {FaSliders} from "react-icons/fa6";
import SearchbarResults from "@/app/ui/recipes/recipe-page/searchbar-results";
import {useRef, useState} from "react";
import {useDebouncedCallback} from 'use-debounce';
import {Ingredient, Recipe, RecipeItem, Tag} from "@/app/lib/models";
import {v4 as uuidV4} from "uuid";

interface Props {
    recipe: Recipe;
    updateRecipe: (data: { [key: string]: string | RecipeItem[] | Tag[] }) => void;
}

export default function SearchBar({recipe, updateRecipe}: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null)

    const handleSearch = useDebouncedCallback((term: string) => {
        setSearchQuery(term)
    }, 300);

    const handleRecipeItemAdd = (ingredient: Ingredient) => {
        const index = (recipe.recipe_items || []).findIndex(item => item.ingredient_id == ingredient.id);
        let newRecipeItems: RecipeItem[] = [];

        if (index == -1) {
            newRecipeItems = [
                ...(recipe.recipe_items || []),
                {
                    id: uuidV4(),
                    recipe_id: recipe.id,
                    ingredient_id: ingredient.id,
                    ingredient: ingredient,
                    canada_sugar: false,
                    label_text: ingredient.name,
                    price: 0,
                    quantity: 1,
                    shipping: 0,
                    spice_flavor: 0,
                    unit: 0,
                    waste: 0
                }
            ]
        } else {
            newRecipeItems = [...(recipe.recipe_items || [])]
            newRecipeItems[index].quantity += 1;
        }


        updateRecipe({
            ingredient_list: JSON.stringify((newRecipeItems.map(item => item.id))),
            recipe_items: newRecipeItems
        })
        setSearchQuery("");
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
    }

    return <div className={"relative text-main-gray focus-within:text-secondary-gray w-full"}>
        <input
            ref={searchInputRef}
            type="text"
            className={"w-full py-2 pl-10 pr-16 rounded-3xl border-main-gray border-2 text-sm text-secondary-gray"}
            name={"search"}
            placeholder={"Search an ingredient to add to your recipe"}
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchQuery}
        />
        <FaSearch className={"text-lg absolute left-3 top-1/2 -translate-y-1/2"}/>

        <div
            className={"w-12 flex items-center justify-center absolute top-0 bottom-0 right-0 rounded-tr-3xl rounded-br-3xl bg-main-blue hover:bg-hover-main-blue cursor-pointer"}
        >
            <FaSliders className={'text-white text-lg'}/>
        </div>

        <SearchbarResults searchQuery={searchQuery} handleRecipeItemClick={handleRecipeItemAdd}/>
    </div>
}