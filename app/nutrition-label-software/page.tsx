"use client";

import {ReactNode, useEffect, useState} from "react";
import TopHero from "@/app/ui/nutrition-label-software/top-hero";
import AllFeatures from "@/app/ui/nutrition-label-software/tab_content/all-features";
import Tabs from "@/app/ui/nutrition-label-software/tabs";
import Testimonials from "@/app/ui/main/testimonials";
import FAQ from "@/app/ui/main/faq";
import SimpleSoftwareForFoodBusinesses from "@/app/ui/nutrition-label-software/simple-software-for-food-businesses";
import {useSearchParams} from "next/navigation";
import NutritionAnalysis from "@/app/ui/nutrition-label-software/tab_content/nutrition-analysis";

import AllFeaturesFaq from "@/public/faq/all-features-faq.json"
import NutritionAnalysisFaq from "@/public/faq/nutrition-analysis-faq.json"
import LabelingFaq from "@/public/faq/labeling-faq.json"
import {FAQItem} from "@/app/lib/models";
import Labeling from "@/app/ui/nutrition-label-software/tab_content/labeling";

interface TabContent {
    page: ReactNode,
    mainText: string,
    secondaryText: string,
    faq?: FAQItem[]
}

export default function NutritionLabelSoftware() {
    const params = useSearchParams();
    const paramTabIndex = params.get("page");

    const [tabIndex, setTabIndex] = useState(parseInt(paramTabIndex || "0"))
    const tabs: { [key: string]: TabContent } = {
        "All Features": {
            page: <AllFeatures/>,
            mainText: "Nutrition Label Software",
            secondaryText: "With Foodplanet, you can use our nutrition labeling software to create nutrition labels for your products to comply with food regulations and grow your business." +
                "<br/></br>" +
                "Foodplanet&apos;s team of labeling experts can review your nutrition labels to ensure key components are correct.",
            faq: AllFeaturesFaq
        },
        "Nutrition Analysis": {
            page: <NutritionAnalysis/>,
            mainText: "Nutrition Analysis Software",
            secondaryText: "With the best nutrition analysis software, you can accurately break down the nutritional contents of the food you’re producing, and better understand it. Foodplanet's user-friendly software allows you to conveniently analyze recipes and increase transparency with customers.",
            faq: NutritionAnalysisFaq
        },
        "Labeling": {
            page: <Labeling/>,
            mainText: "Nutrition Label Templates",
            secondaryText: "Are you a food business owner in need of a high-quality nutrition label for your products? It’s simple and fast to create your very own custom nutrition label with Foodplanet’s nutrition label templates.",
            faq: LabelingFaq
        },
        "Costing": {
            page: <div>Costing</div>,
            mainText: "Ingredient Cost Calculator for Better Business Decisions",
            secondaryText: "With Foodplanet’s ingredient cost calculator, you can get a detailed breakdown that provides you with the cost of food products by batch and by package. This allows you to come up with an effective pricing strategy for your food products and optimize profits for your business."
        },
        "Ingredient Lists": {
            page: <div>Ingredient Lists</div>,
            mainText: "Customizable Ingredients List Templates",
            secondaryText: "With Foodplanet’s free ingredients list template, you can quickly create your own custom ingredients list and automatically generate nutrition labels that follow FDA guidelines."
        },
        "Recipe Management": {
            page: <div>Recipe Management</div>,
            mainText: "Cloud-Based Recipe Management System",
            secondaryText: "With Foodplanet’s secure cloud-based recipe management software, you can be completely flexible in how you manage recipes and ingredients. Access recipes from any device, at any time, from any location."
        },
    };

    useEffect(() => {
        setTabIndex(parseInt(paramTabIndex || '0'))
    }, [paramTabIndex])

    const tabContent = tabs[Object.keys(tabs)[tabIndex]]
    return <div className={"flex flex-col"}>
        <TopHero mainText={tabContent.mainText} secondaryText={tabContent.secondaryText}/>
        <Tabs
            activeTabIndex={tabIndex}
            tabs={Object.keys(tabs)}
            onTabClick={(i) => setTabIndex(i)}
        />
        {Object.keys(tabs).map((tab, i) => <div
            key={`tab-content-${i}`}
            className={`${i == tabIndex ? 'block' : 'hidden'} w-full h-full`}
        >
            {tabContent.page}
        </div>)}

        <FAQ items={tabContent.faq}/>
        <Testimonials/>
        <SimpleSoftwareForFoodBusinesses/>
    </div>
}