import FlexibleDatabaseOfIngredients from "@/app/ui/nutrition-label-software/tab_content/nutrition-analysis/flexible-database-of-ingredients";
import IntuitiveInterfaceToEditRecipes from "@/app/ui/nutrition-label-software/tab_content/nutrition-analysis/intuitive-interface-to-edit-recipes";
import Divider from "@/app/ui/divider";
import AccelerateWithProFeatures from "@/app/ui/nutrition-label-software/tab_content/nutrition-analysis/accelerate-with-pro-features";

export default function NutritionAnalysis() {
  return (
    <div className={"flex flex-col"}>
      <FlexibleDatabaseOfIngredients />
      <Divider height={1} heightUnits={"px"} color={"#e7ecef"} />
      <IntuitiveInterfaceToEditRecipes />
      <Divider height={1} heightUnits={"px"} color={"#e7ecef"} />
      <AccelerateWithProFeatures />
      <Divider
        height={1}
        heightUnits={"px"}
        color={"#e7ecef"}
        margin={1.5}
        marginUnits={"rem"}
      />
    </div>
  );
}
