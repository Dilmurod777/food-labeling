import AutomaticIngredientList from "@/app/ui/nutrition-label-software/tab_content/ingredient-list/automatic-ingredient-list";
import Divider from "@/app/ui/divider";
import CustomizableAsAlways from "@/app/ui/nutrition-label-software/tab_content/ingredient-list/customizable-as-always";

export default function IngredientList() {
    return <div className={"flex flex-col"}>
        <AutomaticIngredientList/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"}/>
        <CustomizableAsAlways/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"} margin={1.5} marginUnits={"rem"}/>
    </div>
}