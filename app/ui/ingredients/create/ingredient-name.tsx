import InputWrapper from "@/app/ui/ingredients/input-wrapper";
import {Ingredient} from "@/app/lib/models";

interface Props{
    ingredient?: Ingredient;
}

export default async function IngredientName({ingredient}: Props){
    return <InputWrapper title={"Ingredient Name"} htmlFor={"ingredient-name"} required>
        <input
            type="text"
            className={"outline-0 w-1/2 text-xs rounded-md border-2 px-2 py-2 border-main-gray focus:border-main-blue"}
            placeholder={"Bob's Red Mill Organic White Rice Flour"}
            name={"ingredient-name"}
            id={"ingredient-name"}
            required
            defaultValue={ingredient ? ingredient.name : ""}
        />
    </InputWrapper>
}