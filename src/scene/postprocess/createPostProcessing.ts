/**
 * ============================================================================
 * createPostProcessing.ts - 后处理效果模块
 * ============================================================================
 * 
 * 设计说明：
 * 后处理 (Post-Processing) 是在 3D 场景渲染完成后，
 * 对最终图像应用的视觉效果。它们能显著增强渲染质量和艺术效果。
 * 
 * 本项目使用的后处理效果：
 * 
 * 1. 色差 (Chromatic Aberration)
 *    - 模拟光线通过透镜时不同波长分离的效果
 *    - 在钻石渲染中模拟光的色散，增加真实感
 *    - 产生 RGB 边缘分离的视觉效果
 * 
 * 2. 泛光 (Bloom)
 *    - 模拟强光溢出到周围区域的效果
 *    - 使钻石的高光区域产生光晕
 *    - 增加珠宝的闪耀感
 * 
 * 3. 暗角 (Vignette)
 *    - 图像边缘变暗的效果
 *    - 将观众注意力引导到画面中心（钻石）
 *    - 营造电影质感
 * 
 * 渲染管线流程：
 * [3D渲染] → [色差] → [泛光] → [暗角] → [最终输出]
 * 
 * ============================================================================
 */

import {
  ArcRotateCamera,
  DefaultRenderingPipeline,
  Scene,
} from "@babylonjs/core";

/**
 * 创建并配置后处理渲染管线
 * 
 * @param scene - Babylon.js 场景实例
 * @param camera - 应用后处理的相机
 * @returns {DefaultRenderingPipeline} 配置完成的渲染管线
 * 
 * DefaultRenderingPipeline 是 Babylon.js 提供的预配置后处理管线，
 * 包含了常用的后处理效果，开箱即用。
 */
export function createPostProcessing(
  scene: Scene,
  camera: ArcRotateCamera
): DefaultRenderingPipeline {
  // 创建默认渲染管线
  // 参数1: 名称
  // 参数2: 是否启用 HDR（高动态范围）
  // 参数3: 场景
  // 参数4: 应用此管线的相机列表
  const pipeline = new DefaultRenderingPipeline("diamondPP", true, scene, [
    camera,
  ]);

  // ========================================
  // 抗锯齿设置
  // ========================================
  // MSAA 多重采样抗锯齿，值越高边缘越平滑
  // 8 是较高质量，平衡了性能和效果
  pipeline.samples = 8;

  // ========================================
  // 色差效果 (Chromatic Aberration)
  // ========================================
  // 模拟光学透镜的色散现象
  // 在钻石渲染中尤为重要，因为钻石会分解白光
  pipeline.chromaticAberrationEnabled = true;
  // aberrationAmount: 色差强度（RGB 分离程度）
  // 值越大，颜色分离越明显
  pipeline.chromaticAberration.aberrationAmount = 20;
  // radialIntensity: 径向强度（边缘色差更明显）
  // 0 = 均匀分布，1 = 完全集中在边缘
  pipeline.chromaticAberration.radialIntensity = 0.7;

  // ========================================
  // 泛光效果 (Bloom)
  // ========================================
  // 使亮度超过阈值的区域产生光晕
  // 模拟相机或人眼在强光下的溢光效果
  pipeline.bloomEnabled = true;
  // bloomThreshold: 泛光阈值（0 = 所有区域都产生泛光）
  pipeline.bloomThreshold = 0;
  // bloomWeight: 泛光强度权重
  pipeline.bloomWeight = 2;
  // bloomKernel: 泛光模糊核大小（影响光晕范围）
  pipeline.bloomKernel = 3;
  // bloomScale: 泛光缩放比例
  pipeline.bloomScale = 1;

  // ========================================
  // 暗角效果 (Vignette)
  // ========================================
  // 图像四周变暗的效果，聚焦观众注意力
  pipeline.imageProcessingEnabled = true;
  pipeline.imageProcessing.vignetteEnabled = true;
  // vignetteWeight: 暗角强度（值越大边缘越暗）
  pipeline.imageProcessing.vignetteWeight = 2;
  // vignetteCameraFov: 暗角范围（与相机视场角相关）
  // 值越大，暗角从更远的边缘开始
  pipeline.imageProcessing.vignetteCameraFov = 1.25;

  return pipeline;
}
