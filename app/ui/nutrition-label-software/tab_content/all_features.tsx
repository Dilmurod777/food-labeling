import NutritionAnalysisMadeEasy from "@/app/ui/nutrition-label-software/tab_content/all_features/nutrition-analysis-made-easy";
import NutritionLabelingThatIsFun from "@/app/ui/nutrition-label-software/tab_content/all_features/nutrition-labeling-that-is-fun";
import RecipeCostingToMakeDecisions from "@/app/ui/nutrition-label-software/tab_content/all_features/recipe-costing-to-make-decisions";
import CreateYourOwnFreeLabelToday from "@/app/ui/nutrition-label-software/tab_content/all_features/create-your-own-free-label-today";
import IngredientListsInSeconds from "@/app/ui/nutrition-label-software/tab_content/all_features/ingredient-lists-in-seconds";

export default function AllFeatures() {
    return <div className={"flex flex-col"}>
        <NutritionAnalysisMadeEasy/>
        <NutritionLabelingThatIsFun/>
        <RecipeCostingToMakeDecisions/>
        <CreateYourOwnFreeLabelToday/>
        <IngredientListsInSeconds/>
    </div>
}