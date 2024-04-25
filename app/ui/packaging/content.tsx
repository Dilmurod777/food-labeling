import { Ref, useEffect, useMemo, useRef, useState } from "react";
import Ground from "@/app/ui/packaging/ground";
import DefaultPackage from "@/app/ui/packaging/models/default-package";
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

interface Props {
  models: Model[];
  setCurrentModelIndex: (i: number) => void;
  currentTool: Tools;
}

interface CurrentModel {
  index: number;
  model: Object3D;
}

export default function Content({
  models,
  setCurrentModelIndex,
  currentTool,
}: Props) {
  const totalSteps = 5;
  const step = useRef(0);
  const [_, setUpdate] = useState(step.current);
  const [currentModel, setCurrentModel] = useState<CurrentModel | null>();
  const texture = useTexture("/uploads/image1.jpg");

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
        step.current = Math.min(step.current + 1, totalSteps);
        break;
      case AnimationKeyMap.close:
        step.current = Math.max(step.current - 1, 0);
        break;
      case Keymaps.escape:
        setCurrentModel(null);
        setCurrentModelIndex(-1);
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
          scale={0.05}
        />
        <meshBasicMaterial map={texture} />
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
    const active = index == currentModel?.index && currentTool != Tools.Hand;

    return (
      <PivotControls
        activeAxes={[active, active, active]}
        key={`model-${model.name}`}
        anchor={[0, 0, 0]}
        depthTest={false}
        disableSliders={true}
      >
        <group
          name={model.name}
          onClick={(e) => {
            setCurrentModel({
              index,
              model: e.object,
            });

            setCurrentModelIndex(index);
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
