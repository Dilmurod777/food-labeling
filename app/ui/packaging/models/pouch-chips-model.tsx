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
}

export function PouchChipsModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);
  const meshRef = useRef(null);

  const [canvasTextures, setCanvasTextures] = useState<THREE.CanvasTexture[]>();

  useEffect(() => {
    window.addEventListener(CanvasEvents.UpdateModel, function (e) {
      // @ts-ignore
      const { front, back } = e.detail;

      const frontTexture = new THREE.CanvasTexture(front);
      frontTexture.needsUpdate = false;

      const backTexture = new THREE.CanvasTexture(back);
      backTexture.needsUpdate = false;

      setCanvasTextures([frontTexture, backTexture]);
    });
  }, []);

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        //@ts-ignore
        geometry={nodes.Dorrito001_Lays_0_1.geometry}
        scale={size.map((s) => s * 0.1) as Vector3}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
        {canvasTextures && canvasTextures.length == 2 && (
          <Decal
            debug={false}
            position={[0, 0, -6]}
            rotation={[0, Math.PI, 0]}
            scale={[30, 45, 15]}
          >
            <meshBasicMaterial
              polygonOffset
              polygonOffsetFactor={-1}
              map={canvasTextures[0]}
              transparent
            />
          </Decal>
        )}
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes.Dorrito001_Lays_0_2.geometry}
        castShadow
        receiveShadow
        scale={size.map((s) => s * 0.1) as Vector3}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
        {canvasTextures && canvasTextures.length == 2 && (
          <Decal
            debug={false}
            position={[0, 0, 6]}
            rotation={[0, 0, 0]}
            scale={[30, 45, 15]}
          >
            <meshBasicMaterial
              polygonOffset
              polygonOffsetFactor={-1}
              map={canvasTextures[1]}
              transparent
            />
          </Decal>
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
