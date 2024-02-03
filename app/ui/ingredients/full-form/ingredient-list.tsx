import InputWrapper from "@/app/ui/ingredients/input-wrapper";
import {Ingredient} from "@/app/lib/models";

interface Props {
    ingredient?: Ingredient;
}

export default function IngredientList({ingredient}: Props) {
    return <InputWrapper
        title={"Ingredient List"}
        htmlFor={"ingredient-list-name"}
        tooltip_enabled={true}
        tooltip_title={"Ingredient List (optional)"}
        tooltip_content={"The 'common name' of the ingredient, as you want it to show up on your ingredient list. Usually how it's listed on the product packaging under 'Ingredients'. For multi-ingredient items, list out all subingredients in parenthesis after the common name like 'Ingredient (subingredient 1, sub 2, etc.)'."}
    >
        <input
            type="text"
            className={"outline-0 w-1/2 text-xs rounded-md border-2 px-2 py-2 border-main-gray focus:border-main-blue"}
            placeholder={"Rice Flour (Brown Rice, White Rice)"}
            name={"ingredient-list-name"}
            id={"ingredient-list-name"}
            defaultValue={ingredient ? ingredient.list_name : ""}
        />
    </InputWrapper>
}