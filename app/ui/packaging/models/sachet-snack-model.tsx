import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { GetHSV } from "@/app/lib/utilities";

const modelPath = "/models/sachet-snack.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function SachetSnackModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);

  return (
    <group dispose={null}>
      <mesh
        //@ts-ignore
        geometry={nodes.Default.geometry}
        scale={[size[1], size[2], size[0]].map((s) => s * 30) as Vector3}
      >
        <meshBasicMaterial color={GetHSV(baseColor)} />
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
