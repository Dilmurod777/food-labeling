import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { GetHSV } from "@/app/lib/utilities";

const modelPath = "/models/can-paint-tin-short.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function CanPaintTinShortModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group dispose={null}>
      <mesh
        //@ts-ignore
        geometry={nodes.Default.geometry}
        scale={size.map((s) => s * 40) as Vector3}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes.Default_1.geometry}
        scale={size.map((s) => s * 40) as Vector3}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
