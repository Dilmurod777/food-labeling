import { useMemo, useRef, useState } from "react";
import Ground from "@/app/ui/packaging/ground";
import DefaultPackage from "@/app/ui/packaging/models/default-package";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { KeyMap } from "@/app/lib/3d";

export default function Content() {
  const totalSteps = 5;
  const step = useRef(0);
  const [_, setUpdate] = useState(step.current);

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

  return (
    <group position-y={-1}>
      <Ground />
      <KeyboardControls map={keyMap} onChange={keyboardOnChange}>
        <DefaultPackage step={step.current} totalSteps={totalSteps} />
      </KeyboardControls>
    </group>
  );
}
