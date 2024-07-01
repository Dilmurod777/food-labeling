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
  Top = "top",
  Bottom = "bottom",
}

export default function BoxTelescopeLayout({ model, baseColor, size }: Props) {
  const base = 100;
  const width = size[0] * base;
  const height = size[1] * base;
  const depth = size[2] * base * 0.5;

  const [canvases, setCanvases] = useState<{
    [TabKeys.Top]: fabric.Canvas;
    [TabKeys.Bottom]: fabric.Canvas;
  }>();
  const [currentTab, setCurrentTab] = useState(TabKeys.Top);
  const currentTabRef = useRef(currentTab);
  const currentCanvases = useRef<fabric.Canvas[]>([]);

  useEffect(() => {
    currentTabRef.current = currentTab;
  }, [currentTab]);

  useEffect(() => {
    if (currentCanvases.current.length != 2) return;

    if (currentCanvases.current[0] && currentCanvases.current[0].getElement()) {
      currentCanvases.current[0].setHeight(height + 2 * depth + 15);
      currentCanvases.current[0].setWidth(width + 2 * depth + 15);
    }

    if (currentCanvases.current[1] && currentCanvases.current[1].getElement()) {
      currentCanvases.current[1].setHeight(height + 2 * depth + 15);
      currentCanvases.current[1].setWidth(width + 2 * depth + 15);
    }
  }, [size]);

  useEffect(() => {
    const ct = new fabric.Canvas("canvas-top", {
      height: height + 2 * depth + 15,
      width: width + 2 * depth + 15,
      backgroundColor: "transparent",
    });

    const cb = new fabric.Canvas("canvas-bottom", {
      height: height + 2 * depth + 15,
      width: width + 2 * depth + 15,
      backgroundColor: "transparent",
    });

    currentCanvases.current.push(ct);
    currentCanvases.current.push(cb);

    setCanvases({
      top: ct,
      bottom: cb,
    });

    ct.on("after:render", function (e) {
      if (!ct.getElement() || !cb.getElement()) return;

      window.dispatchEvent(
        new CustomEvent(CanvasEvents.UpdateModel, {
          detail: {
            top: ct.getElement(),
            bottom: cb.getElement(),
          },
        }),
      );
    });

    cb.on("after:render", function (e) {
      if (!ct.getElement() || !cb.getElement()) return;

      window.dispatchEvent(
        new CustomEvent(CanvasEvents.UpdateModel, {
          detail: {
            top: ct.getElement(),
            bottom: cb.getElement(),
          },
        }),
      );
    });

    return () => {
      ct.dispose();
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
    <div className={"flex w-full flex-col gap-8"}>
      <div className="flex h-fit w-full items-center justify-end">
        <div
          className={`cursor-pointer rounded-bl-md rounded-tl-md border border-r-0 border-main p-4 ${currentTab == TabKeys.Top ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => setCurrentTab(TabKeys.Top)}
        >
          Top
        </div>
        <div
          className={`cursor-pointer rounded-br-md rounded-tr-md border border-l-0 border-main p-4 ${currentTab == TabKeys.Bottom ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => setCurrentTab(TabKeys.Bottom)}
        >
          Bottom
        </div>
      </div>

      <div>
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
            <div
              className={"absolute z-10"}
              style={{
                width: `${width + 2 * depth + 15}px`,
                height: `${height + 2 * depth + 15}px`,
              }}
            >
              <canvas id={"canvas-top"} />
            </div>
          </div>
        </div>
        <div
          style={{
            visibility: currentTab == TabKeys.Bottom ? "visible" : "hidden",
            height: currentTab == TabKeys.Bottom ? "auto" : "0px",
          }}
        >
          <div
            className={"relative flex w-full items-center justify-center gap-1"}
          >
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
            <div
              className={"absolute z-10"}
              style={{
                width: `${width + 2 * depth + 15}px`,
                height: `${height + 2 * depth + 15}px`,
              }}
            >
              <canvas id={"canvas-bottom"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
