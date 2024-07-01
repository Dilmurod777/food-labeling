"use client";

import { Model, CameraPresets } from "@/app/lib/3d";
import Image from "next/image";
import { convertCameraPresetTextToTitle } from "@/app/lib/utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Ref } from "react";
import * as THREE from "three";

const { DEG2RAD } = THREE.MathUtils;

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
  cameraControlsRef: Ref<CameraControls>;
}

export default function CameraPresetsMenu({
  currentModel,
  cameraControlsRef,
}: Props) {
  const menuItems: MenuItem[] = [
    {
      type: "block",
      icon: "front.svg",
      text: CameraPresets.Front,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "back.svg",
      text: CameraPresets.Back,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "left.svg",
      text: CameraPresets.Left,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "right.svg",
      text: CameraPresets.Right,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "top.svg",
      text: CameraPresets.Top,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "bottom.svg",
      text: CameraPresets.Bottom,
    },
    { type: "divider" },
    {
      type: "block",
      icon: "reset.svg",
      text: CameraPresets.Reset,
    },
  ];

  const menuItemHandle = (index: CameraPresets) => {
    // console.log(menuItems[index]);
    // console.log(controls);
    // @ts-ignore
    // console.log(cameraControlsRef?.current);
    switch (index) {
      case CameraPresets.Top:
        //@ts-ignore
        cameraControlsRef?.current?.rotatePolarTo(-20, true);
        break;
      case CameraPresets.Bottom:
        //@ts-ignore
        cameraControlsRef?.current?.rotatePolarTo(20, true);
        break;
      case CameraPresets.Front:
        //@ts-ignore
        cameraControlsRef?.current?.rotatePolarTo(Math.PI / 2, true);
        //@ts-ignore
        cameraControlsRef?.current?.rotateAzimuthTo(0, true);
        break;
      case CameraPresets.Back:
        //@ts-ignore
        cameraControlsRef?.current?.rotatePolarTo(Math.PI / 2, true);
        //@ts-ignore
        cameraControlsRef?.current?.rotateAzimuthTo(Math.PI, true);
        break;
      case CameraPresets.Left:
        //@ts-ignore
        cameraControlsRef?.current?.rotatePolarTo(Math.PI / 2, true);
        //@ts-ignore
        cameraControlsRef?.current?.rotateAzimuthTo(-Math.PI / 2, true);
        break;
      case CameraPresets.Right:
        //@ts-ignore
        cameraControlsRef?.current?.rotatePolarTo(Math.PI / 2, true);
        //@ts-ignore
        cameraControlsRef?.current?.rotateAzimuthTo(Math.PI / 2, true);
        break;
      case CameraPresets.Reset:
        //@ts-ignore
        cameraControlsRef?.current?.rotatePolarTo(Math.PI / 3, true);
        //@ts-ignore
        cameraControlsRef?.current?.rotateAzimuthTo(
          ((Math.PI / 2) * 5) / 9,
          true,
        );
        break;
    }
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
                  onClick={() => menuItemHandle(item.text)}
                >
                  <div className={"relative h-8 w-8 text-main"}>
                    <Image
                      className={"text-main"}
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
                className={"border-0 bg-main text-white outline-none"}
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
        "bg-white1 absolute bottom-2 right-0 flex -translate-x-1/2 select-none items-center justify-center gap-2 rounded-md border border-main"
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
