import FloorTile from "@/app/ui/packaging/floor-tile";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Grid, CameraControls, OrbitControls } from "@react-three/drei";
import Ground from "@/app/ui/packaging/ground";

export default function Content() {
  const meshRef = useRef();

  return (
    <group position-y={-0.75}>
      <Ground />
    </group>
  );
}
