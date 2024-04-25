import { BsLayoutWtf } from "react-icons/bs";
import { PiShapesFill } from "react-icons/pi";
import { GiCubes } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";
import { ReactNode, useEffect, useState } from "react";
import { ModelType, RandomColors } from "@/app/lib/3d";
import { useGLTF } from "@react-three/drei";

interface MenuItem {
  type: "block" | "divider";
  icon?: ReactNode;
  text?: string;
  items?: MenuSubItem[];
}

interface MenuSubItem {
  imgPath: string;
  placeholder: string;
  modelPath: string;
  type: ModelType;
}

interface Props {
  addModel: (t: ModelType, p: string) => void;
}

export default function SideMenu({ addModel }: Props) {
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
      items: [
        {
          type: ModelType.Generated,
          modelPath: "default-package",
          placeholder: "Default Package",
          imgPath: "",
        },
        {
          type: ModelType.Loaded,
          modelPath: "chips-package.glb",
          placeholder: "Chips Package",
          imgPath: "",
        },
      ],
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

  useEffect(() => {
    menuItems.forEach((item) => {
      item.items?.forEach((model) => {
        if (model.type == ModelType.Loaded) {
          useGLTF.preload(`/models/${model.modelPath}`);
        }
      });
    });
  }, []);

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.type == "divider") {
      return (
        <div
          className={"h-0.5 w-full rounded-md bg-main-gray"}
          key={`3d-menu-item-${index}`}
        ></div>
      );
    }

    return (
      <div
        key={`3d-menu-item-${index}`}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-gray p-1.5 pb-0.5 ${activeMenuItemIndex == index ? "bg-hover-main-orange text-white" : "bg-white text-main-orange hover:bg-main-orange hover:text-white"}`}
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
                "flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-md border border-main-gray p-2 text-xs lowercase text-white hover:bg-main-orange hover:text-white"
              }
              style={{
                backgroundColor: RandomColors[i % RandomColors.length],
              }}
              onClick={() => addModel(item.type, item.modelPath)}
            >
              {item.imgPath || item.placeholder}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={
        "absolute left-5 top-5 flex min-h-[50%] cursor-default gap-2 rounded-md border border-main-orange bg-white p-2"
      }
    >
      <div className={"flex flex-col gap-2"}>
        {menuItems.map(renderMenuItem)}
      </div>
      {renderContent()}
    </div>
  );
}
