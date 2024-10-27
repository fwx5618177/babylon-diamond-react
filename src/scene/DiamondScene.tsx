import React, { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  Color4,
  HemisphericLight,
  StandardMaterial,
  Color3,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import {
  AdvancedDynamicTexture,
  StackPanel,
  TextBlock,
  ColorPicker,
  Control,
} from "@babylonjs/gui";
import { PBRMaterial } from "@babylonjs/core/Materials";

const BabylonComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "arcCamera",
      7.199,
      1.574,
      6.4,
      new Vector3(0, 1, 0),
      scene
    );
    camera.upperBetaLimit = 1.63;
    camera.lowerBetaLimit = 0;
    camera.upperRadiusLimit = 8.3;
    camera.lowerRadiusLimit = 3.5;
    camera.fov = 0.9;
    camera.wheelPrecision = 32;
    camera.attachControl(canvasRef.current, true);

    scene.clearColor = new Color4(0, 0, 0, 1);

    const light1 = new HemisphericLight("light", new Vector3(0, 3, 0), scene);
    light1.intensity = 3;
    const light2 = new HemisphericLight("light2", new Vector3(0, 15, 0), scene);
    light2.intensity = 5;

    // 加载 diamond.json 场景
    SceneLoader.ImportMesh("", "/model/", "diamond.json", scene, (meshes) => {
      const diamond = meshes.find((mesh) => mesh.name === "diamond");
      if (diamond) {
        const diamondMaterial = new StandardMaterial("diamondMaterial", scene);
        diamondMaterial.diffuseColor = Color3.FromHexString("#ef7c50");
        diamond.material = diamondMaterial;
      }
    });

    // 加载 diamondInner.json 材质
    SceneLoader.LoadAssetContainer(
      "/model/",
      "diamondInner.json",
      scene,
      (container) => {
        const diamondInner = scene.getMeshByName("diamondInner");
        if (diamondInner) {
          const diamondInnerMaterial = container.materials[0] as PBRMaterial;
          diamondInnerMaterial.needDepthPrePass = true;
          diamondInner.material = diamondInnerMaterial;
        }
      },
      null,
      (_, message, exception) => {
        console.error("Failed to load diamondInner.json:", message, exception);
      }
    );

    // 加载 diamondOuter.json 材质
    SceneLoader.LoadAssetContainer(
      "/model/",
      "diamondOuter.json",
      scene,
      (container) => {
        const diamondOuter = scene.getMeshByName("diamondOuter");
        if (!diamondOuter) return;
        const diamondOuterMaterial = container.materials[0] as PBRMaterial;
        diamondOuterMaterial.needDepthPrePass = true;
        diamondOuter.material = diamondOuterMaterial;
      }
    );

    // 加载 redCloth.json 材质
    SceneLoader.LoadAssetContainer(
      "/model/",
      "redCloth.json",
      scene,
      (container) => {
        const cloth = scene.getMeshByName("Cloth");
        if (!cloth) return;
        const clothMaterial = container.materials[0] as PBRMaterial;
        clothMaterial.backFaceCulling = false;
        cloth.material = clothMaterial;
      }
    );

    // UI设置
    const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    // Diamond Color Panel
    const diamondColorPanel = new StackPanel();
    diamondColorPanel.width = "200px";
    diamondColorPanel.isVertical = true;
    diamondColorPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    diamondColorPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    ui.addControl(diamondColorPanel);

    const diamondColorText = new TextBlock();
    diamondColorText.text = "Diamond Color";
    diamondColorText.color = "White";
    diamondColorText.height = "30px";
    diamondColorPanel.addControl(diamondColorText);

    const diamondColorPicker = new ColorPicker();
    diamondColorPicker.value = Color3.FromHexString("#ef7c50");
    diamondColorPicker.height = "150px";
    diamondColorPicker.width = "150px";
    diamondColorPicker.horizontalAlignment =
      Control.HORIZONTAL_ALIGNMENT_CENTER;
    diamondColorPanel.addControl(diamondColorPicker);

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default BabylonComponent;
