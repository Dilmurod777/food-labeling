"use client";

import {IoIosArrowDown} from "react-icons/io";
import Link from "next/link";
import {ReactNode, useState} from "react";


interface MenuItem {
    text: string,
    url: string,
    enabled?: boolean,
    rightIcon?: ReactNode,
    subItems?: MenuSubItem[]
}

interface MenuSubItem {
    mainText: string,
    secondaryText?: string,
    url: string
}

const items: MenuItem[] = [
    {
        text: "Products",
        url: "#",
        enabled: true,
        rightIcon: <IoIosArrowDown/>,
        subItems: [
            {
                mainText: "Nutrition Label Software",
                secondaryText: "FDA and CFIA compliant nutrition labels.",
                url: "/nutrition-label-software",
            },
            {
                mainText: "Inventory",
                secondaryText: "Lot tracing, inventory management, and production planning.",
                url: "/inventory",
            }
        ]
    },
    {
        text: "Pricing",
        url: "/",
        rightIcon: <IoIosArrowDown/>,
    },
    {
        text: "FAQs",
        url: "/",
    },
    {
        text: "Blog",
        url: "/"
    }
]

export default function MenuItems() {
    const [activeMenuItemIndex, setActiveMenuItem] = useState(-1)

    return <div className={"flex gap-3 items-center pt-3"}>
        {items.map((item, i) => <div
            key={item.text.toLowerCase()}
            className={"relative flex items-center group hover:bg-gray-50 px-3 py-4 rounded-md"}
            onMouseEnter={() => setActiveMenuItem(i)}
            onMouseLeave={() => setActiveMenuItem(-1)}
        >
            <Link
                href={item.url}
                className={"flex text-black font-bold text-lg"}
            >
                <span className={"group-hover:text-orange"}>{item.text}</span>
                {item.rightIcon && <span className={"ml-2"}>{item.rightIcon}</span>}
            </Link>

            {item.subItems && activeMenuItemIndex == i && (<div
                className={"absolute top-[100%] left-0 bg-white border-[1px] border-main-gray rounded-md z-10"}
                style={{
                    width: "275%",
                    height: 'fit-content',
                    boxShadow: "0 8px 8px #0a0a0a1a"
                }}
            >
                {item.subItems.map((subItem, si) => <Link
                    href={subItem.url}
                    key={`subItem-${si}`}
                    className={"flex flex-col gap-0 items-start py-2 px-4 text-sm hover:bg-[#f2f7fb]"}
                >
                    <span className={"text-main-orange font-bold"}>{subItem.mainText}</span>
                    {subItem.secondaryText && <span className={"text-[#6c6f7c] text-[0.6rem]"}>{subItem.secondaryText}</span>}
                </Link>)}
            </div>)}
        </div>)}
    </div>
}