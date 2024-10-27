import { useRef, useEffect } from "react";
import "@babylonjs/loaders";
import {
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  Engine,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  ColorPicker,
  Control,
  StackPanel,
  TextBlock,
} from "@babylonjs/gui";

const DiamondScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);

    // 场景初始化
    const scene = new Scene(engine);

    // 相机设置
    const camera = new ArcRotateCamera(
      "arcCamera",
      7.199,
      1.574,
      6.4,
      new Vector3(0, 1, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = 1.63;
    camera.lowerBetaLimit = 0;
    camera.upperRadiusLimit = 8.3;
    camera.lowerRadiusLimit = 3.5;
    camera.fov = 0.9;
    camera.wheelPrecision = 32;

    // 环境光设置
    const light1 = new DirectionalLight("light", new Vector3(0, -1, 0), scene);
    light1.intensity = 3;

    // 加载场景模型
    SceneLoader.ImportMesh(
      "diamond",
      "/model/",
      "diamond.json",
      scene,
      (meshes) => {
        meshes.forEach((mesh) => (mesh.layerMask = 1));
      }
    );

    // 添加 UI 控件
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const panel = new StackPanel();
    panel.width = "200px";
    panel.isVertical = true;
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);

    // 颜色控制
    const header = new TextBlock();
    header.text = "Diamond Color";
    header.color = "white";
    header.height = "30px";
    panel.addControl(header);

    const colorPicker = new ColorPicker();
    colorPicker.value = Color3.FromHexString("#ef7c50");
    colorPicker.height = "150px";
    colorPicker.width = "150px";
    colorPicker.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.addControl(colorPicker);

    // 添加渲染循环
    engine.runRenderLoop(() => {
      scene.render();
    });

    // 处理窗口大小改变事件
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default DiamondScene;
