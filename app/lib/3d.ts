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

export enum KeyMap {
  open = "open",
  close = "close",
}

export enum Tools {
  Select = "Select tool",
  Hand = "Hand tool",
  Duplicate = "Duplicate",
  Delete = "Delete",
  ResetView = "Reset view",
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
