import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GetHSV } from "@/app/lib/utilities";
import { Vector3 } from "@react-three/fiber";
import { Model } from "@/app/lib/3d";

const modelPath = "/models/bag-coffee.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function BagCoffeeModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.Default.geometry}
        scale={size.map((s) => s * 10) as Vector3}
        castShadow
        receiveShadow
      >
        <meshBasicMaterial color={GetHSV(baseColor)} />
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
