import { LayoutBorderWidth, LayoutColors, Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

export default function BagMediumShoppingLayout({
  model,
  baseColor,
  size,
}: Props) {
  const base = 150;
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
            className={"flex justify-center py-2"}
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${width}px`,
              height: `${height}px`,
              borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
            }}
          >
            <div
              className={
                "h-6 w-1/3 rounded-b-full border-b-8 border-b-white bg-white"
              }
              style={{
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            ></div>
          </div>
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
