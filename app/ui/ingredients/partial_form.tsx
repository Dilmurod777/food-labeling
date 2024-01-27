"use client";

import FormButton from "@/app/ui/auth_button";
import {Ingredient, User} from "@/app/lib/models";
import {useFormState} from "react-dom";
import {update} from "@/app/lib/actions-ingredients";
import {useRouter} from "next/navigation";

interface Props {
    ingredient: Ingredient,
    user: User | undefined
}

export default function PartialForm({ingredient, user}: Props) {
    const [_, dispatch] = useFormState(update, undefined);
    const router = useRouter();

    return <form action={dispatch} className={"flex flex-col gap-4 items-start flex-grow"}>
        <input type="hidden" name={"ingredient-id"} value={ingredient.id}/>

        <p className={"text-xl font-bold text-black"}>Nutrition Facts Serving Size</p>

        <div className={"flex gap-8 items-center justify-between w-full"}>
            <label htmlFor="ingredient-serving-size" className={"text-lg text-black text-normal"}>Quantity</label>
            <input
                type="number"
                defaultValue={parseInt(ingredient.serving_size || "1")}
                name={"ingredient-serving-size"}
                id={"ingredient-serving-size"}
                className={"px-2 py-1 text-sm text-right border-main-gray border-2 rounded-md w-1/2"}
            />
        </div>

        <div className={"flex gap-8 items-center justify-between w-full"}>
            <label htmlFor="ingredient-serving-size-description" className={"text-lg text-black text-normal"}>Units</label>
            <select
                defaultValue={parseInt(ingredient.serving_size_description || "0")}
                name={"ingredient-serving-size-description"}
                id={"ingredient-serving-size-description"}
                className={"px-2 py-1 text-sm text-right border-main-gray border-2 rounded-md *:text-sm w-1/2"}
            >
                <option value={0}>100 grams</option>
                <option value={1}>1 tbsdds</option>
                <option value={2}>1 lb</option>
                <option value={3}>1 gram</option>
                <option value={4}>1 oz</option>
                <option value={5}>1 kg</option>
            </select>
        </div>

        <div className={"flex flex-col gap-1 *:text-sm text-black"}>
            <p>
                <span className={"font-bold"}>Brand: </span><span>{ingredient.brand}</span>
            </p>
            <p>
                <span className={"font-bold"}>DataSource: </span><span>{ingredient.data_source || "none specified"}</span>
            </p>
            <p>
                <span className={"font-bold"}>Ingredient list: </span><span>{ingredient.list_name || "none specified"}</span>
            </p>
        </div>

        <div className={"flex flex-col gap-1 items-start *:w-full"}>
            {user && user.id == ingredient.user_id && <FormButton text={"Update Ingredient"} loading_text={"Updating..."}/>}
            <div
                onClick={() => router.push("/dashboard/inventory")}
                className={"bg-main-blue rounded-md py-2 px-6 text-white cursor-pointer hover:bg-hover-main-blue"}
            >
                Show all ingredients
            </div>
        </div>
    </form>
}