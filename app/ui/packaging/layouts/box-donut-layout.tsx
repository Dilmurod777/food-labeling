import { LayoutBorderWidth, LayoutColors, Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

export default function BoxDonutLayout({ model, baseColor, size }: Props) {
  const base = 50;
  const width = size[0] * base;
  const height = size[1] * base;
  const depth = size[2] * base;

  return (
    <div className={"flex w-full flex-col gap-8"}>
      <div className={"flex w-full flex-col gap-6"}>
        <h1
          className={
            "w-full border-b border-b-main-gray pb-2 text-2xl/none font-bold"
          }
        >
          Full:
        </h1>
        <div className={"flex w-full items-center justify-center gap-0"}>
          <div className={"flex w-fit flex-col items-end gap-0"}>
            <div
              style={{
                width: `${width / 2}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${height}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${width / 2}px`,
                height: `${depth}px`,
                backgroundColor: "transparent",
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-0"}>
            <div
              style={{
                width: `${width}px`,
                height: `${depth / 3}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${depth / 3}px`,
                backgroundColor: "transparent",
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-0"}>
            <div
              style={{
                width: `${width / 2}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${height}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${width / 2}px`,
                height: `${depth}px`,
                backgroundColor: "transparent",
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-0"}>
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
