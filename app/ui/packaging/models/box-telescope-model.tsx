"use client";

import { Euler, Vector3 } from "@react-three/fiber";
import {
  DoubleSide,
  Group,
  Mesh,
  MultiplyBlending,
  NoBlending,
  NormalBlending,
  Quaternion,
} from "three";
import React, { Ref, useEffect, useRef, useState } from "react";
import {
  AddVectors,
  CanvasEvents,
  Data3D,
  SubtractVectors,
} from "@/app/lib/3d";
import { BBAnchor, Box, useGLTF } from "@react-three/drei";
import { groupStackFramesByFramework } from "next/dist/client/components/react-dev-overlay/internal/helpers/group-stack-frames-by-framework";
import { GetHSV } from "@/app/lib/utilities";
import * as THREE from "three";

const modelPath = "/models/box-gift-2.glb";

interface Props {
  size: number[];
  baseColor: number[];
  step: number;
}

export default function BoxTelescopeModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
  step = 0,
}: Props) {
  const meshRefs: Ref<Group>[] = [useRef(null), useRef(null)];
  const { nodes, materials } = useGLTF(modelPath);

  const [canvasTextures, setCanvasTextures] = useState<THREE.CanvasTexture[]>();

  useEffect(() => {
    window.addEventListener(CanvasEvents.UpdateModel, function (e) {
      // @ts-ignore
      const { top, bottom } = e.detail;

      const topCanvas = document.createElement("canvas");
      const topCanvasCtx = topCanvas.getContext("2d");
      if (topCanvasCtx) {
        topCanvasCtx.drawImage(top, 0, 0);
        topCanvasCtx.globalCompositeOperation = "destination-over";
        topCanvasCtx.fillStyle = GetHSV(baseColor);
        topCanvasCtx.fillRect(0, 0, top.width, top.height);
      }

      const bottomCanvas = document.createElement("canvas");
      const bottomCanvasCtx = bottomCanvas.getContext("2d");
      if (bottomCanvasCtx) {
        bottomCanvasCtx.drawImage(bottom, 0, 0);
        bottomCanvasCtx.globalCompositeOperation = "destination-over";
        bottomCanvasCtx.fillStyle = GetHSV(baseColor);
        bottomCanvasCtx.fillRect(0, 0, top.width, top.height);
      }

      const topTexture = new THREE.CanvasTexture(topCanvas);
      topTexture.needsUpdate = true;
      topTexture.repeat.set(1, 1);
      topTexture.offset.set(-0.25, 0);

      const bottomTexture = new THREE.CanvasTexture(bottomCanvas);
      bottomTexture.needsUpdate = true;
      bottomTexture.repeat.set(1, 1);
      bottomTexture.offset.set(-0.5, 0);

      setCanvasTextures([topTexture, bottomTexture]);
    });
  }, []);

  useEffect(() => {
    const top = meshRefs[0];
    if (!top) return;

    if (step < 10) {
      // @ts-ignore
      top.current.position.y = (step * size[1]) / 10 / 5;
    }
  }, [step]);

  return (
    <group dispose={null} scale={size.map((s) => s * 20) as Vector3}>
      <group ref={meshRefs[0]}>
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
          geometry={nodes["top-printable"].geometry}
          castShadow
          receiveShadow
          scale={1.005}
        >
          <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
          {canvasTextures?.length == 2 && (
            <meshStandardMaterial
              attach="material"
              color={GetHSV(baseColor)}
              map={canvasTextures[0]}
            />
          )}
        </mesh>
      </group>

      <group ref={meshRefs[1]}>
        <mesh
          // @ts-ignore
          geometry={nodes["bottom-printable"].geometry}
          castShadow
          receiveShadow
          scale={1.003}
          position={[0, -0.001, 0]}
        >
          <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
          {canvasTextures?.length == 2 && (
            <meshStandardMaterial
              attach="material"
              color={GetHSV(baseColor)}
              map={canvasTextures[1]}
            />
          )}
        </mesh>
        <mesh
          // @ts-ignore
          geometry={nodes.Default001.geometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
