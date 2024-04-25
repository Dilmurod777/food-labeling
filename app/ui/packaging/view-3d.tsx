"use client";

import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  MapControls,
  OrbitControls,
  Sky,
  SoftShadows,
} from "@react-three/drei";
import Content from "@/app/ui/packaging/content";
import { createRef, useEffect, useRef, useState } from "react";
import SideMenu from "@/app/ui/packaging/side-menu";
import BottomMenu from "@/app/ui/packaging/bottom-menu";
import { Model, ModelType, RestrictedKeyCodes, Tools } from "@/app/lib/3d";
import { v4 as uuidV4 } from "uuid";
import { Object3D } from "three";

export default function View3D() {
  const cameraControlsRef = useRef(null);
  const [currentTool, setCurrentTool] = useState<string>(Tools.Select);
  const [models, setModels] = useState<Model[]>([]);

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
              ref={cameraControlsRef}
              minDistance={5}
              maxDistance={20}
              enabled={true}
              minPolarAngle={0}
              maxPolarAngle={Math.PI * 0.5}
              enableZoom={true}
            />
            <GizmoHelper alignment={"bottom-right"}>
              <GizmoViewport
                axisColors={["#FA7070", "#90D26D", "#7AA2E3"]}
                labelColor="white"
                hideNegativeAxes={true}
              />
            </GizmoHelper>
          </>
        );
    }
  };

  const AddModel = (t: ModelType, p: string) => {
    setModels([
      ...models,
      {
        type: t,
        path: p,
        name: uuidV4(),
      },
    ]);
  };

  const RemoveModel = (index: number) => {
    setModels(models.slice(0, index).concat);
  };

  return (
    <div
      className={"relative h-[700px] w-full flex-grow"}
      style={{ cursor: GetCurrentCursor() }}
    >
      <Canvas shadows>
        <directionalLight
          visible={true}
          position={[3.3, 1.0, 4.4]}
          castShadow={true}
        />
        {GetCurrentControls()}
        <SoftShadows size={10} />

        <Content models={models} />
      </Canvas>

      <SideMenu addModel={AddModel} />
      <BottomMenu updateTool={setCurrentTool} currentTool={currentTool} />
    </div>
  );
}
