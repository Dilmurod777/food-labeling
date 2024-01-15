"use client";

import {useState} from "react";
import TopHero from "@/app/ui/nutrition-label-software/top-hero";
import AllFeatures from "@/app/ui/nutrition-label-software/tab_content/all_features";
import Tabs from "@/app/ui/nutrition-label-software/tabs";

export default function NutritionLabelSoftware() {
    const [tabIndex, setTabIndex] = useState(0)
    const tabs = {
        "All Features": <AllFeatures/>,
        "Nutrition Analysis": <div></div>,
        "Labeling": <div></div>,
        "Costing": <div></div>,
        "Ingredient Lists": <div></div>,
        "Recipe Management": <div></div>,
    };

    return <div className={"flex flex-col"}>
        <TopHero/>
        <Tabs
            activeTabIndex={tabIndex}
            tabs={Object.keys(tabs)}
            onTabClick={(i) => setTabIndex(i)}
        />
    </div>
}