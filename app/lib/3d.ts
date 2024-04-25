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
  path: string;
  name: string;
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
