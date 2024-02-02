import {FaSearch} from "react-icons/fa";
import {FaSliders} from "react-icons/fa6";
import SearchbarResults from "@/app/ui/recipes/recipe-page/searchbar-results";
import {useRef, useState} from "react";
import {useDebouncedCallback} from 'use-debounce';
import {Ingredient, Recipe, RecipeItem} from "@/app/lib/models";

interface Props {
    recipe: Recipe;
    updateRecipe: (data: { [key: string]: string | number }) => void;
}

export default function SearchBar({recipe, updateRecipe}: Props) {
    const [items, setItems] = useState<RecipeItem[]>(JSON.parse(recipe.recipe_items || '[]'))
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null)

    const handleSearch = useDebouncedCallback((term: string) => {
        setSearchQuery(term)
    }, 300);

    const handleRecipeItemAdd = (ingredient: Ingredient) => {
        const index = items.findIndex(item => item.ingredient_id == ingredient.id);
        let newRecipeItems: RecipeItem[];

        if (index == -1) {
            newRecipeItems = [
                ...items,
                {
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
            newRecipeItems = [...items]
            newRecipeItems[index].quantity += 1;
        }


        updateRecipe({
            recipe_items: JSON.stringify(newRecipeItems)
        });
        setItems(newRecipeItems);
        setSearchQuery("");
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
    }

    return <div className={"relative text-main-gray focus-within:text-main-orange w-full"}>
        <input
            ref={searchInputRef}
            type="text"
            className={"w-full py-2 pl-10 pr-16 rounded-3xl border-main-gray outline-main-orange border-2 text-sm text-secondary-gray"}
            name={"search"}
            placeholder={"Search an ingredient to add to your recipe"}
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchQuery}
        />
        <FaSearch className={"text-lg absolute left-3 top-1/2 -translate-y-1/2"}/>

        <div
            className={"w-12 flex items-center justify-center absolute top-0 bottom-0 right-0 rounded-tr-3xl rounded-br-3xl bg-main-orange hover:bg-hover-main-orange cursor-pointer"}
        >
            <FaSliders className={'text-white text-lg'}/>
        </div>

        <SearchbarResults searchQuery={searchQuery} handleRecipeItemClick={handleRecipeItemAdd}/>
    </div>
}