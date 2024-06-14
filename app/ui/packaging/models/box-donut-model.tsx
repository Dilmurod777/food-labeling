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

export default function BoxDonutModel({
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
    ],
  };

  useEffect(() => {
    const obj3 = meshRefs[3];
    const obj5 = meshRefs[5];
    const obj1 = meshRefs[1];
    const obj2 = meshRefs[2];

    if (step <= 5) {
      //@ts-ignore
      obj3.current.rotation.z = (step * Math.PI) / 2 / 5;
      //@ts-ignore
      obj3.current.position.x = -(step * width) / 2 / 5;
      //@ts-ignore
      obj3.current.position.y = height + (step * width) / 2 / 5;
    }
  }, [step]);

  return (
    <group position={[0, 0, 0]}>
      <group>
        {/*bottom*/}
        <Side
          meshRef={meshRefs[0] ?? null}
          width={width}
          height={depth}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2]])}
        />

        {/*top*/}
        <group
          position={[0, height + 0.01, 0]}
          ref={meshRefs[3] ?? null}
          rotation={[0, 0, 0]}
        >
          <Side
            meshRef={meshRefs[4] ?? null}
            width={width}
            height={width / 2}
            position={[0, -width / 4, depth / 2 - 0.01]}
            rotation={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 1])}
          />
          <Side
            meshRef={meshRefs[4] ?? null}
            width={width}
            height={width / 2}
            position={[0, -width / 4, -depth / 2 + 0.01]}
            rotation={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 1])}
          />
          <Side
            meshRef={meshRefs[4] ?? null}
            width={width}
            height={depth}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
          <Side
            meshRef={meshRefs[5] ?? null}
            width={width / 3}
            height={depth}
            position={[width / 2, -width / 3 / 2, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 2])}
          />
        </group>

        {/*side*/}
        <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <Side
            meshRef={meshRefs[6] ?? null}
            width={height}
            height={depth}
            position={[width / 2, height / 2, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 2])}
          />
          <Side
            meshRef={meshRefs[7] ?? null}
            width={width}
            height={height}
            position={[0, height / 2, depth / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
          <Side
            meshRef={meshRefs[8] ?? null}
            width={width}
            height={height}
            position={[0, height / 2, -depth / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
          <Side
            meshRef={meshRefs[9] ?? null}
            width={height}
            height={depth}
            position={[-width / 2, height / 2, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 2])}
          />
        </group>
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
