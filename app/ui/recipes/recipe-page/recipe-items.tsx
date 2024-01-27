import {Ingredient, RecipeItem} from "@/app/lib/models";
import Link from "next/link";
import {MdDelete} from "react-icons/md";

interface Props {
    items: RecipeItem[],
    removeRecipeItem: (id: string) => void
}

export default function RecipeItems({items, removeRecipeItem}: Props) {
    return <table className={"w-full flex-grow"}>
        <thead>
        <tr className={"text-left border-b-[1px] border-secondary-gray *:text-sm *:text-secondary-gray *:py-1 *:px-2"}>
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
            className={"text-left border-b-[1px] border-secondary-gray *:text-sm *:text-secondary-gray *:py-1 *:px-2 even:bg-main-gray"}
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
                {item.quantity}
            </td>
            <td>
                {item.unit}
            </td>
            <td>
                {item.waste}
            </td>
            <td>
                0
            </td>
            <td>
                <MdDelete
                    className={"text-lg text-red-500 cursor-pointer"}
                    onClick={() => removeRecipeItem(item.id)}
                />
            </td>
        </tr>)}
        </tbody>
    </table>
}