"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerformanceMonitor,
  Sky,
  SoftShadows,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import Content from "@/app/ui/packaging/content";
import { useRef } from "react";
import Menu from "@/app/ui/packaging/menu";

export default function View3D() {
  const cameraControlsRef = useRef(null);

  return (
    <div className={"relative h-[700px] w-full flex-grow"}>
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
        <SoftShadows size={10} />

        <Content />

        <GizmoHelper alignment={"bottom-right"}>
          <GizmoViewport
            axisColors={["#FA7070", "#90D26D", "#7AA2E3"]}
            labelColor="white"
            hideNegativeAxes={true}
          />
        </GizmoHelper>
      </Canvas>

      <Menu />
    </div>
  );
}
