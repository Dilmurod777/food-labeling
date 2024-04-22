import { BsLayoutWtf } from "react-icons/bs";
import { PiShapesFill } from "react-icons/pi";
import { GiCubes } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";
import { ReactNode, useState } from "react";

interface MenuItem {
  type: "block" | "divider";
  icon?: ReactNode;
  text?: string;
  items?: MenuSubItem[];
}

interface MenuSubItem {
  imgPath: string;
  modelPath: string;
}

export default function Menu() {
  const menuItems: MenuItem[] = [
    {
      type: "block",
      icon: <BsLayoutWtf />,
      text: "Layouts",
      items: [],
    },
    {
      type: "block",
      icon: <GiCubes />,
      text: "Models",
      items: [],
    },
    {
      type: "block",
      icon: <PiShapesFill />,
      text: "Assets",
      items: [],
    },
    { type: "divider" },
    {
      type: "block",
      icon: <PiShapesFill />,
      text: "World",
      items: [],
    },
    {
      type: "block",
      icon: <FaLightbulb />,
      text: "Light",
      items: [],
    },
  ];
  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState(-1);

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.type == "divider") {
      return (
        <div
          className={"h-1 w-full rounded-md bg-main-gray"}
          key={`3d-menu-item-${index}`}
        ></div>
      );
    }

    return (
      <div
        key={`3d-menu-item-${index}`}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-gray p-2 pb-1 ${activeMenuItemIndex == index ? "bg-hover-main-orange text-white" : "bg-white text-main-orange hover:bg-main-orange hover:text-white"}`}
        onClick={() => setActiveMenuItemIndex(index)}
      >
        <span className={"text-3xl/none"}>{item.icon}</span>
        <span className={"font-medium/none text-xs"}>{item.text}</span>
      </div>
    );
  };

  const renderContent = () => {
    const activeMenuItem = menuItems[activeMenuItemIndex];
    if (
      activeMenuItemIndex < 0 ||
      !activeMenuItem.items ||
      activeMenuItem.items.length == 0
    )
      return;

    return (
      <>
        <div className={"h-auto w-0.5 bg-main-gray"}></div>
        <div className={"flex flex-col gap-2"}>
          {activeMenuItem.items.map((item, i) => (
            <div
              key={`3d-menu-subItem-${i}`}
              className={
                "cursor-pointer rounded-md border border-main-gray p-2 text-3xl text-black hover:bg-main-orange hover:text-white"
              }
            >
              {item.imgPath}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={
        "absolute left-10 top-10 flex min-h-[50%] gap-4 rounded-md border border-main-orange bg-white p-4"
      }
    >
      <div className={"flex flex-col gap-2"}>
        {menuItems.map(renderMenuItem)}
      </div>
      {renderContent()}
    </div>
  );
}
