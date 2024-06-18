import { LayoutBorderWidth, LayoutColors, Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

export default function BoxTelescopeLayout({ model, baseColor, size }: Props) {
  const base = 70;
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
          Top:
        </h1>
        <div
          className={
            "box-content flex w-full items-center justify-center gap-0"
          }
        >
          <div className={"flex w-fit flex-col gap-0"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
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
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
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
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: GetHSV(baseColor),
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-0"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
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
                borderLeft: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
          </div>
        </div>
      </div>

      <div className={"flex w-full flex-col gap-6"}>
        <h1
          className={
            "w-full border-b border-b-main-gray pb-2 text-2xl/none font-bold"
          }
        >
          Bottom:
        </h1>
        <div className={"flex w-full items-center justify-center gap-0"}>
          <div className={"flex w-fit flex-col gap-0"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
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
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
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
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: GetHSV(baseColor),
              }}
            />
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-0"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
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
                borderLeft: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
