import React, { Ref, useRef } from "react";
import { Decal, useGLTF } from "@react-three/drei";
import { GetHSV } from "@/app/lib/utilities";
import { Vector3 } from "@react-three/fiber";
import { Model } from "@/app/lib/3d";
import * as THREE from "three";

const modelPath = "/models/bag-coffee-2.glb";

interface Props {
  size: number[];
  baseColor: number[];
  canvasRef: Ref<HTMLCanvasElement>;
}

export function BagCoffeeModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
  canvasRef,
}: Props) {
  const { nodes, materials } = useGLTF(modelPath);

  // @ts-ignore
  const canvasTexture = new THREE.CanvasTexture(canvasRef.current);

  return (
    <group dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.Default.geometry}
        scale={size.map((s) => s * 10) as Vector3}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
      </mesh>
      <mesh
        //@ts-ignore
        geometry={nodes.Cube.geometry}
        position={[0, 1.1, 0]}
        scale={[
          -0.054 * size[0] * 10,
          -0.115 * size[1] * 10,
          -0.047 * size[2] * 10,
        ]}
      >
        <Decal
          debug={true}
          position={[0, 0.13, 0]}
          rotation={[0, 0, 0]}
          scale={[0.1, 0.25, 0.1]}
        >
          <meshBasicMaterial
            polygonOffset
            polygonOffsetFactor={-1}
            map={canvasTexture}
            transparent={true}
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
