import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GetHSV } from "@/app/lib/utilities";
import { Vector3 } from "@react-three/fiber";

const modelPath = "/models/sachet-drink.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function SachetDrinkModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.FBX_PolyPart_56926.geometry}
        scale={size.map((s) => s * 0.4) as Vector3}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
