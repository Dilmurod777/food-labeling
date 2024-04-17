import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

interface Props {
  position: Vector3;
}

export default function FloorTile({ position }: Props) {
  const { nodes, materials } = useGLTF("models/stone_ground_01/scene.gltf");
  return (
    <group dispose={null}>
      <group position={position} rotation={[-Math.PI, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_2.geometry}
          material={materials.Stone_ground_01_u1_v1}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_3.geometry}
          material={materials.Stone_ground_01_u1_v1}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_4.geometry}
          material={materials.Stone_ground_01_u1_v1}
        />
      </group>
    </group>
  );
}
