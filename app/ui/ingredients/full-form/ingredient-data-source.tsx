import InputWrapper from "@/app/ui/ingredients/input-wrapper";
import {Ingredient} from "@/app/lib/models";

interface Props {
    ingredient?: Ingredient;
}

export default function IngredientDataSource({ingredient}: Props) {
    return <InputWrapper title={"Data Source (e.g. URL, if applicable)"} htmlFor={"ingredient-data-source"} required>
        <input
            type="text"
            className={"outline-0 w-1/2 text-xs rounded-md border-2 px-2 py-2 border-main-gray focus:border-main-blue"}
            placeholder={"http://www.bobsredmill.com/organic-white-rice-flour.html"}
            name={"ingredient-data-source"}
            id={"ingredient-data-source"}
            defaultValue={ingredient ? ingredient.data_source : ""}
        />
    </InputWrapper>
}