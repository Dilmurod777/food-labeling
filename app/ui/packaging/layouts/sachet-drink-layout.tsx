import { LayoutBorderWidth, LayoutColors, Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

export default function SachetDrinkLayout({ model, baseColor, size }: Props) {
  const base = 160;
  const width = size[0] * base;
  const height = size[1] * base;
  const depth = (size[2] * base) / 3;

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
        <div className={"flex w-full flex-col items-center justify-center"}>
          <div
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${width * 0.5}px`,
              height: `${height * 0.2}px`,
              borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
            }}
          />
          <div
            className={"flex items-center justify-center"}
            style={{
              transform: `scale(${size[0]}, 1)`,
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                width: `0`,
                height: `0`,
                borderRight: `20px solid ${GetHSV(baseColor)}`,
                borderTop: `20px solid transparent`,
                borderLeft: `20px solid transparent`,
                borderBottom: `20px solid ${GetHSV(baseColor)}`,
              }}
            />
            <div
              style={{
                backgroundColor: GetHSV(baseColor),
                width: `40px`,
                height: `40px`,
                borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              }}
            />
            <div
              style={{
                backgroundColor: "transparent",
                width: `0`,
                height: `0`,
                borderRight: `20px solid transparent`,
                borderLeft: `20px solid ${GetHSV(baseColor)}`,
                borderTop: `20px solid transparent`,
                borderBottom: `20px solid ${GetHSV(baseColor)}`,
              }}
            />
          </div>
          <div
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${width * 0.8}px`,
              height: `${height * 0.8}px`,
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderTop: `${LayoutBorderWidth}px dashed ${LayoutColors.Inside}`,
              borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
            }}
          />
        </div>
      </div>
      <div className={"flex w-full flex-col gap-6"}>
        <h1
          className={
            "w-full border-b border-b-main-gray pb-2 text-2xl/none font-bold"
          }
        >
          Side:
        </h1>
        <div className={"flex w-full items-center justify-center gap-1"}>
          <div
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${depth}px`,
              height: `${height}px`,
              borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
