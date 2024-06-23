"use client";

import React, { useEffect, useRef, useState } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { GetHSV } from "@/app/lib/utilities";
import * as THREE from "three";
import { CanvasEvents } from "@/app/lib/3d";

const modelPath = "/models/can-paint-tin-short-2.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function CanPaintTinShortModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);

  const [canvasTextures, setCanvasTextures] = useState<THREE.CanvasTexture[]>();

  useEffect(() => {
    window.addEventListener(CanvasEvents.UpdateModel, function (e) {
      // @ts-ignore
      const { side1, side2, top } = e.detail;

      const sideTexture1 = new THREE.CanvasTexture(side1);
      sideTexture1.needsUpdate = false;

      const sideTexture2 = new THREE.CanvasTexture(side2);
      sideTexture2.needsUpdate = false;

      const topTexture = new THREE.CanvasTexture(top);
      topTexture.needsUpdate = false;

      setCanvasTextures([sideTexture1, sideTexture2, topTexture]);
    });
  }, []);

  return (
    <group dispose={null} scale={size.map((s) => s * 40) as Vector3}>
      <mesh
        // @ts-ignore
        geometry={nodes.Default001.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes.Default.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes.Default003.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
        {canvasTextures && canvasTextures.length == 3 && (
          <>
            <Decal
              debug={false}
              position={[0, 0.032, 0.03]}
              rotation={[0, 0, 0]}
              scale={[0.12, 0.06, 0.05]}
            >
              <meshBasicMaterial
                polygonOffset
                polygonOffsetFactor={-1}
                map={canvasTextures[0]}
                transparent
              />
            </Decal>
            <Decal
              debug={false}
              position={[0, 0.032, -0.03]}
              rotation={[0, 0, 0]}
              scale={[0.12, 0.06, 0.05]}
            >
              <meshBasicMaterial
                polygonOffset
                polygonOffsetFactor={-1}
                map={canvasTextures[1]}
                transparent
              />
            </Decal>
          </>
        )}
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes.Default002.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
        {canvasTextures && canvasTextures.length == 3 && (
          <Decal
            debug={false}
            position={[0, 0.07, 0]}
            rotation={[Math.PI / 2, Math.PI, 0]}
            scale={[0.07, 0.07, 0.02]}
          >
            <meshBasicMaterial
              polygonOffset
              polygonOffsetFactor={-1}
              map={canvasTextures[2]}
              transparent
            />
          </Decal>
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
