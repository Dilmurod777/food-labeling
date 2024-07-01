"use client";

import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  MapControls,
  MapControlsProps,
  OrbitControls,
  PerspectiveCamera,
  SoftShadows,
  useTexture,
} from "@react-three/drei";
import Content from "@/app/ui/packaging/editor-3d/content";
import { Ref, useEffect, useRef, useState } from "react";
import SideMenu from "@/app/ui/packaging/editor-3d/side-menu";
import BottomMenu from "@/app/ui/packaging/editor-3d/bottom-menu";
import {
  CanvasTexture,
  Model,
  ModelType,
  RestrictedKeyCodes,
  Tools,
} from "@/app/lib/3d";
import { v4 as uuidV4 } from "uuid";
import { Texture } from "three";
import CameraPresetsMenu from "@/app/ui/packaging/editor-3d/camera-presets-menu";

interface Props {
  initialModel: Model;
  baseColor: number[];
  updateBaseColor: (c: number[]) => void;
  size: number[];
  textures: CanvasTexture[];
}

export default function View({
  initialModel,
  baseColor,
  size,
  updateBaseColor,
  textures,
}: Props) {
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.Select);
  const [currentModel, setCurrentModel] = useState<Model>({ ...initialModel });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [texture, setTexture] = useState<Texture>();
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const cameraControlsRef = useRef<CameraControls>(null);

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
      if (!exportCanvasRef.current) return;

      const screenshot = exportCanvasRef.current.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.href = screenshot;
      a.download = "scene.png";
      a.click();
    }
  };

  return (
    <div
      className={"relative h-full w-full flex-grow"}
      style={{ cursor: GetCurrentCursor() }}
    >
      <Canvas
        shadows
        ref={exportCanvasRef}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ position: [0, 2, 5], fov: 75 }}
      >
        <Environment preset={"lobby"} />
        <CameraControls
          ref={cameraControlsRef}
          minDistance={5}
          maxDistance={25}
        />
        {/*{GetCurrentControls()}*/}

        <Content
          currentModel={currentModel}
          updateCurrentModel={setCurrentModel}
          currentTool={currentTool}
          currentStep={currentStep}
          updateCurrentStep={setCurrentStep}
          baseColor={baseColor}
          size={size}
          textures={textures}
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
        updateBaseColor={updateBaseColor}
        baseColor={baseColor}
      />

      <CameraPresetsMenu
        currentModel={currentModel}
        cameraControlsRef={cameraControlsRef}
      />
    </div>
  );
}
