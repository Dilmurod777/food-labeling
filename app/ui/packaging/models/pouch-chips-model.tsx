import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Decal,
  KeyboardControls,
  KeyboardControlsEntry,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { GetHSV } from "@/app/lib/utilities";
import { useThree, Vector3 } from "@react-three/fiber";
import { CanvasTexture } from "@/app/lib/3d";
import * as THREE from "three";

const modelPath = "/models/pouch-chips.glb";

interface Props {
  size: number[];
  baseColor: number[];
  textures: CanvasTexture[];
}

export function PouchChipsModel({
  size = [1, 1, 1],
  baseColor = [34, 0, 82],
  textures = [],
}: Props) {
  const { camera } = useThree();
  const { nodes, materials } = useGLTF(modelPath);
  const meshRef = useRef(null);
  const [currentTextures, setCurrentTextures] = useState<THREE.Texture[]>([]);
  const textureLoader = new THREE.TextureLoader();

  useEffect(() => {
    loadTextures();
  }, [textures]);

  const loadTextures = async () => {
    const newTextures = await Promise.all(
      textures.map((t) => textureLoader.loadAsync(t.img)),
    );
    setCurrentTextures(newTextures);
  };

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        //@ts-ignore
        geometry={nodes.Dorrito001_Lays_0.geometry}
        scale={size.map((s) => s * 0.1) as Vector3}
      >
        <meshStandardMaterial attach="material" color={GetHSV(baseColor)} />
        {currentTextures.map((t, i) => (
          <Decal
            key={`decal-${i}`}
            debug={false}
            position={[
              -15 + textures[i].position.x * 30,
              15 - textures[i].position.y * 30,
              11,
            ]}
            rotation={[0, 0, 0]}
            scale={[10, 10, 20]}
          >
            <meshBasicMaterial
              polygonOffset
              polygonOffsetFactor={-1}
              map={t}
              transparent={true}
            />
          </Decal>
        ))}
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
