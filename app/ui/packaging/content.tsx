import { Ref, useMemo, useRef, useState } from "react";
import Ground from "@/app/ui/packaging/ground";
import DefaultPackage from "@/app/ui/packaging/models/default-package";
import {
  KeyboardControls,
  KeyboardControlsEntry,
  PivotControls,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { KeyMap, Model, ModelType } from "@/app/lib/3d";
import { Group, Object3D } from "three";
import { v4 as uuidV4 } from "uuid";

interface Props {
  models: Model[];
}

interface CurrentModel {
  index: number;
  model: Object3D;
}

export default function Content({ models }: Props) {
  const totalSteps = 5;
  const step = useRef(0);
  const [_, setUpdate] = useState(step.current);
  const [currentModel, setCurrentModel] = useState<CurrentModel>();

  const keyMap = useMemo<KeyboardControlsEntry[]>(
    () => [
      {
        name: KeyMap.open,
        keys: ["ArrowRight"],
      },
      {
        name: KeyMap.close,
        keys: ["ArrowLeft"],
      },
    ],
    [],
  );

  const keyboardOnChange = (name: string, pressed: boolean) => {
    if (!pressed) return;

    switch (name) {
      case KeyMap.open:
        step.current = Math.min(step.current + 1, totalSteps);
        break;
      case KeyMap.close:
        step.current = Math.max(step.current - 1, 0);
        break;
    }

    setUpdate(step.current);
  };

  const LoadGLTF = (path: string) => {
    const { nodes, materials } = useGLTF(path);
    return (
      <group dispose={null} position={[0, 0, 0]}>
        <mesh
          //@ts-ignore
          geometry={nodes.Dorrito001_Lays_0.geometry}
          scale={0.1}
        />
      </group>
    );
  };

  const GetModelNode = (model: Model) => {
    switch (model.type) {
      case ModelType.Generated:
        switch (model.path) {
          case "default-package":
            return (
              <DefaultPackage step={step.current} totalSteps={totalSteps} />
            );
        }
        break;
      case ModelType.Loaded: {
        const extension = model.path.split(".").pop();
        switch (extension) {
          case "glb":
          case "gltf":
            return LoadGLTF(`/models/${model.path}`);
        }
        return null;
      }
    }

    return null;
  };

  const GetModel = (model: Model, index: number) => {
    return (
      <PivotControls
        key={`model-${model.name}`}
        anchor={[0, 0, 0]}
        depthTest={false}
        disableSliders={true}
        visible={index == currentModel?.index}
      >
        <group
          name={model.name}
          onClick={(e) => {
            setCurrentModel({
              index,
              model: e.object,
            });
          }}
        >
          {GetModelNode(model)}
        </group>
      </PivotControls>
    );
  };

  return (
    <group position-y={-1}>
      <Ground />
      <KeyboardControls map={keyMap} onChange={keyboardOnChange}>
        {models.map(GetModel)}
        {/*<DefaultPackage step={step.current} totalSteps={totalSteps} />*/}
      </KeyboardControls>
    </group>
  );
}
