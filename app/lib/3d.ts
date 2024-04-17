import { Ref } from "react";
import { Mesh } from "three";

export interface Data3D {
  meshRefs: {
    top: Ref<Mesh>[];
    bottom: Ref<Mesh>[];
    side1: Ref<Mesh>[];
    side2: Ref<Mesh>[];
    side3: Ref<Mesh>[];
    side4: Ref<Mesh>[];
  };
  width: number;
  height: number;
}
