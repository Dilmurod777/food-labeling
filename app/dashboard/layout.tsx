"use client";

import React, { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/ui/loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const tabs: { [key: string]: string } = {
    "Product Dashboard": "/dashboard/products",
  };

  return (
    <div className={"mx-auto flex h-full w-full flex-col px-12 py-6"}>
      <div
        className={
          "mb-2 flex h-[45px] items-center border-b-[1px] border-b-[#dbdbdb]"
        }
      >
        {Object.keys(tabs).map((tab, ti) => {
          const isActive = pathname == tabs[tab];
          return (
            <div
              key={`dashboard-tab-${ti}`}
              className={`text-normal relative mt-[10px] cursor-pointer px-6 py-2 text-sm text-black ${isActive && "text-main-orange after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:bg-[#fafafa] after:content-['']"}`}
              style={{
                borderTop: `${isActive ? 1 : 0}px solid #dbdbdb`,
                borderLeft: `${isActive ? 1 : 0}px solid #dbdbdb`,
                borderRight: `${isActive ? 1 : 0}px solid #dbdbdb`,
                borderBottom: `${isActive ? 3 : 0}px solid #fafafa`,
                borderRadius: "4px 4px 0 0",
              }}
              onClick={() => router.push(tabs[tab])}
            >
              {tab}
            </div>
          );
        })}
      </div>

      <div className={"flex h-full w-full flex-grow"}>
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
