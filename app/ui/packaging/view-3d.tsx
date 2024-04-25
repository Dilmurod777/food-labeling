"use client";

import { Canvas } from "@react-three/fiber";
import {
  MapControls,
  OrbitControls,
  PerspectiveCamera,
  SoftShadows,
  useTexture,
} from "@react-three/drei";
import Content from "@/app/ui/packaging/content";
import { useEffect, useRef, useState } from "react";
import SideMenu from "@/app/ui/packaging/side-menu";
import BottomMenu from "@/app/ui/packaging/bottom-menu";
import { Model, ModelType, RestrictedKeyCodes, Tools } from "@/app/lib/3d";
import { v4 as uuidV4 } from "uuid";
import { Texture } from "three";

export default function View3D() {
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.Select);
  const [models, setModels] = useState<Model[]>([]);
  const [texture, setTexture] = useState<Texture>();
  const [currentModelIndex, setCurrentModelIndex] = useState(-1);
  const cameraRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    window.document.body.onkeydown = function (event) {
      if (
        event.ctrlKey ||
        event.altKey ||
        RestrictedKeyCodes.includes(event.key)
      ) {
        event.preventDefault();
      }
      return true;
    };
  }, []);

  const GetCurrentCursor = () => {
    switch (currentTool) {
      case Tools.Hand:
        return "grab";
      default:
        return "default";
    }
  };

  const GetCurrentControls = () => {
    switch (currentTool) {
      case Tools.Hand:
        return (
          <MapControls
            enableZoom={false}
            maxDistance={20}
            minDistance={5}
            enableRotate={false}
          />
        );
      default:
        return (
          <>
            <OrbitControls
              makeDefault
              minDistance={5}
              maxDistance={20}
              enabled={true}
              minPolarAngle={0}
              maxPolarAngle={Math.PI * 0.5}
              enableZoom={true}
            />
            {/*<GizmoHelper alignment={"bottom-right"}>*/}
            {/*  <GizmoViewport*/}
            {/*    axisColors={["#FA7070", "#90D26D", "#7AA2E3"]}*/}
            {/*    labelColor="white"*/}
            {/*    hideNegativeAxes={true}*/}
            {/*  />*/}
            {/*</GizmoHelper>*/}
          </>
        );
    }
  };

  const AddModel = (
    t: ModelType,
    p: string,
    a: boolean,
    s: number,
    ts: number,
  ) => {
    setCurrentModelIndex(-1);
    setModels([
      ...models,
      {
        type: t,
        path: p,
        name: uuidV4(),
        animatable: a,
        step: s,
        totalSteps: ts,
      },
    ]);
  };

  const RemoveModel = (index: number) => {
    if (index < 0 || index > models.length) return;

    setCurrentModelIndex(-1);
    setModels([...models.slice(0, index), ...models.slice(index + 1)]);
  };

  const UploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (e: Event) => {
      // @ts-ignore
      if (!e.target || e.target.files.length == 0) return;
      // @ts-ignore
      UploadImage2(e.target.files[0]);
    };

    input.click();
  };

  const UploadImage2 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent) => {
      if (!readerEvent.target) return;
      const content = readerEvent.target.result;
      ApplyTexture(content as string);
    };
  };

  const ApplyTexture = (url: string) => {
    const texture = useTexture(url);
    setTexture(texture);
  };

  const UpdateTool = (text: Tools) => {
    setCurrentTool(text);

    if (text == Tools.Delete) {
      RemoveModel(currentModelIndex);
    } else if (text == Tools.UploadImage) {
      // UploadImage();
    } else if (text == Tools.ExportRender) {
      if (!canvasRef.current) return;

      const screenshot = canvasRef.current.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.href = screenshot;
      a.download = "scene.png";
      a.click();
    }
  };

  return (
    <div
      className={"relative h-[700px] w-full flex-grow"}
      style={{ cursor: GetCurrentCursor() }}
    >
      <Canvas shadows ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, -10]} ref={cameraRef} />
        <directionalLight
          visible={true}
          position={[3.3, 1.0, 4.4]}
          castShadow
        />
        {GetCurrentControls()}
        <SoftShadows size={1} />

        <Content
          models={models}
          currentTool={currentTool}
          currentModelIndex={currentModelIndex}
          setCurrentModelIndex={setCurrentModelIndex}
          updateStep={(s) => {
            setModels([
              ...models.slice(0, currentModelIndex),
              {
                ...models[currentModelIndex],
                step: s,
              },
              ...models.slice(currentModelIndex + 1),
            ]);
          }}
        />
      </Canvas>

      <SideMenu addModel={AddModel} />
      <BottomMenu
        updateTool={UpdateTool}
        currentTool={currentTool}
        currentModel={models[currentModelIndex]}
        updateStep={(s) => {
          setModels([
            ...models.slice(0, currentModelIndex),
            {
              ...models[currentModelIndex],
              step: s,
            },
            ...models.slice(currentModelIndex + 1),
          ]);
        }}
      />
    </div>
  );
}
