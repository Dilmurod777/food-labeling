import { Euler, Vector3 } from "@react-three/fiber";
import {
  DoubleSide,
  Group,
  Mesh,
  MultiplyBlending,
  NoBlending,
  NormalBlending,
  Quaternion,
} from "three";
import { Ref, useEffect, useRef } from "react";
import { AddVectors, Data3D, SubtractVectors } from "@/app/lib/3d";
import { BBAnchor, Box } from "@react-three/drei";
import { groupStackFramesByFramework } from "next/dist/client/components/react-dev-overlay/internal/helpers/group-stack-frames-by-framework";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  width?: number;
  height?: number;
  depth?: number;
  step: number;
  totalSteps: number;
  baseColor: number[];
}

export default function TelescopeBoxModel({
  step,
  totalSteps,
  width = 3,
  height = 2,
  depth = 0.75,
  baseColor = [34, 0, 82],
}: Props) {
  const { meshRefs }: Data3D = {
    meshRefs: {
      top: [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
      ],
      bottom: [
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
      side1: [useRef(null)],
      side2: [useRef(null)],
      side3: [useRef(null)],
      side4: [useRef(null)],
    },
  };

  useEffect(() => {
    const topCover = meshRefs.top[0];
    const topCover01 = meshRefs.top[1];
    const topCover02 = meshRefs.top[2];
    const topCover03 = meshRefs.top[3];
    const topCover04 = meshRefs.top[4];

    if (topCover) {
      if (step >= 0 && step < 5) {
        // @ts-ignore
        topCover.current.position.y = 1.2 + 0.4 * step;
      }

      if (step >= 5 && step <= 15) {
        // @ts-ignore
        topCover.current.rotation.z =
          Math.PI - ((step - 5) * 18 * Math.PI) / 180;
        // @ts-ignore
        topCover.current.position.x = 0.5 * (step - 5);
      }

      if (step >= 15 && step <= 21) {
        // @ts-ignore
        topCover.current.position.y = 2.4 - 0.4 * (step - 15);
      }

      // if (step >= 22 && step <= 27) {
      //   // @ts-ignore
      //   topCover01.current.rotation.z = -((step - 22) * 18 * Math.PI) / 180;
      //   // @ts-ignore
      //   topCover01.current.position.x =
      //     (width + depth) / 2 - (step - 22) * 0.065;
      //   // @ts-ignore
      //   topCover01.current.position.y = -(step - 22) * 0.065;
      // }

      // if (step >= 28 && step <= 32) {
      //   // @ts-ignore
      //   topCover03.current.rotation.y = ((step - 28) * 18 * Math.PI) / 180;
      //   // @ts-ignore
      //   topCover03.current.position.x = -depth + (step - 22) * 0.01;
      //   // // @ts-ignore
      //   // topCover01.current.position.y = -(step - 22) * 0.065;
      // }
    }
  }, [step]);

  // const baseColor = [167, 146, 119];
  // const baseColor = [34, 23, 60];
  // #a79277
  // #D1BB9E

  return (
    <group position={[0, 0, 0]}>
      {/*bottom*/}
      <group>
        <Side
          meshRef={meshRefs.bottom[0] ?? null}
          width={width}
          height={height}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2]])}
        />

        <group position={[(width + depth) / 2, 0, 0]}>
          <Side
            meshRef={meshRefs.bottom[1] ?? null}
            width={depth}
            height={height}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[depth / 2, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
          <Side
            meshRef={meshRefs.bottom[2] ?? null}
            width={depth}
            height={depth}
            position={[-depth, depth / 2, height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
          <Side
            meshRef={meshRefs.bottom[3] ?? null}
            width={depth}
            height={depth}
            position={[-depth, depth / 2, -height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
        </group>
        <group position={[-(width + depth) / 2, 0, 0]} rotation={[0, 0, 0]}>
          <Side
            meshRef={meshRefs.bottom[4] ?? null}
            width={depth}
            height={height}
            position={[depth, 0, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[depth / 2, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
          <Side
            meshRef={meshRefs.bottom[5] ?? null}
            width={depth}
            height={depth}
            position={[depth, depth / 2, height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
          <Side
            meshRef={meshRefs.bottom[6] ?? null}
            width={depth}
            height={depth}
            position={[depth, depth / 2, -height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 5])}
          />
        </group>

        <group>
          <Side
            meshRef={meshRefs.bottom[7] ?? null}
            width={width}
            height={depth}
            position={[0, depth / 2, height / 2 + 0.001]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 7])}
          />
          <Side
            meshRef={meshRefs.bottom[8] ?? null}
            width={width}
            height={depth}
            position={[0, depth / 2, -height / 2 - 0.001]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 7])}
          />
        </group>
      </group>
      {/*top*/}
      <group
        rotation={[0, 0, Math.PI]}
        position={[0, 1.2, 0]}
        ref={meshRefs.top[0] ?? null}
      >
        <Side
          width={width + 0.1}
          height={height + 0.1}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV(baseColor)}
        />

        <group position={[(width + depth) / 2, 0, 0]} ref={meshRefs.top[1]}>
          <Side
            width={depth + 0.1}
            height={height + 0.1}
            position={[0.05, 0.05, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[depth / 2, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 5])}
            meshRef={meshRefs.top[2]}
          />
          <Side
            width={depth + 0.1}
            height={depth + 0.1}
            position={[-depth, depth / 2 + 0.05, height / 2 + 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 5])}
            meshRef={meshRefs.top[3]}
          />
          <Side
            width={depth + 0.1}
            height={depth + 0.1}
            position={[-depth, depth / 2 + 0.05, -height / 2 - 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 5])}
            meshRef={meshRefs.top[4]}
          />
        </group>
        <group position={[-(width + depth) / 2, 0, 0]} rotation={[0, 0, 0]}>
          <Side
            width={depth + 0.1}
            height={height + 0.1}
            position={[depth - 0.05, 0.05, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[depth / 2, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 5])}
          />
          <Side
            width={depth + 0.1}
            height={depth + 0.1}
            position={[depth, depth / 2 + 0.05, height / 2 + 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 5])}
          />
          <Side
            width={depth + 0.1}
            height={depth + 0.1}
            position={[depth, depth / 2 + 0.05, -height / 2 - 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 5])}
          />
        </group>

        <group>
          <Side
            width={width + 0.1}
            height={depth + 0.1}
            position={[0, depth / 2 + 0.05, height / 2 + 0.051]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 2])}
          />
          <Side
            width={width + 0.1}
            height={depth + 0.1}
            position={[0, depth / 2 + 0.05, -height / 2 - 0.051]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 2])}
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
