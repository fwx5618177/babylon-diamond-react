/**
 * ============================================================================
 * materials/index.ts - 材质模块导出
 * ============================================================================
 * 
 * 这是材质系统的统一导出入口。
 * 采用 Barrel Export 模式，简化外部导入语句。
 * 
 * 导出内容：
 * - createRefractionSetup: 创建折射渲染系统
 * - setupShadowMaterial: 设置阴影材质
 * - loadDiamondInnerMaterial: 加载钻石内层材质
 * - loadDiamondOuterMaterial: 加载钻石外层材质
 * - loadClothMaterial: 加载布料材质
 * - MaterialsContext: 材质上下文类型定义
 * 
 * ============================================================================
 */

export {
  createRefractionSetup,
  setupShadowMaterial,
  loadDiamondInnerMaterial,
  loadDiamondOuterMaterial,
  loadClothMaterial,
  type MaterialsContext,
} from "./loadMaterials";
