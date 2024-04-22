import { Euler, Vector3 } from "@react-three/fiber";
import { DoubleSide, Group, Mesh } from "three";
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
      ],
      side1: [useRef(null)],
      side2: [useRef(null)],
      side3: [useRef(null)],
      side4: [useRef(null)],
    },
  };

  useEffect(() => {
    const obj = meshRefs.bottom[1];

    if (obj) {
      // @ts-ignore
      obj.current.rotation.y = (step * Math.PI) / 2 / totalSteps;
    }
  }, [step]);

  return (
    <group position={[0, 0, 0]}>
      {/*bottom*/}
      <Side
        meshRef={meshRefs.bottom[0] ?? null}
        width={width}
        height={height}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <group position={[(width + depth) / 2, 0, 0]}>
        <Side
          meshRef={meshRefs.bottom[1] ?? null}
          width={depth}
          height={height}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          anchor={[depth / 2, 0, 0]}
          color={"red"}
        />
        <Side
          meshRef={meshRefs.bottom[2] ?? null}
          width={depth}
          height={depth}
          position={[0, 0, (height + depth) / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Side
          meshRef={meshRefs.bottom[3] ?? null}
          width={depth}
          height={depth}
          position={[0, 0, -(height + depth) / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
      <group position={[-(width + depth) / 2, 0, 0]} rotation={[0, 0, 0]}>
        <Side
          meshRef={meshRefs.bottom[4] ?? null}
          width={depth}
          height={height}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Side
          meshRef={meshRefs.bottom[5] ?? null}
          width={depth}
          height={depth}
          position={[0, 0, (height + depth) / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Side
          meshRef={meshRefs.bottom[6] ?? null}
          width={depth}
          height={depth}
          position={[0, 0, -(height + depth) / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
      {/*top*/}
      {/*<Side*/}
      {/*  meshRef={meshRefs.top[0] ?? null}*/}
      {/*  width={width / 2}*/}
      {/*  height={height}*/}
      {/*  position={[-width / 4, height, 0]}*/}
      {/*  rotation={[Math.PI / 2, 0, 0]}*/}
      {/*/>*/}
      {/*<Side*/}
      {/*  meshRef={meshRefs.top[1] ?? null}*/}
      {/*  width={width / 2}*/}
      {/*  height={height}*/}
      {/*  position={[width / 4, height, 0]}*/}
      {/*  rotation={[Math.PI / 2, 0, 0]}*/}
      {/*/>*/}
      {/*/!*sides*!/*/}
      {/*<Side*/}
      {/*  meshRef={meshRefs.side1[0] ?? null}*/}
      {/*  width={width}*/}
      {/*  height={height}*/}
      {/*  position={[0, height / 2, width / 2]}*/}
      {/*  rotation={[0, 0, 0]}*/}
      {/*/>*/}
      {/*<Side*/}
      {/*  meshRef={meshRefs.side2[0] ?? null}*/}
      {/*  width={width}*/}
      {/*  height={height}*/}
      {/*  position={[0, height / 2, -width / 2]}*/}
      {/*  rotation={[0, 0, 0]}*/}
      {/*/>*/}
      {/*<Side*/}
      {/*  meshRef={meshRefs.side3[0] ?? null}*/}
      {/*  width={width}*/}
      {/*  height={height}*/}
      {/*  position={[width / 2, height / 2, 0]}*/}
      {/*  rotation={[0, Math.PI / 2, 0]}*/}
      {/*/>*/}
      {/*<Side*/}
      {/*  meshRef={meshRefs.side4[0] ?? null}*/}
      {/*  width={width}*/}
      {/*  height={height}*/}
      {/*  position={[-width / 2, height / 2, 0]}*/}
      {/*  rotation={[0, Math.PI / 2, 0]}*/}
      {/*/>*/}
    </group>
  );
}

function Side({
  meshRef,
  width = 1,
  height = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#3f4a56",
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
      <mesh position={anchor}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={color} side={DoubleSide} />
      </mesh>
    </group>
  );
}
