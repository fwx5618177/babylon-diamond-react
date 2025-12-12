/**
 * ============================================================================
 * createCamera.ts - 相机系统模块
 * ============================================================================
 * 
 * 设计说明：
 * 本项目使用双相机系统：
 * 1. 主相机 (ArcRotateCamera)：渲染 3D 场景
 * 2. UI 相机 (FreeCamera)：渲染 GUI 界面
 * 
 * 为什么需要双相机？
 * - 分离 3D 渲染和 2D UI 渲染，避免相互干扰
 * - UI 始终面向用户，不受 3D 场景旋转影响
 * - 通过 layerMask 控制哪些对象被哪个相机渲染
 * 
 * ArcRotateCamera 特点：
 * - 围绕目标点旋转的轨道相机
 * - 适合展示单个物体（如钻石）
 * - 支持鼠标/触摸交互
 * 
 * ============================================================================
 */

import { ArcRotateCamera, FreeCamera, Scene, Vector3 } from "@babylonjs/core";

/**
 * 相机设置返回值接口
 */
export interface CameraSetup {
  mainCamera: ArcRotateCamera;  // 用于渲染 3D 场景的主相机
  uiCamera: FreeCamera;         // 用于渲染 GUI 的 UI 相机
}

/**
 * 创建并配置场景相机系统
 * 
 * @param scene - Babylon.js 场景实例
 * @param canvas - HTML Canvas 元素，用于绑定用户交互
 * @returns {CameraSetup} 包含主相机和 UI 相机的对象
 * 
 * 相机参数说明：
 * - alpha: 水平旋转角度（弧度）
 * - beta: 垂直旋转角度（弧度）
 * - radius: 相机到目标点的距离
 */
export function createCameras(
  scene: Scene,
  canvas: HTMLCanvasElement
): CameraSetup {
  // ========================================
  // 创建主摄像机（轨道相机）
  // ========================================
  const mainCamera = new ArcRotateCamera(
    "arcCamera",        // 相机名称
    7.199,              // alpha: 初始水平角度 (~412°，会自动归一化)
    1.574,              // beta: 初始垂直角度 (~90°，接近水平视角)
    6.4,                // radius: 初始距离目标的距离
    new Vector3(0, 1, 0), // target: 相机观察的目标点（钻石中心）
    scene
  );

  // ========== 相机限制设置 ==========
  // 限制垂直旋转范围，防止相机翻转到底部
  mainCamera.upperBetaLimit = 1.63;   // 最大仰角 (~93°)
  mainCamera.lowerBetaLimit = 0;      // 最小仰角（正上方）
  
  // 限制缩放范围
  mainCamera.upperRadiusLimit = 8.3;  // 最远距离
  mainCamera.lowerRadiusLimit = 3.5;  // 最近距离（防止穿透模型）
  
  // ========== 相机视觉设置 ==========
  mainCamera.fov = 0.9;               // 视场角（弧度），约 51.5°
  
  // ========== 交互设置 ==========
  mainCamera.wheelPrecision = 32;     // 鼠标滚轮缩放精度（值越大越慢）
  mainCamera.attachControl(canvas, true); // 绑定用户输入控制
  mainCamera.pinchPrecision = 0;      // 触摸捏合缩放精度（0 = 禁用）
  
  // ========== 渲染层设置 ==========
  // layerMask = 1: 只渲染 layerMask 为 1 的网格
  mainCamera.layerMask = 1;

  // ========================================
  // 创建 UI 摄像机（自由相机）
  // ========================================
  // 位于场景上方远处 (y=10000)，避免与 3D 场景重叠
  const uiCamera = new FreeCamera("uiCamera", new Vector3(0, 10000, 0), scene);
  // layerMask = 2: 只渲染 layerMask 为 2 的对象（GUI）
  uiCamera.layerMask = 2;

  // ========================================
  // 配置多相机渲染
  // ========================================
  // 场景按顺序使用这两个相机渲染
  // 先渲染主相机的 3D 场景，再渲染 UI 相机的 GUI
  scene.activeCameras = [mainCamera, uiCamera];
  scene.activeCamera = mainCamera;

  return { mainCamera, uiCamera };
}
