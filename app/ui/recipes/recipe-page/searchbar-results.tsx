import {FaPlus} from "react-icons/fa";
import {Ingredient} from "@/app/lib/models";
import {useEffect, useState} from "react";

interface Props {
    searchQuery: string,
    handleRecipeItemClick: (ingredient: Ingredient) => void;
}

export default function SearchbarResults({searchQuery, handleRecipeItemClick}: Props) {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (searchQuery.trim() != "") {
            console.log("searchQuery", searchQuery);
            fetch(`/api/ingredients?query=${searchQuery}`)
                .then(result => result.json())
                .then(data => {
                    setIngredients(data);
                })
        }else{
            setIngredients([])
        }
    }, [searchQuery]);

    if (!ingredients || !ingredients.length) return <div/>

    return <div
        className={'flex-col absolute top-12 rounded-md h-full max-h-[300px] w-full bg-white border-2'}
        style={{
            display: ingredients.length == 0 ? "none" : "flex"
        }}
    >
        {ingredients.map((item, i) => <div
            key={`search-ingredient-${i}`}
            className={"w-full flex items-center justify-between even:bg-secondary-gray px-2 py-2 text-sm font-bold text-secondary-gray"}
        >
            <span>{item.name}</span>

            <div className={"flex gap-2 items-center"}>
                <div
                    className={"flex gap-2 items-center px-2 py-1 text-xs text-white rounded-md bg-main-green hover:bg-hover-main-green cursor-pointer"}
                    onClick={() => handleRecipeItemClick(item)}
                >
                    <FaPlus/>
                    <span>Add to Recipe</span>
                </div>
            </div>
        </div>)}
    </div>
}