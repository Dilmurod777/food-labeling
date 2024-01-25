import {RecipeItem} from "@/app/lib/models";

interface Props {
    items: RecipeItem[]
}

export default function RecipeItems({items}: Props) {
    return <table className={"w-full flex-grow"}>
        <thead>
        <tr className={"text-left border-b-[1px] border-secondary-gray *:text-sm *:text-secondary-gray *:py-1 *:px-2"}>
            <th className={""}>
                Ingredient
            </th>
            <th className={"w-[10%]"}>
                Quantity
            </th>
            <th className={"w-[15%]"}>
                Unit
            </th>
            <th className={"w-[10%]"}>
                Waste %
            </th>
            <th className={"w-[10%]"}>
                Grams
            </th>
            <th className={"w-[5%]"}></th>
        </tr>
        </thead>
        <tbody>
        {items.map((item, i) => <tr
            key={`recipe-items-${i}`}
            className={"text-left border-b-[1px] border-secondary-gray *:text-sm *:text-secondary-gray *:py-1 *:px-2"}
        >

        </tr>)}
        </tbody>
    </table>
}