"use client";

import Header from "@/app/ui/header";
import TopHero from "@/app/ui/main/top-hero";
import TrustedBusinesses from "@/app/ui/main/trusted_businesses";
import FeaturesFirst from "@/app/ui/main/features-first";
import Divider from "@/app/ui/divider";
import NutritionAnalysisMadeEasy from "@/app/ui/main/nutrition-analysis-made-easy";
import NutritionLabelingThatIsFun from "@/app/ui/main/nutrition-labeling-that-is-fun";
import RecipeCostingToMakeDecisions from "@/app/ui/main/recipe-costing-to-make-decisions";
import FeaturesSecond from "@/app/ui/main/features-second";
import CustomerServiceToDieFor from "@/app/ui/main/customer-service-to-die-for";
import FoodEntrepreneurs from "@/app/ui/main/food-entrepreneurs";
import CaseStudies from "@/app/ui/main/case-studies";
import Testimonials from "@/app/ui/main/testimonials";
import FAQ from "@/app/ui/main/faq";
import SignUpForFree from "@/app/ui/main/signup-for-free";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopHero />
      {/*<TrustedBusinesses/>*/}
      <Divider
        margin={1.5}
        marginUnits={"rem"}
        height={2}
        heightUnits={"px"}
        color={"#f2f7fb"}
      />
      <FeaturesFirst />
      <NutritionAnalysisMadeEasy />
      <NutritionLabelingThatIsFun />
      <RecipeCostingToMakeDecisions />
      <FeaturesSecond />
      <CustomerServiceToDieFor />
      {/*<FoodEntrepreneurs/>*/}
      {/*<CaseStudies/>*/}
      {/*<Testimonials/>*/}
      <FAQ />
      <SignUpForFree />
    </div>
  );
}
