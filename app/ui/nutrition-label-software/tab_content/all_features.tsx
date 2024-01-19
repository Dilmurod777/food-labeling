import NutritionAnalysisMadeEasy from "@/app/ui/nutrition-label-software/tab_content/all_features/nutrition-analysis-made-easy";
import NutritionLabelingThatIsFun from "@/app/ui/nutrition-label-software/tab_content/all_features/nutrition-labeling-that-is-fun";
import RecipeCostingToMakeDecisions from "@/app/ui/nutrition-label-software/tab_content/all_features/recipe-costing-to-make-decisions";
import CreateYourOwnFreeLabelToday from "@/app/ui/nutrition-label-software/tab_content/all_features/create-your-own-free-label-today";
import IngredientListsInSeconds from "@/app/ui/nutrition-label-software/tab_content/all_features/ingredient-lists-in-seconds";
import RecipeManagementInTheCloud from "@/app/ui/nutrition-label-software/tab_content/all_features/recipe-management-in-the-cloud";
import MainInventory from "@/app/ui/nutrition-label-software/tab_content/all_features/main-inventory";
import SignUpForFree from "@/app/ui/nutrition-label-software/tab_content/all_features/sign-up-for-free";
import CustomerServiceThatListens from "@/app/ui/nutrition-label-software/tab_content/all_features/customer-service-that-listens";

export default function AllFeatures() {
    return <div className={"flex flex-col"}>
        <NutritionAnalysisMadeEasy/>
        <NutritionLabelingThatIsFun/>
        <RecipeCostingToMakeDecisions/>
        <CreateYourOwnFreeLabelToday/>
        <IngredientListsInSeconds/>
        <RecipeManagementInTheCloud/>
        <MainInventory/>
        <SignUpForFree/>
        <CustomerServiceThatListens/>
    </div>
}