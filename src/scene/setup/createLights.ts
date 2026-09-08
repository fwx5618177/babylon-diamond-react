/**
 * ============================================================================
 * createLights.ts - 灯光系统模块
 * ============================================================================
 * 
 * 设计说明：
 * 本项目使用双点光源系统照亮钻石，模拟珠宝展示柜的照明效果。
 * 
 * 为什么使用点光源？
 * - 点光源从一个点向所有方向发射光线
 * - 产生自然的光照衰减效果
 * - 适合模拟珠宝灯或射灯效果
 * - 能在钻石表面产生明显的高光和闪烁
 * 
 * 灯光布局策略：
 * - light1：近距离主光源，产生主要照明
 * - light2：高位辅助光源，提供整体环境亮度
 * 
 * 注意：本项目未使用阴影贴图，阴影效果通过静态阴影网格实现
 * 
 * ============================================================================
 */

import { PointLight } from "@babylonjs/core/Lights/pointLight.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";

/**
 * 灯光设置返回值接口
 */
export interface LightSetup {
  light1: PointLight;  // 主光源
  light2: PointLight;  // 辅助光源
}

/**
 * 创建场景灯光系统
 * 
 * @param scene - Babylon.js 场景实例
 * @returns {LightSetup} 包含两个点光源的对象
 * 
 * 灯光参数说明：
 * - position: 光源在 3D 空间中的位置
 * - intensity: 光照强度（默认为 1）
 */
export function createLights(scene: Scene): LightSetup {
  // ========================================
  // 主光源：近距离照明
  // ========================================
  // 位于钻石上方 3 单位处
  // 提供主要的照明效果，产生明显的高光
  const light1 = new PointLight("light", new Vector3(0, 3, 0), scene);
  light1.intensity = 3;  // 中等强度，避免过曝

  // ========================================
  // 辅助光源：高位环境照明
  // ========================================
  // 位于场景上方 15 单位处
  // 提供柔和的环境光，填充暗部细节
  const light2 = new PointLight("light2", new Vector3(0, 15, 0), scene);
  light2.intensity = 5;  // 较高强度补偿距离衰减

  return { light1, light2 };
}
