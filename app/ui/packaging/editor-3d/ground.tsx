import { Grid } from "@react-three/drei";

export default function Ground() {
  const gridConfig = {
    cellSize: 1,
    cellThickness: 0.5,
    cellColor: "#6f6f6f",
    sectionSize: 2,
    sectionThickness: 1.2,
    sectionColor: "#fb9e1c",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };

  return (
    <Grid
      position={[0, -0.01, 0]}
      args={[10, 10]}
      {...gridConfig}
      receiveShadow={true}
      castShadow={true}
    />
  );
}
