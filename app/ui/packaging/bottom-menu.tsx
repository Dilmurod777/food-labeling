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
  text?: string;
  hotkeys?: string[];
}

interface Props {
  currentTool: string;
  updateTool: (t: string) => void;
}

export default function BottomMenu({ currentTool, updateTool }: Props) {
  const menuItems: MenuItem[] = [
    {
      type: "block",
      icon: <PiCursorFill />,
      text: Tools.Select,
      hotkeys: ["v"],
    },
    {
      type: "block",
      icon: <FaHandPaper />,
      text: Tools.Hand,
      hotkeys: ["h"],
    },
    { type: "divider" },
    {
      type: "block",
      icon: <LuSendToBack />,
      text: Tools.Duplicate,
      hotkeys: ["d"],
    },
    {
      type: "block",
      icon: <MdDelete />,
      text: Tools.Delete,
      hotkeys: ["Delete"],
    },
    { type: "divider" },
    {
      type: "block",
      icon: <LuTimerReset />,
      text: Tools.ResetView,
      hotkeys: ["r"],
    },
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
    setActiveMenuItemIndex(index);
    updateTool(menuItems[index].text || Tools.Select);
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
      <div
        key={`3d-menu-item-${index}`}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-gray p-1 ${activeMenuItemIndex == index ? "bg-hover-main-orange text-white" : "bg-white text-main-orange hover:bg-main-orange hover:text-white"}`}
        onClick={() => menuItemHandle(index)}
      >
        <span className={"text-xl/none"}>{item.icon}</span>
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
