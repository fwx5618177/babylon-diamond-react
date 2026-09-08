/**
 * ============================================================================
 * loadMaterials.ts - 材质系统模块
 * ============================================================================
 * 
 * 设计说明：
 * 这是钻石渲染的核心模块，负责创建和配置所有材质效果。
 * 
 * 钻石渲染的技术挑战：
 * 钻石的视觉效果主要来自于光的折射和全内反射。
 * 当光线进入钻石后，由于高折射率 (约 2.42)，会发生多次内部反射，
 * 最终从表面射出，产生闪烁效果。
 * 
 * 本项目的折射实现方案：
 * 1. 创建一个不可见的辅助球体
 * 2. 使用 RenderTargetTexture (RTT) 渲染环境到纹理
 * 3. 将 RTT 作为折射纹理应用到球体材质
 * 4. 钻石材质（NodeMaterial）采样这个折射纹理
 * 
 * 为什么不直接使用 PBR 折射？
 * - 钻石需要自定义的光学效果（色散、多重反射）
 * - NodeMaterial 允许更精细的着色器控制
 * - 分层渲染（内层/外层）提供更丰富的视觉效果
 * 
 * 材质类型：
 * - PBRMaterial: 物理渲染材质（用于折射球体、环境）
 * - NodeMaterial: 节点材质（用于钻石、布料）
 * - StandardMaterial: 标准材质（用于阴影平面）
 * 
 * ============================================================================
 */

import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { InputBlock } from "@babylonjs/core/Materials/Node/Blocks/Input/inputBlock.js";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder.js";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial.js";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial.js";
import { RenderTargetTexture } from "@babylonjs/core/Materials/Textures/renderTargetTexture.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { ColorPicker } from "@babylonjs/gui/2D/controls/colorpicker.js";

/**
 * 材质上下文接口
 * 包含折射系统的关键组件
 */
export interface MaterialsContext {
  sphereMaterial: PBRMaterial;          // 辅助球体材质（包含折射纹理）
  refractionTexture: RenderTargetTexture; // 折射渲染目标纹理
}

/**
 * 创建折射渲染系统
 * 
 * 折射实现原理：
 * 1. 创建一个位于钻石位置的不可见球体
 * 2. 创建 RTT，将场景（布料、环境）渲染到这个纹理
 * 3. 球体材质使用这个 RTT 作为折射源
 * 4. 钻石的 NodeMaterial 采样球体材质的折射纹理
 * 
 * 这种间接方式的优势：
 * - 可以控制哪些物体参与折射计算
 * - 避免无限递归（钻石折射钻石）
 * - 性能可控（RTT 分辨率可调）
 * 
 * @param scene - 场景实例
 * @param camera - 主相机
 * @param diamond - 钻石网格
 * @param cloth - 布料网格
 * @param environment - 环境网格
 * @returns {MaterialsContext} 包含球体材质和折射纹理的对象
 */
export function createRefractionSetup(
  scene: Scene,
  camera: ArcRotateCamera,
  diamond: AbstractMesh | null,
  cloth: AbstractMesh | null,
  environment: AbstractMesh | null
): MaterialsContext {
  // ========================================
  // 创建辅助球体
  // ========================================
  // 这个球体是不可见的，仅用于承载折射材质
  // 钻石材质会采样这个球体的折射效果
  const sphere = CreateSphere("sphere", { diameter: 2 }, scene);
  // 将球体放置在钻石位置
  sphere.position = diamond?.position.clone() || new Vector3(0, 0, 0);
  // 设置极小的可见度，使其几乎不可见但仍参与渲染
  sphere.visibility = 1e-5;

  // 创建 PBR 材质用于折射计算
  const sphereMaterial = new PBRMaterial("sphereMaterial", scene);
  sphere.material = sphereMaterial;

  // ========================================
  // 创建折射渲染目标纹理 (RTT)
  // ========================================
  // RTT 是一种特殊纹理，可以将场景渲染到纹理中
  // 参数: 名称, 分辨率(512x512), 场景, 生成 mipmaps
  const refractionTexture = new RenderTargetTexture(
    "refraction",
    512,        // 纹理分辨率，平衡质量和性能
    scene,
    true        // 生成 mipmaps，支持模糊采样
  );
  
  // 指定使用哪个相机视角渲染
  refractionTexture.activeCamera = camera;
  
  // 指定哪些网格会被渲染到这个纹理
  // 只渲染布料和环境；辅助球体会采样此纹理，不能同时写入同一渲染目标。
  refractionTexture.renderList = [cloth, environment].filter(
    Boolean
  ) as AbstractMesh[];
  
  // LOD 生成缩放，用于模糊效果
  refractionTexture.lodGenerationScale = 0.5;
  
  // 将 RTT 添加到场景的自定义渲染目标列表
  scene.customRenderTargets.push(refractionTexture);

  // ========================================
  // 配置球体材质的折射属性
  // ========================================
  // 将 RTT 设置为折射纹理
  sphereMaterial.refractionTexture = refractionTexture;
  // 链接折射和透明度（折射区域显示折射内容）
  sphereMaterial.linkRefractionWithTransparency = true;
  // 折射率 1.3（玻璃约 1.5，水约 1.33，钻石约 2.42）
  // 这里使用较低值是因为实际钻石效果在 NodeMaterial 中处理
  sphereMaterial.indexOfRefraction = 1.3;
  // 完全透明，只显示折射效果
  sphereMaterial.alpha = 0;
  // 低粗糙度，产生清晰的折射
  sphereMaterial.roughness = 0.05;
  // 非金属材质
  sphereMaterial.metallic = 0;

  return { sphereMaterial, refractionTexture };
}

/**
 * 设置阴影平面材质
 * 
 * 阴影实现方式：
 * 本项目使用的是“烘焙阴影”方法，即使用预绘制的阴影纹理贴图。
 * 这种方法的优点：
 * - 性能极高，无需实时计算阴影
 * - 质量可控，预渲染可以使用复杂算法
 * - 适合静态物体（钻石和展示台）
 * 
 * 缺点：
 * - 不适合动态移动的物体
 * - 光源改变时阴影不会更新
 * 
 * @param scene - 场景实例
 * @param shadow - 阴影平面网格
 */
export function setupShadowMaterial(
  scene: Scene,
  shadow: AbstractMesh | null,
  textureUrl: string
): void {
  if (!shadow) return;

  // 使用标准材质，因为阴影不需要复杂的 PBR 特性
  const shadowMaterial = new StandardMaterial("shadowMaterial", scene);
  
  // 使用透明度纹理实现柔和的阴影边缘
  // 纹理中白色部分完全可见，黑色部分完全透明
  shadowMaterial.opacityTexture = new Texture(textureUrl, scene, true, true);
  
  // 漫反射颜色设为黑色，使阴影呈现暗色
  shadowMaterial.diffuseColor = new Color3(0, 0, 0);
  
  // 移除高光，阴影不应该有反射
  shadowMaterial.specularColor = new Color3(0, 0, 0);
  
  shadow.material = shadowMaterial;
}

/**
 * 加载并设置钻石内层材质
 * 
 * 钻石分层渲染设计：
 * 钻石模型被分为内层和外层两部分，各自使用不同的材质：
 * - 内层（diamondInner）：处理钻石内部的折射和色散效果
 * - 外层（diamondOuter）：处理表面反射和高光
 * 
 * 这种分层方式能够：
 * - 更精确地模拟钻石光学特性
 * - 独立控制内部和表面效果
 * - 通过 alphaIndex 控制渲染顺序
 * 
 * NodeMaterial（节点材质）：
 * - 使用可视化编辑器创建的着色器
 * - 通过 JSON 文件定义节点图
 * - 支持在运行时动态修改参数
 * 
 * @param scene - 场景实例
 * @param diamond - 钻石主网格（用作父节点）
 * @param sphereMaterial - 包含折射纹理的球体材质
 * @param diamondColorPicker - UI 颜色选择器
 */
export async function loadDiamondInnerMaterial(
  scene: Scene,
  diamond: AbstractMesh | null,
  sphereMaterial: PBRMaterial,
  diamondColorPicker: ColorPicker,
  materialUrl: string
): Promise<void> {
  try {
    // 从 JSON 文件异步加载 NodeMaterial
    // JSON 文件由 Babylon.js Node Material Editor 生成
    const material = await NodeMaterial.ParseFromFileAsync(
      "diamondMaterialInner",
      materialUrl,
      scene
    );
    if (scene.isDisposed) return;
    
    const diamondInner = scene.getMeshByID("diamondInner");
    if (!diamondInner) return;

    // 启用深度预通道渲染
    // 对于半透明物体正确排序至关重要
    material.needDepthPrePass = true;
    
    diamondInner.material = material;
    
    // alphaIndex 控制透明物体的渲染顺序
    // 值越大越先渲染（在更卖面）
    diamondInner.alphaIndex = 1.6;
    
    // 设置父节点，确保内层跟随钻石主体移动
    diamondInner.parent = diamond;

    // ========================================
    // 配置 NodeMaterial 参数
    // ========================================
    // 获取颜色输入节点
    const colorBlock = material.getBlockByName("DiamondColor") as InputBlock;
    if (colorBlock?.isInput) {
      // 设置初始颜色（从 UI 颜色选择器获取）
      colorBlock.value = diamondColorPicker.value.clone();
    }

    // 设置折射纹理输入
    // 将之前创建的 RTT 传递给 NodeMaterial
    const refractionBlock = material.getBlockByName("RefractionBlock");
    if (refractionBlock) {
      if (refractionBlock instanceof InputBlock) {
        refractionBlock.value = sphereMaterial.refractionTexture;
      } else if ("texture" in refractionBlock) {
        // 处理 TextureBlock 类型
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (refractionBlock as any).texture = sphereMaterial.refractionTexture;
      }
    }

    // ========================================
    // 绑定 UI 交互
    // ========================================
    // 当用户通过颜色选择器修改颜色时，实时更新材质
    diamondColorPicker.onValueChangedObservable.add((color) => {
      if (colorBlock?.isInput) {
        colorBlock.value = color.clone();
      }
    });
  } catch (error) {
    if (!scene.isDisposed) throw error;
  }
}

/**
 * 加载并设置钻石外层材质
 * 
 * 外层材质的作用：
 * - 处理钻石表面的反射效果
 * - 生成高光和闪烁
 * - 与内层配合形成完整的钻石视觉
 * 
 * 与内层的区别：
 * - 外层没有 alphaIndex，正常渲染顺序
 * - 外层着色器可能更注重表面反射
 * - 两者共同使用同一个颜色选择器控制
 * 
 * @param scene - 场景实例
 * @param diamond - 钻石主网格（用作父节点）
 * @param sphereMaterial - 包含折射纹理的球体材质
 * @param diamondColorPicker - UI 颜色选择器
 */
export async function loadDiamondOuterMaterial(
  scene: Scene,
  diamond: AbstractMesh | null,
  sphereMaterial: PBRMaterial,
  diamondColorPicker: ColorPicker,
  materialUrl: string
): Promise<void> {
  try {
    // 加载钻石外层材质（处理表面效果）
    const material = await NodeMaterial.ParseFromFileAsync(
      "diamondMaterialOuter",
      materialUrl,
      scene
    );
    if (scene.isDisposed) return;
    
    const diamondOuter = scene.getMeshByID("diamondOuter");
    if (!diamondOuter) return;

    // 启用深度预通道，确保透明物体正确排序
    material.needDepthPrePass = true;
    diamondOuter.material = material;
    
    // 设置父节点，保持与钻石主体的层级关系
    diamondOuter.parent = diamond;

    // 配置颜色输入节点
    const colorBlock = material.getBlockByName("DiamondColor") as InputBlock;
    if (colorBlock?.isInput) {
      colorBlock.value = diamondColorPicker.value.clone();
    }

    // 配置折射纹理输入
    const refractionBlock = material.getBlockByName("RefractionBlock");
    if (refractionBlock) {
      if (refractionBlock instanceof InputBlock) {
        refractionBlock.value = sphereMaterial.refractionTexture;
      } else if ("texture" in refractionBlock) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (refractionBlock as any).texture = sphereMaterial.refractionTexture;
      }
    }

    // 绑定颜色选择器，与内层同步颜色变化
    diamondColorPicker.onValueChangedObservable.add((color) => {
      if (colorBlock?.isInput) {
        colorBlock.value = color.clone();
      }
    });
  } catch (error) {
    if (!scene.isDisposed) throw error;
  }
}

/**
 * 加载并设置布料材质
 * 
 * 布料材质的作用：
 * - 作为钻石展示台的基底
 * - 提供背景色彩，衮托钻石
 * - 参与折射计算（RTT 渲染列表中包含布料）
 * 
 * 材质特性：
 * - 使用 NodeMaterial 实现绒布质感
 * - 双面渲染（backFaceCulling = false）
 * - 低高光强度（specularIntensity = 0）
 * 
 * 与环境的联动：
 * - 布料和环境使用同一个颜色选择器
 * - 修改颜色时两者同步变化
 * - 创造统一的视觉效果
 * 
 * @param scene - 场景实例
 * @param cloth - 布料网格
 * @param environment - 环境网格
 * @param envColorPicker - 环境颜色选择器
 */
export async function loadClothMaterial(
  scene: Scene,
  cloth: AbstractMesh | null,
  environment: AbstractMesh | null,
  envColorPicker: ColorPicker,
  materialUrl: string
): Promise<void> {
  if (!cloth) return;

  try {
    // 加载布料材质（redCloth 为红色绒布质感）
    const material = await NodeMaterial.ParseFromFileAsync(
      "redCloth",
      materialUrl,
      scene
    );
    if (scene.isDisposed) return;

    // 禁用背面剔除，确保布料两面都可见
    // 这对于从不同角度观看场景很重要
    material.backFaceCulling = false;
    cloth.material = material;

    // 获取基础颜色输入节点
    const baseColorBlock = material.getBlockByName("baseColor") as InputBlock;

    // 设置 PBR 节点的高光强度为 0
    // 布料表面应该是哑光的，不应该有明显的高光
    const pbrBlock = material.getBlockByName("PBRMetallicRoughness");
    if (pbrBlock && "specularIntensity" in pbrBlock) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pbrBlock as any).specularIntensity = 0;
    }

    // ========================================
    // 绑定环境颜色选择器
    // ========================================
    // 同时更新布料和环境的颜色，保持视觉一致性
    envColorPicker.onValueChangedObservable.add((color) => {
      // 更新布料基础颜色
      if (baseColorBlock?.isInput) {
        baseColorBlock.value = color.clone();
      }
      // 同步更新环境材质的反射率颜色 (albedo)
      if (environment?.material) {
        (environment.material as PBRMaterial).albedoColor = color;
      }
    });

    // ========================================
    // 预编译材质
    // ========================================
    // 强制编译材质着色器，避免首次渲染时的卡顿
    // 预编译在后台完成，不影响加载体验
    await material.forceCompilationAsync(cloth);
  } catch (error) {
    if (!scene.isDisposed) throw error;
  }
}
