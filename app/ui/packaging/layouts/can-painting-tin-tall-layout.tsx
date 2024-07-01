"use client";

import {
  CanvasEvents,
  LayoutBorderWidth,
  LayoutColors,
  Model,
} from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

enum TabKeys {
  Side1 = "side1",
  Side2 = "side2",
  Top = "top",
}

export default function CanPaintingTinTallLayout({
  model,
  baseColor,
  size,
}: Props) {
  const base = 120;
  const width = size[0] * base * 2;
  const height = size[1] * base;
  const depth = size[2] * base * 2;

  const [canvases, setCanvases] = useState<{
    [TabKeys.Side1]: fabric.Canvas;
    [TabKeys.Side2]: fabric.Canvas;
    [TabKeys.Top]: fabric.Canvas;
  }>();
  const [currentTab, setCurrentTab] = useState(TabKeys.Side1);
  const currentTabRef = useRef(currentTab);

  useEffect(() => {
    currentTabRef.current = currentTab;
  }, [currentTab]);

  useEffect(() => {
    const cs1 = new fabric.Canvas("canvas-side1", {
      height: height + 15,
      width: width + 15,
      backgroundColor: "transparent",
    });

    const cs2 = new fabric.Canvas("canvas-side2", {
      height: height + 15,
      width: width + 15,
      backgroundColor: "transparent",
    });

    const ct = new fabric.Canvas("canvas-top", {
      height: depth * 0.75 + 15,
      width: width * 0.75 + 15,
      backgroundColor: "transparent",
    });

    setCanvases({
      side1: cs1,
      side2: cs2,
      top: ct,
    });

    cs1.on("after:render", function (e) {
      if (!cs1.getElement() || !cs2.getElement() || !ct.getElement()) return;

      window.dispatchEvent(
        new CustomEvent(CanvasEvents.UpdateModel, {
          detail: {
            side1: cs1.getElement(),
            side2: cs2.getElement(),
            top: ct.getElement(),
          },
        }),
      );
    });

    cs2.on("after:render", function (e) {
      if (!cs1.getElement() || !cs2.getElement() || !ct.getElement()) return;

      window.dispatchEvent(
        new CustomEvent(CanvasEvents.UpdateModel, {
          detail: {
            side1: cs1.getElement(),
            side2: cs2.getElement(),
            top: ct.getElement(),
          },
        }),
      );
    });

    ct.on("after:render", function (e) {
      if (!cs1.getElement() || !cs2.getElement() || !ct.getElement()) return;

      window.dispatchEvent(
        new CustomEvent(CanvasEvents.UpdateModel, {
          detail: {
            side1: cs1.getElement(),
            side2: cs2.getElement(),
            top: ct.getElement(),
          },
        }),
      );
    });

    return () => {
      cs1.dispose();
      cs2.dispose();
      ct.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvases) return;

    window.addEventListener(CanvasEvents.AddElement, function (e) {
      if (!canvases) return;

      // @ts-ignore
      const { type, value } = e.detail;

      if (type == "image") {
        fabric.Image.fromURL(
          value,
          function (imgObj) {
            canvases[currentTabRef.current].add(imgObj).renderAll();
          },
          {
            scaleX: 0.05,
            scaleY: 0.05,
            left: width * 0.5,
            top: height * 0.5,
          },
        );
      } else if (type == "text") {
        canvases[currentTabRef.current]
          .add(
            new fabric.Text(value, {
              left: width * 0.5,
              top: height * 0.5,
              fontSize: 20,
            }),
          )
          .renderAll();
      }

      canvases[currentTabRef.current].requestRenderAll();
    });

    window.addEventListener("keydown", function (e) {
      if (e.key == "Delete") {
        const activeObject = canvases[currentTabRef.current].getActiveObject();
        if (activeObject) {
          canvases[currentTabRef.current].remove(activeObject);
        }
      }

      if (e.key == "Escape") {
        canvases[currentTabRef.current].discardActiveObject().renderAll();
      }
    });
  }, [canvases]);

  return (
    <div className={"flex w-full flex-col items-center gap-8"}>
      <div className="flex h-fit w-full items-center justify-end">
        <div
          className={`cursor-pointer rounded-bl-md rounded-tl-md border border-r-0 border-main p-4 ${currentTab == TabKeys.Side1 ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => setCurrentTab(TabKeys.Side1)}
        >
          Side Front
        </div>
        <div
          className={`cursor-pointer border border-main p-4 ${currentTab == TabKeys.Side2 ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => setCurrentTab(TabKeys.Side2)}
        >
          Side Back
        </div>
        <div
          className={`cursor-pointer rounded-br-md rounded-tr-md border border-l-0 border-main p-4 ${currentTab == TabKeys.Top ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => setCurrentTab(TabKeys.Top)}
        >
          Top
        </div>
      </div>
      <div>
        <div
          style={{
            visibility: currentTab == TabKeys.Side1 ? "visible" : "hidden",
            height: currentTab == TabKeys.Side1 ? "auto" : "0px",
          }}
        >
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
            <div
              className={"absolute z-10"}
              style={{ width: `${width + 15}px`, height: `${height + 15}px` }}
            >
              <canvas id={"canvas-side1"} />
            </div>
          </div>
        </div>
        <div
          style={{
            visibility: currentTab == TabKeys.Side2 ? "visible" : "hidden",
            height: currentTab == TabKeys.Side2 ? "auto" : "0px",
          }}
        >
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
            <div
              className={"absolute z-10"}
              style={{ width: `${width + 15}px`, height: `${height + 15}px` }}
            >
              <canvas id={"canvas-side2"} />
            </div>
          </div>
        </div>
        <div
          style={{
            visibility: currentTab == TabKeys.Top ? "visible" : "hidden",
            height: currentTab == TabKeys.Top ? "auto" : "0px",
          }}
        >
          <div
            className={"relative flex w-full items-center justify-center gap-1"}
          >
            <div
              className={"rounded-full"}
              style={{
                backgroundColor: GetHSV(baseColor),
                width: `${width * 0.75}px`,
                height: `${depth * 0.75}px`,
                borderTop: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderLeft: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderRight: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
                borderBottom: `${LayoutBorderWidth}px solid ${LayoutColors.Outside}`,
              }}
            />
            <div
              className={"absolute z-10"}
              style={{
                width: `${width * 0.75 + 15}px`,
                height: `${depth * 0.75 + 15}px`,
              }}
            >
              <canvas id={"canvas-top"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
