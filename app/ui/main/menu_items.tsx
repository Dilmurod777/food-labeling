import {IoIosArrowDown} from "react-icons/io";
import {IconType} from "react-icons";
import Link from "next/link";
import {ReactNode} from "react";


interface MenuItem {
    text: string,
    url: string,
    enabled?: boolean,
    rightIcon?: ReactNode
}

const items: MenuItem[] = [
    {
        text: "Products",
        url: "/",
        enabled: true,
        rightIcon: <IoIosArrowDown/>,
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
    return <div className={"flex gap-3 items-center pt-3"}>
        {items.map(item => <Link
            key={item.text.toLowerCase()}
            href={item.url}
            className={"group flex items-center h-full text-black font-bold text-sm hover:bg-gray-50 px-3 rounded-md"}
        >
            <span className={"group-hover:text-sky-500"}>{item.text}</span>
            {item.rightIcon && <span className={"ml-2"}>{item.rightIcon}</span>}
        </Link>)}
    </div>
}