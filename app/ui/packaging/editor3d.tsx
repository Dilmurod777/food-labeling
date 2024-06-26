"use client";

import { CanvasTexture, Model, ModelCategory } from "@/app/lib/3d";
import View from "@/app/ui/packaging/editor-3d/view";
import BoxTelescopeLayout from "@/app/ui/packaging/layouts/box-telescope-layout";
import { Suspense, useRef, useState } from "react";
import { HslColorPicker } from "react-colorful";
import { GetHSV } from "@/app/lib/utilities";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PouchChipsLayout from "@/app/ui/packaging/layouts/pouch-chips-layout";
import BoxFullOverlapSlottedLayout from "@/app/ui/packaging/layouts/box-full-overlap-slotted-layout";
import SachetDrinkLayout from "@/app/ui/packaging/layouts/sachet-drink-layout";
import SachetSnackLayout from "@/app/ui/packaging/layouts/sachet-snack-layout";
import { BagCoffeeModel } from "@/app/ui/packaging/models/bag-coffee-model";
import BagCoffeeLayout from "@/app/ui/packaging/layouts/bag-coffee-layout";
import BagMediumShopping2Layout from "@/app/ui/packaging/layouts/bag-medium-shopping-2-layout";
import CanPaintingTinShortLayout from "@/app/ui/packaging/layouts/can-painting-tin-short-layout";
import CanPaintingTinTallLayout from "@/app/ui/packaging/layouts/can-painting-tin-tall-layout";
import BagMediumShoppingLayout from "@/app/ui/packaging/layouts/bag-medium-shopping-layout";
import BoxSimpleTallLayout from "@/app/ui/packaging/layouts/box-simple-tall-layout";
import BoxDonutLayout from "@/app/ui/packaging/layouts/box-donut-layout";
import BoxSlideLayout from "@/app/ui/packaging/layouts/box-slide-layout";
import TemplatesPanel from "@/app/ui/packaging/templates";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Konva from "konva";

interface Props {
  model: Model;
}

export default function Editor3D({ model }: Props) {
  const [baseColor, setBaseColor] = useState(model.baseColor);
  const [size, setSize] = useState(model.sizes);
  const [selectedTextures, setSelectedTextures] = useState<CanvasTexture[]>([]);

  const GetModelLayout = (model: Model) => {
    switch (model.id) {
      case "box-0": {
        return (
          <BoxTelescopeLayout model={model} baseColor={baseColor} size={size} />
        );
      }
      case "box-1": {
        return (
          <BoxFullOverlapSlottedLayout
            model={model}
            baseColor={baseColor}
            size={size}
          />
        );
      }
      case "box-2": {
        return (
          <BoxSimpleTallLayout
            model={model}
            baseColor={baseColor}
            size={size}
          />
        );
      }
      case "box-3": {
        return (
          <BoxDonutLayout model={model} baseColor={baseColor} size={size} />
        );
      }
      case "box-4": {
        return (
          <BoxSlideLayout model={model} baseColor={baseColor} size={size} />
        );
      }
      case "pouch-0": {
        return (
          <PouchChipsLayout model={model} baseColor={baseColor} size={size} />
        );
      }
      case "sachet-0": {
        return (
          <SachetDrinkLayout model={model} baseColor={baseColor} size={size} />
        );
      }
      case "sachet-1": {
        return (
          <SachetSnackLayout model={model} baseColor={baseColor} size={size} />
        );
      }
      case "pouch-1": {
        return (
          <BagCoffeeLayout model={model} baseColor={baseColor} size={size} />
        );
      }
      case "bag-0": {
        return (
          <BagMediumShopping2Layout
            model={model}
            baseColor={baseColor}
            size={size}
          />
        );
      }
      case "bag-1": {
        return (
          <BagMediumShoppingLayout
            model={model}
            baseColor={baseColor}
            size={size}
          />
        );
      }
      case "can-0": {
        return (
          <CanPaintingTinShortLayout
            model={model}
            baseColor={baseColor}
            size={size}
          />
        );
      }
      case "can-1": {
        return (
          <CanPaintingTinTallLayout
            model={model}
            baseColor={baseColor}
            size={size}
          />
        );
      }
      default:
        return (
          <div
            className={
              "flex h-full w-full flex-grow items-center justify-center"
            }
          >
            No layout.
          </div>
        );
    }
  };

  const GetSizeTitle = (index: number) => {
    if (index == 0) return "Width";
    if (index == 1) return "Height";
    if (index == 2) return "Depth";

    return "Other";
  };

  return (
    <div className={"relative z-0 flex h-full w-full flex-grow"}>
      <Suspense fallback={<div className={"h-full w-20 bg-transparent"} />}>
        <TemplatesPanel />
      </Suspense>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={50}
          minSize={25}
          className={"relative m-12 flex flex-col gap-6"}
        >
          <div
            className={
              "flex w-full items-center justify-between gap-2 border-b border-b-main pb-2"
            }
          >
            <div className={"flex items-center gap-4"}>
              <h1 className={"text-2xl/none font-bold"}>Change size: </h1>
              <Popover>
                <PopoverTrigger asChild>
                  <p
                    className={
                      "cursor-pointer text-xl/none font-normal text-main"
                    }
                  >
                    {size.join("x")}
                  </p>
                </PopoverTrigger>
                <PopoverContent className="w-80" sideOffset={10}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      {size.map((s, i) => (
                        <div
                          className="grid grid-cols-3 items-center gap-4"
                          key={`size-input-${i}`}
                        >
                          <Label htmlFor={`size-input-${i}`}>
                            {GetSizeTitle(i)}
                          </Label>
                          <Input
                            id={`size-input-${i}`}
                            defaultValue={s}
                            className="col-span-2 h-8"
                            type={"number"}
                            step={0.01}
                            onChange={(e) => {
                              let newSize = [...size];
                              newSize[i] = e.target.valueAsNumber;
                              setSize(newSize);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>{GetModelLayout(model)}</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className={"relative"} defaultSize={50} minSize={40}>
          <View
            initialModel={model}
            baseColor={baseColor}
            updateBaseColor={setBaseColor}
            size={size}
            textures={selectedTextures}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
