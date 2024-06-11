"use client";

import { Canvas } from "@react-three/fiber";
import {
  MapControls,
  OrbitControls,
  PerspectiveCamera,
  SoftShadows,
  useTexture,
} from "@react-three/drei";
import Content from "@/app/ui/packaging/editor-3d/content";
import { useEffect, useRef, useState } from "react";
import SideMenu from "@/app/ui/packaging/editor-3d/side-menu";
import BottomMenu from "@/app/ui/packaging/editor-3d/bottom-menu";
import { Model, ModelType, RestrictedKeyCodes, Tools } from "@/app/lib/3d";
import { v4 as uuidV4 } from "uuid";
import { Texture } from "three";

interface Props {
  initialModel: Model;
  baseColor: number[];
  size: number[];
}

export default function View({ initialModel, baseColor, size }: Props) {
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.Select);
  const [currentModel, setCurrentModel] = useState<Model>({ ...initialModel });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [texture, setTexture] = useState<Texture>();
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
      // RemoveModel(currentModelIndex);
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
          currentModel={currentModel}
          updateCurrentModel={setCurrentModel}
          currentTool={currentTool}
          currentStep={currentStep}
          updateCurrentStep={setCurrentStep}
          baseColor={baseColor}
          size={size}
        />
      </Canvas>

      {/*<SideMenu addModel={AddModel} />*/}
      <BottomMenu
        updateTool={UpdateTool}
        currentTool={currentTool}
        currentModel={currentModel}
        updateCurrentModel={setCurrentModel}
        currentStep={currentStep}
        updateCurrentStep={setCurrentStep}
      />
    </div>
  );
}