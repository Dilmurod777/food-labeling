import { Ref, useEffect, useMemo, useRef, useState } from "react";
import Ground from "@/app/ui/packaging/editor-3d/ground";
import BoxTelescopeModel from "@/app/ui/packaging/models/box-telescope-model";
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
import BoxFullOverlapSlotted from "@/app/ui/packaging/models/box-full-overlap-slotted";
import { PouchChipsModel } from "@/app/ui/packaging/models/pouch-chips-model";
import { SachetDrinkModel } from "@/app/ui/packaging/models/sachet-drink-model";
import { SachetSnackModel } from "@/app/ui/packaging/models/sachet-snack-model";
import { BagCoffeeModel } from "@/app/ui/packaging/models/bag-coffee-model";
import { BagMediumShoppingModel } from "@/app/ui/packaging/models/bag-medium-shopping-model";
import { CanPaintTinShortModel } from "@/app/ui/packaging/models/can-paint-tin-short-model";
import { CanPaintTinTallModel } from "@/app/ui/packaging/models/can-paint-tin-tall-model";
import { BagMediumShopping2Model } from "@/app/ui/packaging/models/bag-medium-shopping-2-model";
import BoxSimpleTallModel from "@/app/ui/packaging/models/box-simple-tall-model";
import BoxDonutModel from "@/app/ui/packaging/models/box-donut-model";
import BoxSlideModel from "@/app/ui/packaging/models/box-slide-model";

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

  const GetModelNode = (model: Model) => {
    switch (model.id) {
      case "box-0":
        return (
          <BoxTelescopeModel
            step={currentStep}
            totalSteps={currentModel.totalSteps}
            width={size[0]}
            height={size[1]}
            depth={size[2]}
            baseColor={baseColor}
          />
        );
      case "box-1":
        return (
          <BoxFullOverlapSlotted
            step={currentStep}
            totalSteps={currentModel.totalSteps}
            width={size[0]}
            height={size[1]}
            depth={size[2]}
            baseColor={baseColor}
          />
        );
      case "box-2":
        return (
          <BoxSimpleTallModel
            step={currentStep}
            totalSteps={currentModel.totalSteps}
            width={size[2]}
            height={size[1]}
            depth={size[0]}
            baseColor={baseColor}
          />
        );
      case "box-3":
        return (
          <BoxDonutModel
            step={currentStep}
            totalSteps={currentModel.totalSteps}
            width={size[2]}
            height={size[1]}
            depth={size[0]}
            baseColor={baseColor}
          />
        );
      case "box-4":
        return (
          <BoxSlideModel
            step={currentStep}
            totalSteps={currentModel.totalSteps}
            width={size[2]}
            height={size[1]}
            depth={size[0]}
            baseColor={baseColor}
          />
        );
      case "pouch-0":
        return <PouchChipsModel size={size} baseColor={baseColor} />;
      case "pouch-1":
        return <BagCoffeeModel size={size} baseColor={baseColor} />;
      case "sachet-0":
        return <SachetDrinkModel size={size} baseColor={baseColor} />;
      case "sachet-1":
        return <SachetSnackModel size={size} baseColor={baseColor} />;
      case "bag-0":
        return <BagMediumShopping2Model size={size} baseColor={baseColor} />;
      case "bag-1":
        return <BagMediumShoppingModel size={size} baseColor={baseColor} />;
      case "can-0":
        return <CanPaintTinShortModel size={size} baseColor={baseColor} />;
      case "can-1":
        return <CanPaintTinTallModel size={size} baseColor={baseColor} />;
    }

    return null;
  };

  const GetModel = (model: Model, index: number) => {
    return (
      <PivotControls
        // activeAxes={[showPivots, showPivots, showPivots]}
        activeAxes={[false, false, false]}
        key={`model-${model.modelPath}-${index}`}
        anchor={[0, 0, 0]}
        depthTest={false}
        disableSliders={true}
        disableScaling={true}
      >
        <group name={model.modelPath} onClick={() => setShowPivots(true)}>
          {GetModelNode(model)}
        </group>
      </PivotControls>
    );
  };

  return (
    <group position-y={-1}>
      {/*<Ground />*/}
      <KeyboardControls map={keyMap} onChange={keyboardOnChange}>
        {GetModel(currentModel, 0)}
      </KeyboardControls>
    </group>
  );
}
