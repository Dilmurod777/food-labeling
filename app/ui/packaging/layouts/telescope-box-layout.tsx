import { Model } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  model: Model;
  baseColor: number[];
}

export default function TelescopeBoxLayout({ model, baseColor }: Props) {
  const base = 60;
  const width = model.sizes[0] * base;
  const height = model.sizes[1] * base;
  const depth = model.sizes[2] * base;

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
        <div className={"flex w-full items-center justify-center gap-1"}>
          <div className={"flex w-fit flex-col gap-1"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
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
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-1"}>
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
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
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-1"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
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
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] - 5,
                ]),
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
        <div className={"flex w-full items-center justify-center gap-1"}>
          <div className={"flex w-fit flex-col gap-1"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] + 5,
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
                  baseColor[2] + 2,
                ]),
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] + 5,
                ]),
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-1"}>
            <div
              style={{
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] + 5,
                ]),
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
                  baseColor[2] + 5,
                ]),
              }}
            />
          </div>
          <div className={"flex w-fit flex-col gap-1"}>
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] + 5,
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
                  baseColor[2] + 2,
                ]),
              }}
            />
            <div
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                backgroundColor: GetHSV([
                  baseColor[0],
                  baseColor[1],
                  baseColor[2] + 5,
                ]),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
