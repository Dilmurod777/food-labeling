import { useRef } from "react";
import Ground from "@/app/ui/packaging/ground";
import DefaultPackage from "@/app/ui/packaging/models/default-package";

export default function Content() {
  const meshRef = useRef();

  return (
    <group position-y={-1}>
      <Ground />
      <DefaultPackage />
    </group>
  );
}
