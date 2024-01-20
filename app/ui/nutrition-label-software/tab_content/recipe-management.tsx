import NeverLoseARecipeOrIngredient from "@/app/ui/nutrition-label-software/tab_content/recipe-management/never-lose-a-recipe-or-ingredient";
import Divider from "@/app/ui/divider";
import TotalAccessForYou from "@/app/ui/nutrition-label-software/tab_content/recipe-management/total-access-for-you";

export default function RecipeManagement() {
    return <div className={"flex flex-col"}>
        <NeverLoseARecipeOrIngredient/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"}/>
        <TotalAccessForYou/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"} margin={1.5} marginUnits={"rem"}/>
    </div>
}