import { Euler, Vector3 } from "@react-three/fiber";
import { DoubleSide, Group } from "three";
import { Ref, useEffect, useRef } from "react";
import { SubtractVectors } from "@/app/lib/3d";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  width?: number;
  height?: number;
  depth?: number;
  step: number;
  totalSteps: number;
  baseColor: number[];
}

interface Data3D {
  meshRefs: Ref<Group>[];
}

export default function BoxSlideModel({
  step,
  totalSteps,
  width = 1,
  height = 3,
  depth = 1,
  baseColor = [34, 0, 82],
}: Props) {
  const { meshRefs }: Data3D = {
    meshRefs: [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
    ],
  };

  useEffect(() => {
    const obj6 = meshRefs[6];

    if (step <= 5) {
      //@ts-ignore
      obj6.current.position.x = -(step * width * 1.5) / 5;
    }
  }, [step]);

  return (
    <group position={[0, 0, 0]}>
      {/*bottom*/}
      <group
        position={[0, 0, 0]}
        ref={meshRefs[0] ?? null}
        rotation={[0, 0, 0]}
      >
        <Side
          meshRef={meshRefs[1] ?? null}
          width={width}
          height={depth}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2]])}
        />
        <Side
          meshRef={meshRefs[2] ?? null}
          width={height}
          height={depth}
          position={[width / 2, height / 2, 0]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          anchor={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 2])}
        />
        <Side
          meshRef={meshRefs[3] ?? null}
          width={width}
          height={height}
          position={[0, height / 2, depth / 2]}
          rotation={[0, 0, 0]}
          anchor={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
        />
        <Side
          meshRef={meshRefs[4] ?? null}
          width={width}
          height={height}
          position={[0, height / 2, -depth / 2]}
          rotation={[0, 0, 0]}
          anchor={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
        />
        <Side
          meshRef={meshRefs[5] ?? null}
          width={height}
          height={depth}
          position={[-width / 2, height / 2, 0]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          anchor={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 2])}
        />
      </group>
      {/*top*/}
      <group
        position={[0, 0, 0]}
        ref={meshRefs[6] ?? null}
        rotation={[0, 0, 0]}
      >
        <Side
          meshRef={meshRefs[7] ?? null}
          width={width}
          height={depth}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2]])}
        />
        <Side
          meshRef={meshRefs[8] ?? null}
          width={width}
          height={depth}
          position={[0, height, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2]])}
        />
        <Side
          meshRef={meshRefs[9] ?? null}
          width={width}
          height={height}
          position={[0, height / 2, depth / 2]}
          rotation={[0, 0, 0]}
          anchor={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
        />
        <Side
          meshRef={meshRefs[10] ?? null}
          width={width}
          height={height}
          position={[0, height / 2, -depth / 2]}
          rotation={[0, 0, 0]}
          anchor={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
        />
      </group>
    </group>
  );
}

function Side({
  meshRef = null,
  width = 1,
  height = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#D1BB9E",
  anchor = [0, 0, 0],
}: {
  meshRef?: Ref<Group>;
  width?: number;
  height?: number;
  depth?: number;
  position?: [number, number, number];
  rotation?: Euler;
  color?: string;
  anchor?: [number, number, number];
}) {
  return (
    <group
      position={SubtractVectors<Vector3>(position, anchor)}
      ref={meshRef}
      rotation={rotation}
    >
      <mesh position={anchor} castShadow receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial side={DoubleSide} color={color} />
      </mesh>
    </group>
  );
}
