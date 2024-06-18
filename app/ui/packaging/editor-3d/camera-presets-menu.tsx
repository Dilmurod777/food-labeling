import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HslColorPicker } from "react-colorful";
import { PiCursorFill } from "react-icons/pi";
import { Model, CameraPresets } from "@/app/lib/3d";
import { FaHandPaper } from "react-icons/fa";
import { MdFormatColorFill } from "react-icons/md";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { convertCameraPresetTextToTitle } from "@/app/lib/utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface MenuItemBlock {
  type: "block";
  icon: string;
  text: CameraPresets;
}

interface MenuItemDivider {
  type: "divider";
}

type MenuItem = MenuItemBlock | MenuItemDivider;

interface Props {
  currentModel: Model;
}

export default function CameraPresetsMenu({ currentModel }: Props) {
  const menuItems: MenuItem[] = [
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Front,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Back,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Left,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Right,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Top,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Bottom,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Reset,
    },
  ];

  const menuItemHandle = (index: number) => {
    console.log(menuItems[index]);
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.type == "divider") {
      return (
        <div
          className={"h-0.5 w-full rounded-md bg-main-gray"}
          key={`3d-menu-item-${index}`}
        ></div>
      );
    } else if (item.type == "block") {
      return (
        <div key={`3d-menu-item-${index}`} className={"relative"}>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <div
                  className={`peer cursor-pointer p-1 hover:bg-gray-200`}
                  onClick={() => menuItemHandle(index)}
                >
                  <div className={"relative h-8 w-8 text-main-orange"}>
                    <Image
                      className={"text-main-orange"}
                      src={`/camera-presets/${item.icon}`}
                      alt={convertCameraPresetTextToTitle(item.text)}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side={"left"}
                className={"border-0 bg-main-orange text-white outline-none"}
              >
                <p>{convertCameraPresetTextToTitle(item.text)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={
        "bg-white1 absolute bottom-2 right-0 flex -translate-x-1/2 items-center justify-center gap-2 rounded-md border border-main-orange"
      }
    >
      <div className={"relative"}>
        <div className={"flex flex-col items-center gap-1"}>
          {menuItems.map(renderMenuItem)}
        </div>
      </div>
    </div>
  );
}
