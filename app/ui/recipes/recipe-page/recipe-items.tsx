import {Recipe, RecipeItem, Tag} from "@/app/lib/models";
import Link from "next/link";
import {MdDelete} from "react-icons/md";
import {useEffect, useState} from "react";
import {getTotalGrams} from "@/app/lib/utilities";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: { [key: string]: string | RecipeItem[] | Tag[] }) => void
}

export default function RecipeItems({recipe, updateRecipe}: Props) {
    const [items, setItems] = useState<RecipeItem[]>(JSON.parse(recipe.recipe_items || "[]"))

    useEffect(() => {
        if (recipe.recipe_items) {
            setItems(JSON.parse(recipe.recipe_items || "[]"))
        }
    }, [recipe.recipe_items]);

    const removeRecipeItem = (id: string) => {
        const newRecipeItems = items.filter(item => item.id != id);

        updateRecipe({
            ingredient_list: JSON.stringify((newRecipeItems.map(item => item.id))),
            recipe_items: newRecipeItems
        })

        console.log(`remove recipe item: ${id}`)
    }

    const updateItemsData = (param: string, value: string, index: number) => {
        const newRecipeItems = [...items]
        let newValue = parseFloat(value);
        if (newValue < 0) newValue = 0;

        if (param == "quantity") {
            newRecipeItems[index].quantity = newValue;
        }

        if (param == "waste") {
            newRecipeItems[index].waste = newValue;
        }

        updateRecipe({
            recipe_items: newRecipeItems
        })
    }

    return <table className={"w-full"}>
        <thead>
        <tr className={"text-left border-b-[1px] border-main-gray *:text-sm *:text-secondary-gray *:py-1 *:px-2"}>
            <th>
                Ingredient
            </th>
            <th style={{width: "10%"}}>
                Quantity
            </th>
            <th style={{width: "10%"}}>
                Unit
            </th>
            <th style={{width: "10%"}}>
                Waste %
            </th>
            <th style={{width: "10%"}}>
                Grams
            </th>
            <th style={{width: "10%"}}></th>
        </tr>
        </thead>
        <tbody>
        {items.map((item, i) => <tr
            key={`recipe-items-${i}`}
            className={"text-left border-b-[1px] border-main-gray *:text-sm *:text-secondary-gray *:py-1 *:px-2 even:bg-main-gray"}
        >
            <td>
                <Link
                    href={`/ingredients/${item.ingredient?.id}/view`}
                    className={"font-bold text-main-blue hover:text-hover-main-blue"}
                    target={"_blank"}
                >
                    {item.ingredient.name}
                </Link>
            </td>
            <td>
                <input
                    type="number"
                    min={0}
                    defaultValue={item.quantity}
                    className={"border-[1px] border-main-gray rounded-md px-2 py-1 w-full"}
                    onBlur={(e) => updateItemsData("quantity", e.target.value, i)}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            updateItemsData("quantity", e.currentTarget.value, i)
                        }
                    }}
                />
            </td>
            <td>
                1 kg
            </td>
            <td>
                <input
                    type="number"
                    min={0}
                    defaultValue={item.waste}
                    className={"border-[1px] border-main-gray rounded-md px-2 py-1 w-full"}
                    onBlur={(e) => updateItemsData("waste", e.target.value, i)}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            updateItemsData("waste", e.currentTarget.value, i)
                        }
                    }}
                />
            </td>
            <td>
                {getTotalGrams(item.quantity, 1000, item.waste, recipe)}
            </td>
            <td>
                <MdDelete
                    className={"text-lg text-red-500 cursor-pointer"}
                    onClick={() => removeRecipeItem(item.id)}
                />
            </td>
        </tr>)}
        </tbody>
        <tfoot>
        <tr className={"text-sm *:py-1 *:px-2"}>
            <td></td>
            <td></td>
            <td></td>
            <td className={"text-right"}>
                Total:
            </td>
            <td>{items.reduce((sum, item) => sum + getTotalGrams(item.quantity, 1000, item.waste, recipe), 0)}</td>
            <td></td>
        </tr>
        </tfoot>
    </table>
}