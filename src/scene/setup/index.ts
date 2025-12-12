/**
 * ============================================================================
 * setup/index.ts - 场景设置模块导出
 * ============================================================================
 * 
 * 导出场景初始化相关的功能：
 * - createCameras: 创建双相机系统（主相机 + UI 相机）
 * - createLights: 创建灯光系统
 * - CameraSetup: 相机设置类型定义
 * - LightSetup: 灯光设置类型定义
 * 
 * ============================================================================
 */

export { createCameras, type CameraSetup } from "./createCamera";
export { createLights, type LightSetup } from "./createLights";
