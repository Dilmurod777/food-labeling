import {useState} from "react";
import {Recipe, RecipeItem, Tag, User} from "@/app/lib/models";
import RecipePackaging from "@/app/ui/recipes/recipe-page/recipe-packaging";
import RecipeAdvanced from "@/app/ui/recipes/recipe-page/recipe-advanced";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: { [key: string]: string | number | RecipeItem[] | Tag[] }) => void
}

export default function RecipeSettings({recipe, updateRecipe}: Props) {
    const [tabIndex, setTabIndex] = useState(0);
    const tabs = ["Packaging", "Advanced"];

    return <div className={"flex flex-col w-full h-full mx-auto"}>
        <div className={"flex justify-between items-center h-[45px] border-b-[1px] border-b-[#dbdbdb] mb-8"}>
            <div className={"flex items-center"}>
                {tabs.map((tab, ti) => {
                    const isActive = ti == tabIndex;
                    return <div
                        key={`dashboard-advanced-tab-${ti}`}
                        className={"text-sm text-normal text-black py-2 px-6 cursor-pointer mt-[10px]"}
                        style={{
                            borderTop: `${isActive ? 1 : 0}px solid #dbdbdb`,
                            borderLeft: `${isActive ? 1 : 0}px solid #dbdbdb`,
                            borderRight: `${isActive ? 1 : 0}px solid #dbdbdb`,
                            borderBottom: `${isActive ? 3 : 0}px solid #fff`,
                            borderRadius: "4px 4px 0 0",
                            color: isActive ? "#408abf" : "#000"
                        }}
                        onClick={() => {
                            setTabIndex(ti);
                        }}
                    >
                        {tab}
                    </div>
                })}
            </div>
        </div>

        {tabIndex == 0 && <RecipePackaging recipe={recipe} updateRecipe={updateRecipe}/>}
        {tabIndex == 1 && <RecipeAdvanced recipe={recipe} updateRecipe={updateRecipe}/>}
    </div>
}