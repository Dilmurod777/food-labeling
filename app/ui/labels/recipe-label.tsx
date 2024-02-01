import {Recipe} from "@/app/lib/models";
import Link from "next/link";
import Divider from "@/app/ui/divider";
import {getDailyNutrients, getTotalNutrients} from "@/app/lib/utilities";

interface Props {
    recipe: Recipe,
}

export default function RecipeLabel({recipe}: Props) {
    return <div id={"recipe-label"} className={"w-fit"}>
        <div className={"w-[325px] h-full flex-grow border-[1px] border-black p-2"}>
            <p className={"text-3xl font-bold text-black h-[50px]"}>Nutrition Facts</p>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <p className={"text-sm font-thin text-black"}>{recipe.serving_per_package} serving per container</p>
            <div className={"flex justify-between items-center text-sm font-bold text-black"}>
                <p>Serving size</p>
                <p>({(recipe.net_weight / recipe.serving_per_package).toFixed(1)}g)</p>
            </div>
            <Divider height={10} heightUnits={"px"} color={"#000"} margin={8} marginUnits={"px"}/>
            <p className={"text-sm font-bold text-black"}>Amount Per Serving</p>
            <div className={"flex justify-between items-center text-lg font-bold text-black"}>
                <p>Calories</p>
                <p>{getTotalNutrients(recipe, "calories")}</p>
            </div>
            <Divider height={4} heightUnits={"px"} color={"#000"} margin={4} marginUnits={"px"}/>
            <p className={"text-xs font-bold text-black text-right"}>% Daily Value*</p>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p><strong>Total Fat</strong> ({getTotalNutrients(recipe, "fat")}g)</p>
                <strong>{getDailyNutrients(recipe, "fat")}%</strong>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center ml-4 text-xs"}>
                <p>Saturated Fat ({getTotalNutrients(recipe, "saturated-fat")}g)</p>
                <strong>{getDailyNutrients(recipe, "saturated-fat")}%</strong>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center ml-4 text-xs"}>
                <p>Trans Fat ({getTotalNutrients(recipe, "trans-fat")}g)</p>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p><strong>Cholesterol</strong> ({getTotalNutrients(recipe, "cholesterol")}mg)</p>
                <strong>{getDailyNutrients(recipe, "cholesterol")}%</strong>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p><strong>Sodium</strong> ({getTotalNutrients(recipe, "sodium")}mg)</p>
                <strong>{getDailyNutrients(recipe, "sodium")}%</strong>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p><strong>Total Carbohydrate</strong> ({getTotalNutrients(recipe, "carbohydrate")}g)</p>
                <strong>{getDailyNutrients(recipe, "carbohydrate")}%</strong>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center ml-4 text-xs"}>
                <p>Dietary Fiber ({getTotalNutrients(recipe, "dietary-fiber")}g)</p>
                <strong>{getDailyNutrients(recipe, "dietary-fiber")}%</strong>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center ml-4 text-xs"}>
                <p>Total Sugars ({getTotalNutrients(recipe, "sugar")}g)</p>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center ml-8 text-xs"}>
                <p>Includes {getTotalNutrients(recipe, "added-sugar")}g Added Sugars</p>
                <strong>{getDailyNutrients(recipe, "added-sugar")}%</strong>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p><strong>Protein</strong> ({getTotalNutrients(recipe, "protein")}g)</p>
            </div>
            <Divider height={10} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p>Vitamin D {getTotalNutrients(recipe, "vitamin-d")}mcg</p>
                <p>{getDailyNutrients(recipe, "vitamin-d")}%</p>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p>Calcium {getTotalNutrients(recipe, "calcium")}mg</p>
                <p>{getDailyNutrients(recipe, "calcium")}%</p>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p>Iron {getTotalNutrients(recipe, "iron")}mg</p>
                <p>{getDailyNutrients(recipe, "iron")}%</p>
            </div>
            <Divider height={1} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex justify-between items-center text-xs"}>
                <p>Potassium {getTotalNutrients(recipe, "potassium")}mg</p>
                <p>{getDailyNutrients(recipe, "potassium")}%</p>
            </div>
            <Divider height={4} heightUnits={"px"} color={"#000"} margin={2} marginUnits={"px"}/>
            <div className={"flex items-start justify-between gap-4 text-[10px]"}>
                <p className={"w-[10%]"}>*</p>
                <p className={"flex-grow"}>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
                    2,000
                    calories a day is used for general nutrition advice.</p>
            </div>
        </div>
    </div>
}