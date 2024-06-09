"use client";

import { Model } from "@/app/lib/3d";
import View from "@/app/ui/packaging/editor-3d/view";
import TelescopeBoxLayout from "@/app/ui/packaging/layouts/telescope-box-layout";
import { useState } from "react";
import { HslColorPicker } from "react-colorful";
import { GetHSV } from "@/app/lib/utilities";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChipsPackageLayout from "@/app/ui/packaging/layouts/chips-package-layout";

interface Props {
  model: Model;
}

export default function Editor3D({ model }: Props) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [baseColor, setBaseColor] = useState(model.baseColor);
  const [size, setSize] = useState(model.sizes);

  const GetModelLayout = (model: Model) => {
    switch (model.id) {
      case "0":
        return (
          <TelescopeBoxLayout model={model} baseColor={baseColor} size={size} />
        );

      case "1":
        return (
          <ChipsPackageLayout model={model} baseColor={baseColor} size={size} />
        );
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
      <div className={"relative m-12 flex w-1/2 flex-col gap-6"}>
        <div
          className={
            "flex w-full items-center justify-between gap-2 border-b border-b-main-orange pb-2"
          }
        >
          <div className={"flex items-center gap-4"}>
            <h1 className={"text-2xl/none font-bold"}>Change color: </h1>
            <div className={"relative"}>
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={"h-6 w-6 cursor-pointer rounded-full"}
                    style={{
                      backgroundColor: GetHSV(baseColor),
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent
                  className={
                    "h-fit w-fit border-none bg-transparent shadow-none"
                  }
                >
                  <HslColorPicker
                    color={{
                      h: baseColor[0],
                      s: baseColor[1],
                      l: baseColor[2],
                    }}
                    onChange={(color) => {
                      setBaseColor([color.h, color.s, color.l]);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className={"flex items-center gap-4"}>
            <h1 className={"text-2xl/none font-bold"}>Change size: </h1>
            <Popover>
              <PopoverTrigger asChild>
                <p
                  className={
                    "cursor-pointer text-xl/none font-normal text-main-orange"
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
      </div>
      <div className={"relative w-1/2"}>
        <View initialModel={model} baseColor={baseColor} size={size} />
      </div>
    </div>
  );
}
