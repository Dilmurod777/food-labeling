import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { GetHSV } from "@/app/lib/utilities";

const modelPath = "/models/can-paint-tin-tall.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function CanPaintTinTallModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.can.geometry}
        scale={size.map((s) => s * 30) as Vector3}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes.top.geometry}
        scale={size.map((s) => s * 30) as Vector3}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes.paint.geometry}
        scale={size.map((s) => s * 30) as Vector3}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
      <mesh
        // @ts-ignore
        geometry={nodes["paint-stain"].geometry}
        scale={size.map((s) => s * 30) as Vector3}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
