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
  id: string;
  category: ModelCategory;
  type: ModelType;
  modelPath: string;
  imgPath: string;
  layoutPath: string;
  sizes: number[];
  text: string;
  animatable: boolean;
  step: number;
  totalSteps: number;
  description: string;
  badges: string[];
  baseColor: number[];
}

export enum ModelCategory {
  Box,
  Pouch,
  Sachet,
  CanJar,
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
    id: "box-0",
    category: ModelCategory.Box,
    type: ModelType.Generated,
    modelPath: "telescope-box",
    text: "Telescope Box",
    imgPath: "telescope-box.png",
    layoutPath: "telescope-box-layout",
    animatable: true,
    step: 0,
    totalSteps: 30,
    description:
      "Telescoping boxes consist of a separate top, or top and bottom that fit over each other or a separate body. They can be produced in a number of unjoined or preglued styles and configurations.",
    badges: ["cardboard", "custom size"],
    sizes: [3, 2, 0.75],
    baseColor: [34, 23, 60],
  },
  {
    id: "box-1",
    category: ModelCategory.Box,
    type: ModelType.Generated,
    modelPath: "full-overlap-slotted-container",
    text: "FOL Container",
    imgPath: "fol.png",
    layoutPath: "full-overlap-slotted-container-layout",
    animatable: true,
    step: 0,
    totalSteps: 35,
    description:
      "All flaps are the same length (approximately the width of the box). When closed, the outer flaps come within one inch of complete overlap. The style is especially resistant to rough handling. Stacked on its bottom panel, the overlapping flaps provide added cushioning and protection. Stacked on its side, the extra thickness provides added stacking strength.",
    badges: ["cardboard", "custom size"],
    sizes: [2, 3, 1],
    baseColor: [34, 23, 60],
  },
  {
    id: "pouch-0",
    category: ModelCategory.Pouch,
    type: ModelType.Loaded,
    modelPath: "pouch-chips.glb",
    text: "Chips pouch",
    imgPath: "pouch-chips.png",
    layoutPath: "pouch-chips-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "This premium chip packaging is perfect for those who want to keep their chips fresh and appealing, ensuring safe and secure delivery.",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 0.5],
    baseColor: [34, 23, 60],
  },
  {
    id: "sachet-0",
    category: ModelCategory.Sachet,
    type: ModelType.Loaded,
    modelPath: "sachet-drink.glb",
    text: "Drink Sachet",
    imgPath: "sachet-drink.png",
    layoutPath: "sachet-drink-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "Enjoy delicious beverages anytime, anywhere with our convenient drink sachets. Just tear, mix, and savor a burst of flavor in every sip. Perfect for busy mornings or a quick pick-me-up!",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 0.5],
    baseColor: [34, 23, 60],
  },
];
