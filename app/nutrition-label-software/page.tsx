"use client";

import {useState} from "react";
import TopHero from "@/app/ui/nutrition-label-software/top-hero";

export default function NutritionLabelSoftware() {
    const [tabIndex, setTabIndex] = useState(0)
    const tabs = ["All Features", "Nutrition Analysis", "Labeling", "Costing", "Ingredient Lists", "Recipe Management"];

    return <div className={"flex flex-col"}>
        <TopHero/>
    </div>
}