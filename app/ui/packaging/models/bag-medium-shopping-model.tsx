import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { GetHSV } from "@/app/lib/utilities";

const modelPath = "/models/bag-medium-shopping.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function BagMediumShoppingModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.bag.geometry}
        scale={size.map((s) => s * 10) as Vector3}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
