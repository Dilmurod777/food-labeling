"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sky,
  SoftShadows,
  GizmoHelper,
  GizmoViewport,
  MapControls,
} from "@react-three/drei";
import Content from "@/app/ui/packaging/content";
import { useEffect, useMemo, useRef, useState } from "react";
import SideMenu from "@/app/ui/packaging/side-menu";
import BottomMenu from "@/app/ui/packaging/bottom-menu";
import { KeyMap, RestrictedKeyCodes, Tools } from "@/app/lib/3d";

export default function View3D() {
  const cameraControlsRef = useRef(null);
  const [currentTool, setCurrentTool] = useState<string>(Tools.Select);

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
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        {GetCurrentControls()}
        <SoftShadows size={10} />

        <Content />
      </Canvas>

      <SideMenu />
      <BottomMenu updateTool={setCurrentTool} currentTool={currentTool} />
    </div>
  );
}
