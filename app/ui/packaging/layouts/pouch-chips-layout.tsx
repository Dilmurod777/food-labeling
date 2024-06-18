"use client";

import {
  CanvasTexture,
  LayoutBorderWidth,
  LayoutColors,
  Model,
} from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";
import { Stage, Layer, Image } from "react-konva";
import { Ref, useRef } from "react";

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
  const base = 150;
  const width = size[0] * base;
  const height = size[1] * base;
  const depth = size[2] * base;

  const startPosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

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
          <canvas
            ref={canvasRef}
            className={`absolute z-10`}
            style={{ width: `${width + 15}px`, height: `${height + 15}px` }}
          />
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
