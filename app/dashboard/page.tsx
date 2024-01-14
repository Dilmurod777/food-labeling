"use client";

import {useEffect, useState} from "react";
import RecipeTab from "@/app/ui/dashboard/recipe_tab";
import InventoryTab from "@/app/ui/dashboard/inventory_tab";
import {useSearchParams} from "next/navigation";

export default function Dashboard() {
    const params = useSearchParams()
    const paramTabIndex = params.get("tab")
    const [tabIndex, setTabIndex] = useState(parseInt(paramTabIndex || '0'))
    const tabs = ["Recipe Dashboard", "Inventory Dashboard"]

    useEffect(() => {
        setTabIndex(parseInt(paramTabIndex || '0'))
    }, [paramTabIndex])

    return <div className={"flex flex-col w-[75%] h-full my-12 mx-auto"}>
        <div className={"flex items-center h-[45px] border-b-[1px] border-b-[#dbdbdb] mb-8"}>
            {tabs.map((tab, ti) => {
                const isActive = ti == tabIndex;
                return <div
                    key={`dashboard-tab-${ti}`}
                    className={"text-sm text-normal text-black py-2 px-6 cursor-pointer mt-[10px]"}
                    style={{
                        borderTop: `${isActive ? 1 : 0}px solid #dbdbdb`,
                        borderLeft: `${isActive ? 1 : 0}px solid #dbdbdb`,
                        borderRight: `${isActive ? 1 : 0}px solid #dbdbdb`,
                        borderBottom: `${isActive ? 3 : 0}px solid #fff`,
                        borderRadius: "4px 4px 0 0",
                        color: isActive ? "#408abf" : "#000"
                    }}
                    onClick={() => setTabIndex(ti)}
                >
                    {tab}
                </div>
            })}
        </div>

        <div className={"h-full py-6"}>
            {tabIndex == 0 && <RecipeTab/>}
            {tabIndex == 1 && <InventoryTab/>}
        </div>
    </div>
}