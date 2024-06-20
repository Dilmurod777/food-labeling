"use client";

import React, { Ref, useEffect, useMemo, useRef, useState } from "react";
import {
  Decal,
  KeyboardControls,
  KeyboardControlsEntry,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { GetHSV } from "@/app/lib/utilities";
import { useThree, Vector3 } from "@react-three/fiber";
import { CanvasEvents, CanvasTexture } from "@/app/lib/3d";
import * as THREE from "three";

const modelPath = "/models/pouch-chips-2.glb";

interface Props {
  size: number[];
  baseColor: number[];
  canvasRef: Ref<HTMLCanvasElement>;
}

export function PouchChipsModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
  canvasRef,
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);
  const meshRef = useRef(null);

  //@ts-ignore
  const initialTexture = new THREE.CanvasTexture(canvasRef.current);
  initialTexture.needsUpdate = false;
  const [canvasTexture, setCanvasTexture] =
    useState<THREE.CanvasTexture>(initialTexture);

  useEffect(() => {
    window.addEventListener(CanvasEvents.UpdateModel, function () {
      //@ts-ignore
      const texture = new THREE.CanvasTexture(canvasRef.current);
      texture.needsUpdate = false;
      setCanvasTexture(texture);
    });
  }, []);

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        //@ts-ignore
        geometry={nodes.Dorrito001_Lays_0.geometry}
        scale={size.map((s) => s * 0.1) as Vector3}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
        <Decal
          debug={false}
          position={[0, 0, 6]}
          rotation={[0, 0, 0]}
          scale={[30, 45, 15]}
        >
          <meshBasicMaterial
            polygonOffset
            polygonOffsetFactor={-1}
            map={canvasTexture}
            transparent={true}
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
