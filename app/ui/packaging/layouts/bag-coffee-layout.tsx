import { LayoutBorderWidth, LayoutColors, Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";
import { Ref } from "react";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

export default function BagCoffeeLayout({ model, baseColor, size }: Props) {
  const base = 70;
  const width = size[0] * base;
  const height = size[1] * base * 3;
  const depth = size[2] * base;

  return (
    <div className={"flex w-full flex-col items-center gap-8"}>
      <div className={"flex w-full flex-col gap-6"}>
        <h1
          className={
            "w-full border-b border-b-main-gray pb-2 text-2xl/none font-bold"
          }
        >
          Front/Back:
        </h1>
        <div
          className={"relative flex w-full items-center justify-center gap-1"}
        >
          <div className={"flex w-full items-center justify-center"}>
            <div
              style={{
                backgroundColor: GetHSV(baseColor),
                width: `${width}px`,
                height: `${height}px`,
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                backgroundColor: GetHSV(baseColor),
                width: `${width}px`,
                height: `${height}px`,
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                backgroundColor: GetHSV(baseColor),
                width: `${width}px`,
                height: `${height}px`,
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                backgroundColor: GetHSV(baseColor),
                width: `${width}px`,
                height: `${height}px`,
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
          </div>
          {/*<canvas*/}
          {/*  ref={canvasRef}*/}
          {/*  className={`absolute z-10`}*/}
          {/*  style={{ width: `${4 * width + 15}px`, height: `${height + 15}px` }}*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  );
}
