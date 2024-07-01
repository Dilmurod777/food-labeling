import { BsLayoutWtf } from "react-icons/bs";
import { PiShapesFill } from "react-icons/pi";
import { GiCubes } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";
import { ReactNode, useEffect, useState } from "react";
import {
  Model,
  DefaultModelItems,
  ModelType,
  RandomColors,
} from "@/app/lib/3d";
import { useGLTF } from "@react-three/drei";
import Image from "next/image";

interface MenuItem {
  type: "block" | "divider";
  icon?: ReactNode;
  text?: string;
  items?: Model[];
}

interface Props {
  addModel: (m: Model) => void;
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
      items: [...DefaultModelItems],
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
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-gray p-1.5 pb-0.5 ${activeMenuItemIndex == index ? "bg-hover-main text-white" : "bg-white text-main hover:bg-main hover:text-white"}`}
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
        <div className={"flex w-28 flex-col gap-2"}>
          {activeMenuItem.items.map((item, i) => (
            <div
              key={`3d-menu-subItem-${i}`}
              className={
                "group relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-md border border-main-gray text-center text-xs capitalize text-white hover:bg-main hover:text-white"
              }
              style={{
                backgroundColor: RandomColors[i % RandomColors.length],
              }}
              onClick={() => addModel(item)}
            >
              <div
                className={
                  "z-5 absolute bottom-0 left-0 right-0 top-0 bg-black/40"
                }
              />
              {item.imgPath ? (
                <div className={"relative z-0 h-20 w-20"}>
                  <span
                    className={
                      "absolute -bottom-3 left-0 z-20 w-full text-center text-xs"
                    }
                  >
                    {item.text}
                  </span>
                  <Image
                    className={"transition-all group-hover:scale-110"}
                    src={`/preview/${item.imgPath}`}
                    alt={item.text}
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              ) : (
                <span>{item.text}</span>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={
        "absolute left-5 top-5 flex min-h-[50%] cursor-default gap-2 rounded-md border border-main bg-white p-2"
      }
    >
      <div className={"flex flex-col gap-2"}>
        {menuItems.map(renderMenuItem)}
      </div>
      {renderContent()}
    </div>
  );
}
