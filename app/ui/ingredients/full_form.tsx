"use client";

import IngredientType from "@/app/ui/ingredients/full-form/ingredient-type";
import IngredientName from "@/app/ui/ingredients/full-form/ingredient-name";
import IngredientBrand from "@/app/ui/ingredients/full-form/ingredient-brand";
import IngredientList from "@/app/ui/ingredients/full-form/ingredient-list";
import IngredientDataSource from "@/app/ui/ingredients/full-form/ingredient-data-source";
import IngredientVisibility from "@/app/ui/ingredients/full-form/ingredient-visibility";
import IngredientServingSize from "@/app/ui/ingredients/full-form/ingredient-serving-size";
import IngredientNutrients from "@/app/ui/ingredients/full-form/ingredient-nutrients";
import IngredientVitaminsMinerals from "@/app/ui/ingredients/full-form/ingredient-vitamins-minerals";
import IngredientOptional from "@/app/ui/ingredients/full-form/ingredient-optional";
import FormButton from "@/app/ui/auth_button";
import {useFormState} from "react-dom";
import {update} from "@/app/lib/actions-ingredients";
import {Ingredient} from "@/app/lib/models";

interface Props {
    ingredient?: Ingredient;
}

export default function FullForm({ingredient}: Props) {
    const [_, dispatch] = useFormState(update, undefined);

    return <form className={"flex flex-col gap-2 items-start"} action={dispatch}>
        {ingredient && <input type="hidden" name={"ingredient-id"} value={ingredient.id}/>}
        <IngredientType ingredient={ingredient}/>
        <IngredientName ingredient={ingredient}/>
        <IngredientBrand ingredient={ingredient}/>

        <div className={"w-full hidden peer peer-has-[.ingredient-type-0:checked]:flex flex-col gap-2 items-start"}>
            <IngredientList ingredient={ingredient}/>
            <IngredientDataSource ingredient={ingredient}/>
            <IngredientVisibility ingredient={ingredient}/>
            <IngredientServingSize ingredient={ingredient}/>
            <IngredientNutrients ingredient={ingredient}/>
            <IngredientVitaminsMinerals ingredient={ingredient}/>

            <FormButton
                text={"Update Ingredient"}
                classes={"flex items-center justify-center gap-2 py-2 px-2 text-white text-xs font-thin bg-main-green hover:bg-hover-main-green rounded-md mt-4"}
            />

            <IngredientOptional ingredient={ingredient}/>
        </div>

        <FormButton
            text={"Update Ingredient"}
            classes={"flex items-center justify-center gap-2 py-2 px-2 text-white text-xs font-thin bg-main-green hover:bg-hover-main-green rounded-md mt-4"}
        />
    </form>
}