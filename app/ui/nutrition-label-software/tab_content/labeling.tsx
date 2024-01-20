import Divider from "@/app/ui/divider";
import SmartDefaults from "@/app/ui/nutrition-label-software/tab_content/labeling/smart-defaults";
import CustomizeForYourProduct from "@/app/ui/nutrition-label-software/tab_content/labeling/customize-for-your-product";

export default function Labeling() {
    return <div className={"flex flex-col"}>
        <SmartDefaults/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"}/>
        <CustomizeForYourProduct/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"} margin={1.5} marginUnits={"rem"}/>
    </div>
}