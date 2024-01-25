"use client";

import React, {Suspense} from "react";
import {usePathname, useRouter} from "next/navigation";
import Loading from "@/app/ui/loading";

export default function RootLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter();
    const tabs: { [key: string]: string } = {
        "Recipe Dashboard": "/dashboard/recipes",
        "Inventory Dashboard": "/dashboard/inventory"
    }

    return <div className={"flex flex-col w-full px-12 h-full my-6 mx-auto"}>
        <div className={"flex items-center h-[45px] border-b-[1px] border-b-[#dbdbdb] mb-2"}>
            {Object.keys(tabs).map((tab, ti) => {
                const isActive = pathname == tabs[tab];
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
                    onClick={() => router.push(tabs[tab])}
                >
                    {tab}
                </div>
            })}
        </div>

        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>
    </div>
}