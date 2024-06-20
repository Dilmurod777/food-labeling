"use client";

import {
  CanvasEvents,
  CanvasTexture,
  LayoutBorderWidth,
  LayoutColors,
  Model,
} from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";
import { Ref, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
  canvasRef: Ref<HTMLCanvasElement>;
}

export default function PouchChipsLayout({
  model,
  baseColor,
  size,
  canvasRef,
}: Props) {
  const base = 160;
  const width = size[0] * base;
  const height = size[1] * base * 1.35;
  const depth = size[2] * base;
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      height: height + 15,
      width: width + 15,
      backgroundColor: "transparent",
    });

    setCanvas(c);

    c.on("after:render", function (e) {
      window.dispatchEvent(new Event(CanvasEvents.UpdateModel));
    });

    return () => {
      c.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;
    console.log("canvas event listener init");
    window.addEventListener(CanvasEvents.AddElement, function (e) {
      if (!canvas) return;

      // @ts-ignore
      const { type, value } = e.detail;

      if (type == "image") {
        fabric.Image.fromURL(
          value,
          function (imgObj) {
            canvas.add(imgObj).renderAll();
          },
          {
            scaleX: 0.05,
            scaleY: 0.05,
            left: width * 0.5,
            top: height * 0.5,
          },
        );
      } else if (type == "text") {
        canvas
          .add(
            new fabric.Text(value, {
              left: width * 0.5,
              top: height * 0.5,
              fontSize: 20,
            }),
          )
          .renderAll();
      }

      canvas.requestRenderAll();
    });

    window.addEventListener("keydown", function (e) {
      console.log(e.key);
      if (e.key == "Delete") {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
        }
      }

      if (e.key == "Escape") {
        canvas.discardActiveObject().renderAll();
      }
    });
  }, [canvas]);

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
          <div
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${width}px`,
              height: `${height}px`,
              borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
            }}
          />
          <div className={"absolute z-10 h-fit w-fit"}>
            <canvas id={"canvas"} ref={canvasRef} />
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
          <div
            style={{
              backgroundColor: GetHSV(baseColor),
              width: `${width}px`,
              height: `${depth}px`,
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
