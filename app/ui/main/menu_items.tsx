"use client";

import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface MenuItem {
  text: string;
  url: string;
  enabled?: boolean;
  rightIcon?: ReactNode;
  subItems?: MenuSubItem[];
}

interface MenuSubItem {
  mainText: string;
  secondaryText?: string;
  url: string;
}

const items: MenuItem[] = [
  {
    text: "Products",
    url: "#",
    enabled: true,
    rightIcon: <IoIosArrowDown />,
    subItems: [
      {
        mainText: "Label Maker",
        secondaryText: "FDA and CFIA compliant nutrition labels.",
        url: "/dashboard",
      },
      // {
      //   mainText: "OCR Label Maker",
      //   secondaryText: "Upload your label and customize it further.",
      //   url: "/ocr-label-maker",
      // },
    ],
  },
];

export default function MenuItems() {
  const [activeMenuItemIndex, setActiveMenuItem] = useState(-1);

  return (
    <div className={"flex items-center gap-3 pt-3"}>
      {items.map((item, i) => (
        <div
          key={item.text.toLowerCase()}
          className={
            "group relative flex items-center rounded-md px-3 py-4 hover:bg-gray-50"
          }
          onMouseEnter={() => setActiveMenuItem(i)}
          onMouseLeave={() => setActiveMenuItem(-1)}
        >
          <Link href={item.url} className={"flex text-lg font-bold text-black"}>
            <span className={"group-hover:text-orange"}>{item.text}</span>
            {item.rightIcon && <span className={"ml-2"}>{item.rightIcon}</span>}
          </Link>

          {item.subItems && activeMenuItemIndex == i && (
            <div
              className={
                "absolute left-0 top-[100%] z-10 rounded-md border-[1px] border-main-gray bg-white"
              }
              style={{
                width: "275%",
                height: "fit-content",
                boxShadow: "0 8px 8px #0a0a0a1a",
              }}
            >
              {item.subItems.map((subItem, si) => (
                <Link
                  href={subItem.url}
                  key={`subItem-${si}`}
                  className={
                    "flex flex-col items-start gap-0 px-4 py-2 text-sm hover:bg-[#f2f7fb]"
                  }
                >
                  <span className={"font-bold text-main-orange"}>
                    {subItem.mainText}
                  </span>
                  {subItem.secondaryText && (
                    <span className={"text-[0.6rem] text-[#6c6f7c]"}>
                      {subItem.secondaryText}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
