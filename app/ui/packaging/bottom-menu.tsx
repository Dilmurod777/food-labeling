import { ReactNode, useEffect, useState } from "react";
import { PiCursorFill } from "react-icons/pi";
import { FaHandPaper } from "react-icons/fa";
import { LuSendToBack } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaFileExport } from "react-icons/fa6";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { AnimationKeyMap, Model, Tools } from "@/app/lib/3d";
import { useThree } from "@react-three/fiber";

interface MenuItem {
  type: "block" | "divider" | "slider";
  icon?: ReactNode;
  text?: Tools;
  hotkeys?: string[];
  showTooltip?: boolean;
}

interface Props {
  currentTool: string;
  updateTool: (t: Tools) => void;
  step: number;
  totalSteps: number;
  updateStep: (s: number) => void;
  currentModel: Model | null;
}

export default function BottomMenu({
  currentTool,
  updateTool,
  step,
  totalSteps,
  updateStep,
  currentModel,
}: Props) {
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
    { type: "divider" },
    {
      type: "block",
      icon: <MdOutlineFileUpload />,
      text: Tools.UploadImage,
      hotkeys: ["u"],
      showTooltip: true,
    },
    // {
    //   type: "block",
    //   icon: <LuTimerReset />,
    //   text: Tools.ResetView,
    //   hotkeys: ["r"],
    //   showTooltip: true,
    // },
    { type: "divider" },
    {
      type: "block",
      icon: <FaFileExport />,
      text: Tools.ExportRender,
      hotkeys: ["e"],
      showTooltip: true,
    },
    { type: "divider" },
    {
      type: "slider",
      text: Tools.AnimationSlider,
    },
  ];
  const otherKeymaps: KeyboardControlsEntry[] = [];
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
    } else if (item.type == "slider" && currentModel?.animatable) {
      return (
        <div
          className="relative flex h-full items-center"
          key={`3d-menu-item-${index}`}
        >
          <input
            id="labels-range-input"
            type="range"
            value={step}
            min="0"
            max={totalSteps}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-main-gray accent-main-orange"
            onChange={(e) => updateStep(e.target.valueAsNumber)}
          />
        </div>
      );
    } else if (item.type == "block") {
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
    } else {
      return null;
    }
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
          .map((item) => ({ name: item.text || "", keys: item.hotkeys || [] }))
          .concat(otherKeymaps)}
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
