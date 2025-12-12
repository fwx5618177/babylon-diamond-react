/**
 * 
 * 
 * 核心职责：
 * 这是整个 3D 钻石渲染的核心组件，负责初始化和管理 Babylon.js 场景。
 * 
 * 渲染流程：
 * 1. 初始化 Engine（WebGL 渲染引擎）
 * 2. 创建 Scene（场景容器）
 * 3. 设置相机和灯光
 * 4. 创建 UI 控制面板
 * 5. 异步加载 3D 模型资源
 * 6. 配置材质和折射效果
 * 7. 添加后处理效果
 * 8. 启动渲染循环
 * 
 * 钻石渲染技术要点：
 * - 使用 NodeMaterial（节点材质）实现复杂的着色效果
 * - 通过 RenderTargetTexture（RTT）实现折射效果
 * - 分层渲染：内层和外层分别使用不同材质
 * - 后处理：色差、泛光、暗角效果增强真实感
 * 
 * ============================================================================
 */

import React, { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  Color4,
  TransformNode,
  SceneLoader,
  PBRMaterial,
} from "@babylonjs/core";
// 导入 Babylon.js 加载器，支持加载 .babylon/.json 格式的 3D 模型
import "@babylonjs/loaders";

// 导入场景设置模块
import { createCameras } from "./setup";
import { createLights } from "./setup";
import { createUI } from "./ui";
import { createPostProcessing } from "./postprocess";
import {
  createRefractionSetup,
  setupShadowMaterial,
  loadDiamondInnerMaterial,
  loadDiamondOuterMaterial,
  loadClothMaterial,
} from "./materials";

/**
 * DiamondScene 组件
 * 
 * 功能：
 * - 创建并管理完整的 3D 钻石渲染场景
 * - 处理 WebGL 上下文的生命周期
 * - 响应窗口大小变化
 * 
 * 生命周期：
 * - 挂载时：初始化引擎和场景
 * - 卸载时：清理资源，释放 WebGL 上下文
 */
const DiamondScene: React.FC = () => {
  // Canvas 元素的引用，用于 Babylon.js 引擎绑定
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 确保 Canvas 元素已挂载
    if (!canvasRef.current) return;

    // ========================================
    // 第一步：初始化渲染引擎
    // ========================================
    // Engine 是 Babylon.js 的核心，负责管理 WebGL 上下文
    // 参数2 (true) 表示启用抗锯齿
    const engine = new Engine(canvasRef.current, true);
    
    // 创建场景，Scene 是所有 3D 对象的容器
    const scene = new Scene(engine);

    // 设置场景背景色为纯黑色 (RGBA: 0,0,0,1)
    scene.clearColor = new Color4(0, 0, 0, 1);

    // ========================================
    // 第二步：创建相机系统
    // ========================================
    // 返回主相机（用于渲染 3D 场景）和 UI 相机（用于渲染 GUI）
    const { mainCamera } = createCameras(scene, canvasRef.current);

    // ========================================
    // 第三步：创建灯光系统
    // ========================================
    // 使用点光源照亮钻石，产生闪耀效果
    createLights(scene);

    // ========================================
    // 第四步：创建 UI 控制面板
    // ========================================
    // 返回颜色选择器，用于实时调整钻石和环境颜色
    const { diamondColorPicker, envColorPicker } = createUI(scene);

    // ========================================
    // 第五步：创建场景层级结构
    // ========================================
    // TransformNode 作为所有模型的父节点，便于统一管理变换
    const sceneRoot = new TransformNode("DiamondSceneRoot", scene);

    // ========================================
    // 第六步：异步加载 3D 资源
    // ========================================
    const loadAssetsAsync = async () => {
      // 加载主场景模型文件 diamond.json
      // 包含：钻石模型、布料、环境、阴影等网格
      const result = await SceneLoader.ImportMeshAsync(
        "",           // 空字符串表示加载所有网格
        "/model/",    // 模型文件路径
        "diamond.json", // 模型文件名
        scene
      );

      // 将所有加载的网格挂载到场景根节点下
      // layerMask = 1 表示这些网格由主相机渲染
      result.meshes.forEach((mesh) => {
        mesh.parent = sceneRoot;
        mesh.layerMask = 1;
      });

      // 获取场景中的关键网格对象
      const diamond = scene.getMeshByID("diamond");       // 钻石主体
      const cloth = scene.getMeshByID("Cloth");           // 展示台布料
      const environment = scene.getMeshByID("environment"); // 环境背景
      const shadow = scene.getMeshByID("shadow");         // 阴影平面

      // ========================================
      // 第七步：配置材质
      // ========================================
      // 设置环境材质的金属度菲涅尔因子为 0
      // 这使得环境表面呈现非金属质感
      const envMaterial = scene.getMaterialByID("envMaterial") as PBRMaterial;
      if (envMaterial) {
        envMaterial.metallicF0Factor = 0;
      }

      // ========================================
      // 第八步：创建折射效果
      // ========================================
      // 钻石的核心视觉效果：通过隐藏球体和 RTT 实现折射
      // sphereMaterial 包含折射纹理，供钻石材质使用
      const { sphereMaterial } = createRefractionSetup(
        scene,
        mainCamera,
        diamond,
        cloth,
        environment
      );

      // 设置阴影平面的材质（半透明阴影效果）
      setupShadowMaterial(scene, shadow);

      // ========================================
      // 第九步：加载钻石和布料材质
      // ========================================
      // 并行加载三个材质以提高加载效率
      // - 钻石内层：处理内部折射
      // - 钻石外层：处理表面反射和闪光
      // - 布料：展示台的绒布材质
      await Promise.all([
        loadDiamondInnerMaterial(
          scene,
          diamond,
          sphereMaterial,
          diamondColorPicker
        ),
        loadDiamondOuterMaterial(
          scene,
          diamond,
          sphereMaterial,
          diamondColorPicker
        ),
        loadClothMaterial(scene, cloth, environment, envColorPicker),
      ]);

      // ========================================
      // 第十步：添加后处理效果
      // ========================================
      // 色差、泛光、暗角效果，增强视觉冲击力
      createPostProcessing(scene, mainCamera);

      // ========================================
      // 第十一步：设置相机自动旋转
      // ========================================
      // 每帧增加 alpha 角度，实现 360 度自动旋转展示
      scene.onBeforeRenderObservable.add(() => {
        mainCamera.alpha += 0.001;
      });
    };

    // 启动异步加载
    loadAssetsAsync();

    // ========================================
    // 第十二步：启动渲染循环
    // ========================================
    // 每帧调用 scene.render() 更新画面
    engine.runRenderLoop(() => {
      scene.render();
    });

    // ========================================
    // 第十三步：响应式处理
    // ========================================
    // 监听窗口大小变化，调整渲染分辨率
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);

    // ========================================
    // 清理函数：组件卸载时释放资源
    // ========================================
    return () => {
      window.removeEventListener("resize", onResize);
      // 释放 WebGL 上下文和所有 GPU 资源
      engine.dispose();
    };
  }, []); // 空依赖数组：仅在组件挂载时执行一次

  // 渲染全屏 Canvas 元素
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default DiamondScene;
