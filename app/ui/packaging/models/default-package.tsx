import { Euler, Vector3 } from "@react-three/fiber";
import { DoubleSide, Mesh } from "three";
import { Ref, useRef } from "react";
import { Data3D } from "@/app/lib/3d";

interface Props {
  size?: number;
}

export default function DefaultPackage({ size = 3 }: Props) {
  const { height, width, meshRefs }: Data3D = {
    height: size,
    width: size,
    meshRefs: {
      top: [useRef(null), useRef(null)],
      bottom: [useRef(null)],
      side1: [useRef(null)],
      side2: [useRef(null)],
      side3: [useRef(null)],
      side4: [useRef(null)],
    },
  };

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
      {/*top*/}
      <Side
        meshRef={meshRefs.top[0] ?? null}
        width={width / 2}
        height={height}
        position={[-width / 4, height, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Side
        meshRef={meshRefs.top[1] ?? null}
        width={width / 2}
        height={height}
        position={[width / 4, height, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/*sides*/}
      <Side
        meshRef={meshRefs.side1[0] ?? null}
        width={width}
        height={height}
        position={[0, height / 2, width / 2]}
        rotation={[0, 0, 0]}
      />
      <Side
        meshRef={meshRefs.side2[0] ?? null}
        width={width}
        height={height}
        position={[0, height / 2, -width / 2]}
        rotation={[0, 0, 0]}
      />
      <Side
        meshRef={meshRefs.side3[0] ?? null}
        width={width}
        height={height}
        position={[width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Side
        meshRef={meshRefs.side4[0] ?? null}
        width={width}
        height={height}
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
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
}: {
  meshRef: Ref<Mesh>;
  width?: number;
  height?: number;
  position?: Vector3;
  rotation?: Euler;
  color?: string;
}) {
  return (
    <mesh position={position} rotation={rotation} ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color={color} side={DoubleSide} />
    </mesh>
  );
}
