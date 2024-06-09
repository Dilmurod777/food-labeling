import { Ref, useEffect, useMemo, useRef, useState } from "react";
import Ground from "@/app/ui/packaging/editor-3d/ground";
import TelescopeBox from "@/app/ui/packaging/models/telescope-box";
import {
  KeyboardControls,
  KeyboardControlsEntry,
  PivotControls,
  useFBX,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  AnimationKeyMap,
  Keymaps,
  Model,
  ModelType,
  Tools,
} from "@/app/lib/3d";
import { MeshStandardMaterial, Object3D, Texture } from "three";
import { Vector3 } from "@react-three/fiber";
import { GetHSV } from "@/app/lib/utilities";

interface Props {
  currentModel: Model;
  updateCurrentModel: (m: Model) => void;
  currentTool: Tools;
  currentStep: number;
  updateCurrentStep: (step: number) => void;
  baseColor: number[];
  size: number[];
}

interface CurrentModel {
  index: number;
  model: Object3D;
}

export default function Content({
  currentModel,
  updateCurrentModel,
  currentTool,
  currentStep,
  updateCurrentStep,
  baseColor,
  size,
}: Props) {
  const texture = useTexture("/uploads/image1.jpg");
  const [animationValue, setAnimationValue] = useState(0);
  const [showPivots, setShowPivots] = useState(false);

  const keyMap = useMemo<KeyboardControlsEntry[]>(
    () => [
      {
        name: AnimationKeyMap.open,
        keys: ["ArrowRight"],
      },
      {
        name: AnimationKeyMap.close,
        keys: ["ArrowLeft"],
      },
      {
        name: Keymaps.escape,
        keys: ["Escape"],
      },
    ],
    [],
  );

  const keyboardOnChange = (name: string, pressed: boolean) => {
    if (!pressed) return;

    switch (name) {
      case AnimationKeyMap.open:
        updateCurrentStep(currentStep + 1);
        break;
      case AnimationKeyMap.close:
        updateCurrentStep(currentStep - 1);
        break;
      case Keymaps.escape:
        setShowPivots(false);
        break;
    }
  };

  const LoadGLTF = (path: string) => {
    const { nodes, materials } = useGLTF(path);
    return (
      <group dispose={null} position={[0, 0, 0]}>
        <mesh
          //@ts-ignore
          geometry={nodes.Dorrito001_Lays_0.geometry}
          // material={materials.Lays}
          scale={size.map((s) => s * 0.05) as Vector3}
        >
          <meshBasicMaterial color={GetHSV(baseColor)} />
        </mesh>
      </group>
    );
  };

  const GetModelNode = (model: Model) => {
    switch (model.type) {
      case ModelType.Generated:
        switch (model.modelPath) {
          case "telescope-box":
            return (
              <TelescopeBox
                step={currentStep}
                totalSteps={currentModel.totalSteps}
                width={size[0]}
                height={size[1]}
                depth={size[2]}
                baseColor={baseColor}
              />
            );
        }
        break;
      case ModelType.Loaded: {
        const extension = model.modelPath.split(".").pop();
        switch (extension) {
          case "glb":
          case "gltf":
            return LoadGLTF(`/models/${model.modelPath}`);
        }
        return null;
      }
    }

    return null;
  };

  const GetModel = (model: Model, index: number) => {
    return (
      <PivotControls
        activeAxes={[showPivots, showPivots, showPivots]}
        key={`model-${model.modelPath}-${index}`}
        anchor={[0, 0, 0]}
        depthTest={false}
        disableSliders={true}
      >
        <group name={model.modelPath} onClick={() => setShowPivots(true)}>
          {GetModelNode(model)}
        </group>
      </PivotControls>
    );
  };

  return (
    <group position-y={-1}>
      <Ground />
      <KeyboardControls map={keyMap} onChange={keyboardOnChange}>
        {GetModel(currentModel, 0)}
      </KeyboardControls>
    </group>
  );
}
