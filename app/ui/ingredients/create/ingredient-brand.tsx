import InputWrapper from "@/app/ui/ingredients/input-wrapper";
import {Ingredient} from "@/app/lib/models";

interface Props{
    ingredient?: Ingredient;
}

export default function IngredientBrand({ingredient}: Props){
    return <InputWrapper title={"Ingredient Brand"} htmlFor={"ingredient-brand"}>
        <input
            type="text"
            className={"outline-0 w-1/2 text-xs rounded-md border-2 px-2 py-2 border-main-gray focus:border-main-blue"}
            placeholder={"Bob's Red Mill"}
            name={"ingredient-brand"}
            id={"ingredient-brand"}
            defaultValue={ingredient ? ingredient.brand : ""}
        />
    </InputWrapper>
}