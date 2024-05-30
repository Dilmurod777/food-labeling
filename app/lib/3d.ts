import { Ref } from "react";
import { Group, Mesh } from "three";

export interface Data3D {
  meshRefs: {
    top: Ref<Group>[];
    bottom: Ref<Group>[];
    side1: Ref<Group>[];
    side2: Ref<Group>[];
    side3: Ref<Group>[];
    side4: Ref<Group>[];
  };
}

export interface Model {
  type: ModelType;
  modelPath: string;
  imgPath: string;
  text: string;
  animatable: boolean;
  step: number;
  totalSteps: number;
  description: string;
}

export enum ModelType {
  Null,
  Generated,
  Loaded,
}

export const RandomColors: string[] = [
  "#003C43",
  "#77B0AA",
  "#A79277",
  "#D1BB9E",
  "#4793AF",
  "#FFC470",
  "#DD5746",
];

export enum AnimationKeyMap {
  open = "open",
  close = "close",
}

export enum Keymaps {
  escape = "Escape",
}

export enum Tools {
  Select = "Select",
  Hand = "Hand",
  Duplicate = "Duplicate",
  Delete = "Delete",
  ResetView = "Reset view",
  UploadImage = "Upload",
  ExportRender = "Export",
  AnimationSlider = "Open/Close",
}

export function AddVectors<T>(
  a: [number, number, number],
  b: [number, number, number],
) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as T;
}

export function SubtractVectors<T>(
  a: [number, number, number],
  b: [number, number, number],
) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]] as T;
}

export const RestrictedKeyCodes: string[] = [
  "Delete",
  "Backspace",
  "ArrowDown",
  "ArrowUp",
  "Alt",
  "Control",
];

export const DefaultModelItems: Model[] = [
  {
    type: ModelType.Generated,
    modelPath: "default-package",
    text: "Default Package",
    imgPath: "default-package.png",
    animatable: true,
    step: 0,
    totalSteps: 15,
    description:
      "This high-quality packaging is ideal for those seeking to safely and attractively package their products, making it perfect for courier delivery.",
  },
  {
    type: ModelType.Loaded,
    modelPath: "chips-package.glb",
    text: "Chips Package",
    imgPath: "chips-package.png",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "This premium chip packaging is perfect for those who want to keep their chips fresh and appealing, ensuring safe and secure delivery.",
  },
];
