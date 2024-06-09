"use client";

import { Model } from "@/app/lib/3d";
import View from "@/app/ui/packaging/editor-3d/view";
import TelescopeBoxLayout from "@/app/ui/packaging/layouts/telescope-box-layout";
import { useState } from "react";
import { HslColorPicker } from "react-colorful";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
}

export default function Editor3D({ model }: Props) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [baseColor, setBaseColor] = useState(model.baseColor);

  const GetModelLayout = (model: Model) => {
    switch (model.id) {
      case "0":
        return <TelescopeBoxLayout model={model} baseColor={baseColor} />;
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

  return (
    <div className={"relative z-0 flex h-full w-full flex-grow"}>
      <div className={"relative m-12 flex w-1/2 flex-col gap-2"}>
        <div
          className={
            "flex w-full items-center gap-2 border-b border-b-main-orange pb-2"
          }
        >
          <h1 className={"text-2xl/none font-bold"}>Change color: </h1>
          <div className={"relative"}>
            <div
              className={"h-6 w-6 cursor-pointer rounded-full"}
              style={{
                backgroundColor: GetHSV(baseColor),
              }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <div className={"absolute left-10 top-0 z-10"}>
              {showColorPicker && (
                <HslColorPicker
                  color={{ h: baseColor[0], s: baseColor[1], l: baseColor[2] }}
                  onChange={(color) => {
                    setBaseColor([color.h, color.s, color.l]);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div>{GetModelLayout(model)}</div>
      </div>
      <div className={"relative w-1/2"}>
        <View initialModel={model} baseColor={baseColor} />
      </div>
    </div>
  );
}
