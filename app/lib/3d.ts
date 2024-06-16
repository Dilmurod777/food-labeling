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
  imgPath: string[];
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
  Can,
  Jar,
  Bag,
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

export interface TemplateGroup {
  name: string;
  images: string[];
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

export const RestrictedKeyCodes: string[] = [];

export const DefaultModelItems: Model[] = [
  {
    id: "box-0",
    category: ModelCategory.Box,
    type: ModelType.Generated,
    modelPath: "telescope-box",
    text: "Telescope Box",
    imgPath: ["telescope-box.png"],
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
    imgPath: ["fol.png"],
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
    id: "box-2",
    category: ModelCategory.Box,
    type: ModelType.Generated,
    modelPath: "simple-tall-box",
    text: "Simple box",
    imgPath: [
      "simple-tall-box.png",
      "simple-tall-box-2.png",
      "simple-tall-box-3.png",
      "simple-tall-box-4.png",
    ],
    layoutPath: "simple-tall-box-layout",
    animatable: true,
    step: 0,
    totalSteps: 20,
    description:
      "Simplify your storage and shipping with our sturdy cardboard box. Durable, versatile, and eco-friendly, it’s perfect for all your packing needs. Reliable protection for your items every time!",
    badges: ["cardboard", "custom size"],
    sizes: [1, 2, 3],
    baseColor: [34, 23, 60],
  },
  {
    id: "box-3",
    category: ModelCategory.Box,
    type: ModelType.Generated,
    modelPath: "box-donut-model",
    text: "Donut box",
    imgPath: ["box-donut.png", "box-donut-2.png"],
    layoutPath: "simple-tall-box-layout",
    animatable: true,
    step: 0,
    totalSteps: 7,
    description:
      "Keep your donuts fresh and delicious with our premium donut box. Designed for durability and presentation, it’s perfect for storing and showcasing your treats. Ideal for parties, gifts, or everyday indulgence!",
    badges: ["cardboard", "custom size"],
    sizes: [2, 1, 2],
    baseColor: [34, 23, 60],
  },
  {
    id: "box-4",
    category: ModelCategory.Box,
    type: ModelType.Generated,
    modelPath: "box-slide-model",
    text: "Slide box",
    imgPath: ["box-slide-2.png", "box-slide.png"],
    layoutPath: "simple-tall-box-layout",
    animatable: true,
    step: 0,
    totalSteps: 7,
    description:
      "Discover convenience and style with our sleek slide box. Perfect for organizing and protecting your items, it offers easy access and secure storage. Ideal for gifts, collectibles, and everyday essentials!",
    badges: ["cardboard", "custom size"],
    sizes: [2, 1, 2],
    baseColor: [34, 23, 60],
  },
  {
    id: "pouch-0",
    category: ModelCategory.Pouch,
    type: ModelType.Loaded,
    modelPath: "pouch-chips.glb",
    text: "Chips pouch",
    imgPath: ["pouch-chips.png"],
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
    imgPath: ["sachet-drink.png"],
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
  {
    id: "sachet-1",
    category: ModelCategory.Sachet,
    type: ModelType.Loaded,
    modelPath: "sachet-snack.glb",
    text: "Snack Sachet",
    imgPath: ["sachet-snack.png"],
    layoutPath: "sachet-snack-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "Enjoy a tasty snack on the go with our convenient snack sachets. Perfectly portioned for a quick, delicious treat anytime, anywhere. Just open and enjoy!",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 1],
    baseColor: [34, 23, 60],
  },
  {
    id: "pouch-1",
    category: ModelCategory.Pouch,
    type: ModelType.Loaded,
    modelPath: "bag-coffee.glb",
    text: "Coffee bag",
    imgPath: ["bag-coffee.png"],
    layoutPath: "coffee-bag-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "Experience the perfect brew anytime with our convenient coffee bags. Just steep, sip, and savor rich, aromatic coffee in minutes. Perfect for home, office, or on the go!",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 1],
    baseColor: [34, 23, 60],
  },
  {
    id: "bag-0",
    category: ModelCategory.Bag,
    type: ModelType.Loaded,
    modelPath: "bag-medium-shopping-2.glb",
    text: "Medium shopping bag",
    imgPath: ["bag-medium-shopping-2.png"],
    layoutPath: "bag-medium-shopping-2-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "Carry your essentials in style with our versatile medium shopping bag. Durable, spacious, and eco-friendly, it's perfect for all your shopping needs. Shop smart and stylishly!",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 1],
    baseColor: [34, 23, 60],
  },
  {
    id: "bag-1",
    category: ModelCategory.Bag,
    type: ModelType.Loaded,
    modelPath: "bag-medium-shopping.glb",
    text: "Medium shopping bag",
    imgPath: ["bag-medium-shopping.png"],
    layoutPath: "bag-medium-shopping-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "Carry your essentials in style with our versatile medium shopping bag. Durable, spacious, and eco-friendly, it's perfect for all your shopping needs. Shop smart and stylishly!",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 1],
    baseColor: [34, 23, 60],
  },
  {
    id: "can-0",
    category: ModelCategory.Can,
    type: ModelType.Loaded,
    modelPath: "can-painting-tin-short.glb",
    text: "Small can",
    imgPath: ["can-painting-tin-short.png"],
    layoutPath: "can-painting-tin-short-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "Transform your projects with our short painting tin. Easy to handle and perfect for small jobs, it delivers smooth, vibrant results every time. Ideal for quick touch-ups and detailed work!",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 1],
    baseColor: [34, 23, 60],
  },
  {
    id: "can-1",
    category: ModelCategory.Can,
    type: ModelType.Loaded,
    modelPath: "can-painting-tin-tall.glb",
    text: "Tall can",
    imgPath: ["can-painting-tin-tall.png"],
    layoutPath: "can-painting-tin-tall-layout",
    animatable: false,
    step: 0,
    totalSteps: 0,
    description:
      "Achieve flawless coverage with our tall painting tin. Perfect for larger projects, it ensures a smooth, even finish with every stroke. Ideal for transforming any space with ease!",
    badges: ["polymer", "custom size"],
    sizes: [1, 1, 1],
    baseColor: [34, 23, 60],
  },
];
