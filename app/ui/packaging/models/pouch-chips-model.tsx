import React, { useMemo, useRef, useState } from "react";
import {
  Decal,
  KeyboardControls,
  KeyboardControlsEntry,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { GetHSV } from "@/app/lib/utilities";
import { useThree, Vector3 } from "@react-three/fiber";

const modelPath = "/models/pouch-chips.glb";

interface Props {
  size: number[];
  baseColor: number[];
}

export function PouchChipsModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
}: Props) {
  const { camera } = useThree();
  const { nodes, materials } = useGLTF(modelPath);
  const meshRef = useRef(null);

  const texture = useTexture("/preview/bag-coffee.png");

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
          debug={true}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
        >
          <meshBasicMaterial
            polygonOffset
            polygonOffsetFactor={-1}
            map={texture}
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
