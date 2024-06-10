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
import { AddVectors, SubtractVectors } from "@/app/lib/3d";
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

interface Data3D {
  meshRefs: Ref<Group>[];
}

export default function FullOverlapSlottedContainer({
  step,
  totalSteps,
  width = 3,
  height = 2,
  depth = 0.75,
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
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
    ],
  };

  useEffect(() => {
    const obj = meshRefs[14];

    const obj1 = meshRefs[1];
    const obj2 = meshRefs[2];
    const obj8 = meshRefs[8];
    const obj9 = meshRefs[9];
    const obj4 = meshRefs[4];
    const obj5 = meshRefs[5];
    const obj11 = meshRefs[11];
    const obj12 = meshRefs[12];
    const obj13 = meshRefs[13];
    const obj6 = meshRefs[6];
    const obj15 = meshRefs[15];

    if (step >= 0 && step <= 5) {
      // @ts-ignore
      obj.current.rotation.x = Math.PI / 2 - (step * 18 * Math.PI) / 180;
      // @ts-ignore
      obj.current.position.y = height / 2 - (step * height) / 2 / 5;
      // @ts-ignore
      obj1.current.rotation.x = 0;
      //@ts-ignore
      obj1.current.position.y = depth / 2;
      //@ts-ignore
      obj1.current.position.z = height / 2;
      // @ts-ignore
      obj2.current.rotation.x = 0;
      //@ts-ignore
      obj2.current.position.y = depth / 2;
      //@ts-ignore
      obj2.current.position.z = -height / 2;
      // @ts-ignore
      obj8.current.rotation.x = 0;
      //@ts-ignore
      obj8.current.position.y = depth / 2;
      //@ts-ignore
      obj8.current.position.z = -height / 2;
      // @ts-ignore
      obj9.current.rotation.x = 0;
      //@ts-ignore
      obj9.current.position.y = depth / 2;
      //@ts-ignore
      obj9.current.position.z = -height / 2;
    }

    if (step >= 6 && step <= 10) {
      // @ts-ignore
      obj1.current.rotation.x = ((step - 5) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj1.current.position.y = depth / 2 - ((step - 5) * depth) / 5 / 2;
      // @ts-ignore
      obj1.current.position.z = height / 2 + ((step - 5) * depth) / 5 / 2;

      // @ts-ignore
      obj2.current.rotation.x = -((step - 5) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj2.current.position.y = depth / 2 - ((step - 5) * depth) / 5 / 2;
      // @ts-ignore
      obj2.current.position.z = -height / 2 - ((step - 5) * depth) / 5 / 2;

      // @ts-ignore
      obj8.current.rotation.x = ((step - 5) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj8.current.position.y = depth / 2 - ((step - 5) * depth) / 5 / 2;
      // @ts-ignore
      obj8.current.position.z = height / 2 + ((step - 5) * depth) / 5 / 2;

      // @ts-ignore
      obj9.current.rotation.x = -((step - 5) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj9.current.position.y = depth / 2 - ((step - 5) * depth) / 5 / 2;
      // @ts-ignore
      obj9.current.position.z = -height / 2 - ((step - 5) * depth) / 5 / 2;
    }

    if (step >= 11 && step <= 16) {
      // @ts-ignore
      obj4.current.rotation.x = ((step - 11) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj4.current.position.y = width / 2 - ((step - 11) * width) / 2 / 5;
      // @ts-ignore
      obj4.current.position.z =
        (height + width) / 2 - depth + ((step - 11) * depth) / 5;
      // @ts-ignore
      obj5.current.rotation.x = -((step - 11) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj5.current.position.y = width / 2 - ((step - 11) * width) / 2 / 5;
      // @ts-ignore
      obj5.current.position.z =
        -(height + width) / 2 + depth - ((step - 11) * depth) / 5;
      // @ts-ignore
      obj11.current.rotation.x = -((step - 11) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj11.current.position.y = -width / 2 + ((step - 11) * width) / 2 / 5;
      // @ts-ignore
      obj11.current.position.z =
        (height + width) / 2 - depth + ((step - 11) * depth) / 5;
      // @ts-ignore
      obj12.current.rotation.x = ((step - 11) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj12.current.position.y = -width / 2 + ((step - 11) * width) / 2 / 5;
      // @ts-ignore
      obj12.current.position.z =
        -(height + width) / 2 + depth - ((step - 11) * depth) / 5;
    }

    if (step >= 17 && step <= 22) {
      // @ts-ignore
      obj13.current.rotation.z =
        Math.PI / 2 + ((step - 17) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj13.current.position.x =
        -depth / 2 - width - ((step - 17) * width) / 2 / 2 / 5;
      // @ts-ignore
      obj13.current.position.y = depth / 2 - ((step - 17) * depth) / 2 / 5;
    }

    if (step >= 23 && step <= 28) {
      // @ts-ignore
      obj6.current.rotation.z =
        -Math.PI / 2 + ((step - 23) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj6.current.position.x = -depth / 2 + ((step - 23) * depth) / 2 / 5;
      // @ts-ignore
      obj6.current.position.y = -depth / 2 + ((step - 23) * depth) / 2 / 5;
    }

    if (step >= 29 && step <= 34) {
      // @ts-ignore
      obj15.current.rotation.z =
        Math.PI / 2 + -((step - 29) * 18 * Math.PI) / 180;
      // @ts-ignore
      obj15.current.position.x = depth / 2 + ((step - 29) * depth) / 5;
      // @ts-ignore
      obj15.current.position.y = width / 2 - ((step - 29) * width) / 2 / 5;
    }
  }, [step]);

  return (
    <group
      position={[0, height / 2, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      ref={meshRefs[14]}
    >
      <group
        position={[depth / 2, width / 2, 0]}
        rotation={[0, 0, Math.PI / 2]}
        ref={meshRefs[15]}
      >
        <Side
          meshRef={meshRefs[1] ?? null}
          width={width}
          height={depth}
          position={[0, depth / 2, height / 2 + 0.01]}
          rotation={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 1])}
        />
        <Side
          meshRef={meshRefs[0] ?? null}
          width={width}
          height={height}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 5])}
        />
        <Side
          meshRef={meshRefs[2] ?? null}
          width={width}
          height={depth}
          position={[0, depth / 2, -height / 2 - 0.01]}
          rotation={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 1])}
        />
      </group>
      <group position={[0, 0, 0]}>
        <Side
          meshRef={meshRefs[4] ?? null}
          width={depth}
          height={width}
          position={[0, width / 2, (height + width) / 2 - depth]}
          rotation={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 2])}
        />
        <Side
          meshRef={meshRefs[3] ?? null}
          width={depth}
          height={height}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 3])}
        />
        <Side
          meshRef={meshRefs[5] ?? null}
          width={depth}
          height={width}
          position={[0, width / 2, -(height + width) / 2 + depth]}
          rotation={[0, 0, 0]}
          color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 2])}
        />
      </group>
      <group
        rotation={[0, 0, -Math.PI / 2]}
        position={[-depth / 2, -depth / 2, 0]}
        ref={meshRefs[6]}
      >
        <group position={[-0.5 * (depth + width), 0, 0]} rotation={[0, 0, 0]}>
          <Side
            meshRef={meshRefs[8] ?? null}
            width={width}
            height={depth}
            position={[0, depth / 2, height / 2 + 0.01]}
            rotation={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 7])}
          />
          <Side
            meshRef={meshRefs[7] ?? null}
            width={width}
            height={height}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 4])}
          />
          <Side
            meshRef={meshRefs[9] ?? null}
            width={width}
            height={depth}
            position={[0, depth / 2, -height / 2 - 0.01]}
            rotation={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] - 7])}
          />
        </group>
        <group
          position={[-depth / 2 - width, depth / 2, 0]}
          rotation={[0, 0, Math.PI / 2]}
          ref={meshRefs[13]}
        >
          <Side
            meshRef={meshRefs[11] ?? null}
            width={depth}
            height={width}
            position={[0, -width / 2, (height + width) / 2 - depth]}
            rotation={[0, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2] + 2])}
          />
          <Side
            meshRef={meshRefs[10] ?? null}
            width={depth}
            height={height}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            color={GetHSV([baseColor[0], baseColor[1], baseColor[2]])}
          />
          <Side
            meshRef={meshRefs[12] ?? null}
            width={depth}
            height={width}
            position={[0, -width / 2, -(height + width) / 2 + depth]}
            rotation={[0, 0, 0]}
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
