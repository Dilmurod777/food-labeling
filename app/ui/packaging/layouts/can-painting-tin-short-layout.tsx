import { Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

export default function CanPaintingTinShortLayout({
  model,
  baseColor,
  size,
}: Props) {
  const base = 70;
  const width = size[0] * base;
  const height = size[1] * base;
  const depth = size[2] * base;

  return (
    <div className={"flex w-full flex-col items-center gap-8"}>
      <div className={"flex w-full flex-col gap-6"}>
        <h1
          className={
            "w-full border-b border-b-main-gray pb-2 text-2xl/none font-bold"
          }
        >
          Side:
        </h1>
        <div className={"flex w-full flex-col items-center justify-center"}>
          <div
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${width}px`,
              height: `${height}px`,
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
          Top/Bottom:
        </h1>
        <div className={"flex w-full items-center justify-center gap-1"}>
          <div
            className={"rounded-full"}
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${width}px`,
              height: `${depth}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
