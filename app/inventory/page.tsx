import TopHero from "@/app/ui/inventory/top-hero";
import EmailFreeCourse from "@/app/ui/inventory/email-free-course";
import Divider from "@/app/ui/divider";
import FoodManufacturers from "@/app/ui/inventory/food-manufacturers";
import Features from "@/app/ui/inventory/features";


export default function Inventory() {
    return <div className={"flex flex-col py-16"}>
        <TopHero/>
        <Divider height={1} heightUnits={"px"} color={"#e7ecef"}/>
        <EmailFreeCourse/>
        <FoodManufacturers/>
        <Features/>
    </div>
}