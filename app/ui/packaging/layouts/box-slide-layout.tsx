import { Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

export default function BoxSlideLayout({ model, baseColor, size }: Props) {
  const base = 40;
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
          Inner part:
        </h1>
        <div className={"flex w-full items-center justify-center gap-1"}>
          <div
            style={{
              width: `${height}px`,
              height: `${width}px`,
              backgroundColor: GetHSV([
                baseColor[0],
                baseColor[1],
                baseColor[2] - 2,
              ]),
            }}
          />
          <div className={"flex w-fit flex-col items-end gap-1"}>
            <div
              style={{
                width: `${depth}px`,
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
                width: `${depth}px`,
                height: `${width}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
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
              }}
            />
          </div>
          <div
            style={{
              width: `${height}px`,
              height: `${width}px`,
              backgroundColor: GetHSV([
                baseColor[0],
                baseColor[1],
                baseColor[2] - 2,
              ]),
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
          Outer part:
        </h1>
        <div className={"flex w-full items-center justify-center gap-1"}>
          <div className={"flex w-fit flex-col items-end gap-1"}>
            <div
              style={{
                width: `${depth}px`,
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
                width: `${depth}px`,
                height: `${width}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
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
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${width}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 2,
                ]),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
