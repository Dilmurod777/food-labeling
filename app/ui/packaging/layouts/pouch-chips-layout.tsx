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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  model: Model;
  baseColor: number[];
  size: number[];
}

enum TabKeys {
  Front = "front",
  Back = "back",
}

export default function PouchChipsLayout({ model, baseColor, size }: Props) {
  const base = 160;
  const width = size[0] * base;
  const height = size[1] * base * 1.35;
  const depth = size[2] * base;
  const [canvases, setCanvases] = useState<{
    [TabKeys.Front]: fabric.Canvas;
    [TabKeys.Back]: fabric.Canvas;
  }>();
  const [currentTab, setCurrentTab] = useState(TabKeys.Front);
  const currentTabRef = useRef(currentTab);

  useEffect(() => {
    currentTabRef.current = currentTab;
  }, [currentTab]);

  useEffect(() => {
    const cf = new fabric.Canvas("canvas-front", {
      height: height + 15,
      width: width + 15,
      backgroundColor: "transparent",
    });

    const cb = new fabric.Canvas("canvas-back", {
      height: height + 15,
      width: width + 15,
      backgroundColor: "transparent",
    });

    setCanvases({
      front: cf,
      back: cb,
    });

    cf.on("after:render", function (e) {
      if (!cf.getElement() || !cb.getElement()) return;

      window.dispatchEvent(
        new CustomEvent(CanvasEvents.UpdateModel, {
          detail: {
            front: cf.getElement(),
            back: cb.getElement(),
          },
        }),
      );
    });

    cb.on("after:render", function (e) {
      if (!cf.getElement() || !cb.getElement()) return;

      window.dispatchEvent(
        new CustomEvent(CanvasEvents.UpdateModel, {
          detail: {
            front: cf.getElement(),
            back: cb.getElement(),
          },
        }),
      );
    });

    return () => {
      cf.dispose();
      cb.dispose();
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
          className={`cursor-pointer rounded-bl-md rounded-tl-md border border-r-0 border-main p-4 ${currentTab == TabKeys.Front ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => setCurrentTab(TabKeys.Front)}
        >
          Front
        </div>
        <div
          className={`cursor-pointer rounded-br-md rounded-tr-md border border-l-0 border-main p-4 ${currentTab == TabKeys.Back ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => setCurrentTab(TabKeys.Back)}
        >
          Back
        </div>
      </div>
      <div>
        <div
          style={{
            visibility: currentTab == TabKeys.Front ? "visible" : "hidden",
            height: currentTab == TabKeys.Front ? "auto" : "0px",
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
              <canvas id={"canvas-front"} />
            </div>
          </div>
        </div>
        <div
          style={{
            visibility: currentTab == TabKeys.Back ? "visible" : "hidden",
            height: currentTab == TabKeys.Back ? "auto" : "0px",
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
              <canvas id={"canvas-back"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
