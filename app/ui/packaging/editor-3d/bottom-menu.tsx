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
import { MdFormatColorFill } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HslColorPicker } from "react-colorful";
import { GetHSV } from "@/app/lib/utilities";

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
  updateCurrentModel: (m: Model) => void;
  currentModel: Model;
  currentStep: number;
  updateCurrentStep: (step: number) => void;
  baseColor: number[];
  updateBaseColor: (c: number[]) => void;
}

export default function BottomMenu({
  currentTool,
  updateTool,
  currentModel,
  updateCurrentModel,
  currentStep,
  updateCurrentStep,
  baseColor,
  updateBaseColor,
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
    {
      type: "block",
      icon: <MdFormatColorFill />,
      text: Tools.ColorPalette,
      hotkeys: ["p"],
      showTooltip: false,
    },
    // {
    //   type: "block",
    //   icon: <LuSendToBack />,
    //   text: Tools.Duplicate,
    //   hotkeys: ["d"],
    //   showTooltip: true,
    // },
    // {
    //   type: "block",
    //   icon: <MdDelete />,
    //   text: Tools.Delete,
    //   hotkeys: ["Delete"],
    //   showTooltip: true,
    // },
    // { type: "divider" },
    // {
    //   type: "block",
    //   icon: <MdOutlineFileUpload />,
    //   text: Tools.UploadImage,
    //   hotkeys: ["u"],
    //   showTooltip: true,
    // },
    // {
    //   type: "block",
    //   icon: <LuTimerReset />,
    //   text: Tools.ResetView,
    //   hotkeys: ["r"],
    //   showTooltip: true,
    // },
    // { type: "divider" },
    // {
    //   type: "block",
    //   icon: <FaFileExport />,
    //   text: Tools.ExportRender,
    //   hotkeys: ["e"],
    //   showTooltip: true,
    // },
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
            value={currentStep}
            min="0"
            max={currentModel.totalSteps}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-main-gray accent-main-orange"
            onChange={(e) => updateCurrentStep(e.target.valueAsNumber)}
          />
        </div>
      );
    } else if (item.type == "block") {
      if (item.text == Tools.ColorPalette) {
        return (
          <div key={`3d-menu-item-${index}`} className={"relative"}>
            <PopoverTrigger
              asChild
              className={`peer flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-gray p-1 ${activeMenuItemIndex == index ? "bg-hover-main-orange text-white" : "bg-white text-main-orange hover:bg-main-orange hover:text-white"}`}
              onClick={() => menuItemHandle(index)}
            >
              <span className={"text-xl/none"}>{item.icon}</span>
            </PopoverTrigger>

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
    <div className={"relative cursor-default"}>
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
          <div className={"relative"}>
            <Popover>
              <div className={"flex items-center gap-1"}>
                {menuItems.map(renderMenuItem)}
              </div>

              <PopoverContent
                className={"h-fit w-fit border-none bg-transparent shadow-none"}
              >
                <HslColorPicker
                  color={{
                    h: baseColor[0],
                    s: baseColor[1],
                    l: baseColor[2],
                  }}
                  onChange={(color) => {
                    updateBaseColor([color.h, color.s, color.l]);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </KeyboardControls>
    </div>
  );
}
