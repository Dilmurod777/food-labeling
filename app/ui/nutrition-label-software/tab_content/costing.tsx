import Divider from "@/app/ui/divider";
import UnderstandYourCosts from "@/app/ui/nutrition-label-software/tab_content/costing/understand-your-costs";
import MakeBetterBusinessDecisions from "@/app/ui/nutrition-label-software/tab_content/costing/make-better-business-decisions";

export default function Costing() {
    return <div className={"flex flex-col"}>
        <UnderstandYourCosts/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"}/>
        <MakeBetterBusinessDecisions/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"} margin={1.5} marginUnits={"rem"}/>
    </div>
}