import { ReactNode, useEffect, useState } from "react";
import { PiCursorFill } from "react-icons/pi";
import { FaHandPaper } from "react-icons/fa";
import { LuSendToBack } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { KeyboardControls } from "@react-three/drei";
import { Tools } from "@/app/lib/3d";

interface MenuItem {
  type: "block" | "divider";
  icon?: ReactNode;
  text?: Tools;
  hotkeys?: string[];
  showTooltip?: boolean;
}

interface Props {
  currentTool: string;
  updateTool: (t: Tools) => void;
}

export default function BottomMenu({ currentTool, updateTool }: Props) {
  const menuItems: MenuItem[] = [
    {
      type: "block",
      icon: <PiCursorFill />,
      text: Tools.Select,
      hotkeys: ["v"],
      showTooltip: true,
    },
    {
      type: "block",
      icon: <FaHandPaper />,
      text: Tools.Hand,
      hotkeys: ["h"],
      showTooltip: true,
    },
    { type: "divider" },
    // {
    //   type: "block",
    //   icon: <LuSendToBack />,
    //   text: Tools.Duplicate,
    //   hotkeys: ["d"],
    //   showTooltip: true,
    // },
    {
      type: "block",
      icon: <MdDelete />,
      text: Tools.Delete,
      hotkeys: ["Delete"],
      showTooltip: true,
    },
    // { type: "divider" },
    // {
    //   type: "block",
    //   icon: <LuTimerReset />,
    //   text: Tools.ResetView,
    //   hotkeys: ["r"],
    //   showTooltip: true,
    // },
  ];
  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState(0);

  useEffect(() => {
    const items = menuItems
      .map((item, i) => ({ text: item.text, index: i }))
      .filter((item) => item.text == currentTool);

    if (items.length == 0) return;

    menuItemHandle(items[0].index);
  }, []);

  const menuItemHandle = (index: number) => {
    const currentTool = menuItems[index];

    if (index >= 0 && index <= 1) {
      setActiveMenuItemIndex(index);
    } else {
      setActiveMenuItemIndex(0);
    }

    updateTool(currentTool.text || Tools.Select);
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.type == "divider") {
      return (
        <div
          className={"h-6 w-0.5 rounded-md bg-main-gray"}
          key={`3d-menu-item-${index}`}
        ></div>
      );
    }

    return (
      <div key={`3d-menu-item-${index}`} className={"relative"}>
        <div
          className={`peer flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-gray p-1 ${activeMenuItemIndex == index ? "bg-hover-main-orange text-white" : "bg-white text-main-orange hover:bg-main-orange hover:text-white"}`}
          onClick={() => menuItemHandle(index)}
        >
          <span className={"text-xl/none"}>{item.icon}</span>
        </div>

        {item.showTooltip && (
          <div
            className={
              "absolute -left-7 -right-7 -top-9 z-10 overflow-visible rounded-md bg-secondary-gray p-1 text-center text-xs text-white opacity-0 transition-opacity peer-hover:opacity-100"
            }
          >
            {item.text}
            {/*{item.hotkeys && (*/}
            {/*  <span className={"text-sm capitalize text-main-gray"}>*/}
            {/*    {item.hotkeys[0]}*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
        )}
      </div>
    );
  };

  const keyboardOnChange = (name: string, pressed: boolean) => {
    if (!pressed) return;

    const items = menuItems
      .map((item, i) => ({ text: item.text, index: i }))
      .filter((item) => item.text == name);

    if (items.length == 0) return;
    menuItemHandle(items[0].index);
  };

  return (
    <div className={"cursor-default"}>
      <KeyboardControls
        map={menuItems
          .filter((item) => item.type == "block")
          .map((item) => ({ name: item.text || "", keys: item.hotkeys || [] }))}
        onChange={keyboardOnChange}
      >
        <div
          className={
            "absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 rounded-md border border-main-orange bg-white px-2 py-1"
          }
        >
          {menuItems.map(renderMenuItem)}
        </div>
      </KeyboardControls>
    </div>
  );
}
