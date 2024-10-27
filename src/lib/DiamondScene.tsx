import React, { useEffect, useRef } from "react";
import { SceneInitializer } from "./SceneInitializer";

const DiamondScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    new SceneInitializer(canvas);

    return () => {};
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="renderCanvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default DiamondScene;
