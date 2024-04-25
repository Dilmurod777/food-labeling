import { Euler, Vector3 } from "@react-three/fiber";
import {
  DoubleSide,
  Group,
  Mesh,
  MultiplyBlending,
  NoBlending,
  NormalBlending,
} from "three";
import { Ref, useEffect, useRef } from "react";
import { AddVectors, Data3D, SubtractVectors } from "@/app/lib/3d";
import { BBAnchor, Box } from "@react-three/drei";
import { groupStackFramesByFramework } from "next/dist/client/components/react-dev-overlay/internal/helpers/group-stack-frames-by-framework";

interface Props {
  width?: number;
  height?: number;
  depth?: number;
  step: number;
  totalSteps: number;
}

export default function DefaultPackage({
  step,
  totalSteps,
  width = 3,
  height = 2,
  depth = 0.75,
}: Props) {
  const { meshRefs }: Data3D = {
    meshRefs: {
      top: [useRef(null), useRef(null)],
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

  // useEffect(() => {
  //   const obj = meshRefs.bottom[1];
  //
  //   if (obj) {
  //     // @ts-ignore
  //     obj.current.rotation.y = (step * Math.PI) / 2 / totalSteps;
  //   }
  // }, [step]);

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
          color={"#EAD8C0"}
        />

        <group position={[(width + depth) / 2, 0, 0]}>
          <Side
            meshRef={meshRefs.bottom[1] ?? null}
            width={depth}
            height={height}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[depth / 2, 0, 0]}
            color={"#EAD8C0"}
          />
          <Side
            meshRef={meshRefs.bottom[2] ?? null}
            width={depth}
            height={depth}
            position={[-depth, depth / 2, height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#EAD8C0"}
          />
          <Side
            meshRef={meshRefs.bottom[3] ?? null}
            width={depth}
            height={depth}
            position={[-depth, depth / 2, -height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#EAD8C0"}
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
            color={"#EAD8C0"}
          />
          <Side
            meshRef={meshRefs.bottom[5] ?? null}
            width={depth}
            height={depth}
            position={[depth, depth / 2, height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#EAD8C0"}
          />
          <Side
            meshRef={meshRefs.bottom[6] ?? null}
            width={depth}
            height={depth}
            position={[depth, depth / 2, -height / 2]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#EAD8C0"}
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
            color={"#EAD8C0"}
          />
          <Side
            meshRef={meshRefs.bottom[8] ?? null}
            width={width}
            height={depth}
            position={[0, depth / 2, -height / 2 - 0.001]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#EAD8C0"}
          />
        </group>
      </group>
      {/*top*/}
      <group rotation={[0, 0, Math.PI]} position={[0, 1.2, 0]}>
        <Side
          meshRef={meshRefs.bottom[0] ?? null}
          width={width + 0.1}
          height={height + 0.1}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={"#A79277"}
        />

        <group position={[(width + depth) / 2, 0, 0]}>
          <Side
            meshRef={meshRefs.bottom[1] ?? null}
            width={depth + 0.1}
            height={height + 0.1}
            position={[0.05, 0.05, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[depth / 2, 0, 0]}
            color={"#D1BB9E"}
          />
          <Side
            meshRef={meshRefs.bottom[2] ?? null}
            width={depth + 0.1}
            height={depth + 0.1}
            position={[-depth, depth / 2 + 0.05, height / 2 + 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#D1BB9E"}
          />
          <Side
            meshRef={meshRefs.bottom[3] ?? null}
            width={depth + 0.1}
            height={depth + 0.1}
            position={[-depth, depth / 2 + 0.05, -height / 2 - 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#D1BB9E"}
          />
        </group>
        <group position={[-(width + depth) / 2, 0, 0]} rotation={[0, 0, 0]}>
          <Side
            meshRef={meshRefs.bottom[4] ?? null}
            width={depth + 0.1}
            height={height + 0.1}
            position={[depth - 0.05, 0.05, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            anchor={[depth / 2, 0, 0]}
            color={"#D1BB9E"}
          />
          <Side
            meshRef={meshRefs.bottom[5] ?? null}
            width={depth + 0.1}
            height={depth + 0.1}
            position={[depth, depth / 2 + 0.05, height / 2 + 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#D1BB9E"}
          />
          <Side
            meshRef={meshRefs.bottom[6] ?? null}
            width={depth + 0.1}
            height={depth + 0.1}
            position={[depth, depth / 2 + 0.05, -height / 2 - 0.05]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#D1BB9E"}
          />
        </group>

        <group>
          <Side
            meshRef={meshRefs.bottom[7] ?? null}
            width={width + 0.1}
            height={depth + 0.1}
            position={[0, depth / 2 + 0.05, height / 2 + 0.051]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#D1BB9E"}
          />
          <Side
            meshRef={meshRefs.bottom[8] ?? null}
            width={width + 0.1}
            height={depth + 0.1}
            position={[0, depth / 2 + 0.05, -height / 2 - 0.051]}
            rotation={[0, 0, 0]}
            anchor={[0, 0, 0]}
            color={"#D1BB9E"}
          />
        </group>
      </group>
    </group>
  );
}

function Side({
  meshRef,
  width = 1,
  height = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#D1BB9E",
  anchor = [0, 0, 0],
}: {
  meshRef: Ref<Group>;
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
