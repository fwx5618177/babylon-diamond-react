/**
 * ============================================================================
 * createUI.ts - GUI 控制面板模块
 * ============================================================================
 * 
 * 设计说明：
 * 使用 @babylonjs/gui 库创建交互式控制面板，允许用户实时调整：
 * 1. 钻石颜色 - 控制钻石的色调
 * 2. 环境颜色 - 控制展示台布料的颜色
 * 
 * Babylon.js GUI 系统特点：
 * - AdvancedDynamicTexture：2D GUI 的容器
 * - 支持全屏 UI 或纹理 UI
 * - 通过 layerMask 与 3D 场景分离渲染
 * 
 * UI 布局结构：
 * ┌─────────────────────────────────────┐
 * │                                     │
 * │                        ┌──────────┐ │
 * │                        │Diamond   │ │
 * │                        │Color     │ │
 * │                        │[Picker]  │ │
 * │                        ├──────────┤ │
 * │                        │Environ   │ │
 * │                        │Color     │ │
 * │                        │[Picker]  │ │
 * │                        └──────────┘ │
 * └─────────────────────────────────────┘
 * 
 * ============================================================================
 */

import {
  AdvancedDynamicTexture,
  ColorPicker,
  Control,
  StackPanel,
  TextBlock,
} from "@babylonjs/gui";
import { Color3, Scene } from "@babylonjs/core";

/**
 * UI 设置返回值接口
 */
export interface UISetup {
  ui: AdvancedDynamicTexture;       // GUI 容器
  diamondColorPicker: ColorPicker;  // 钻石颜色选择器
  envColorPicker: ColorPicker;      // 环境颜色选择器
}

/**
 * 创建交互式 UI 控制面板
 * 
 * @param scene - Babylon.js 场景实例
 * @returns {UISetup} 包含 UI 容器和颜色选择器的对象
 * 
 * 使用方式：
 * 通过监听 ColorPicker 的 onValueChangedObservable 事件
 * 在颜色变化时更新材质参数
 */
export function createUI(scene: Scene): UISetup {
  // ========================================
  // 创建全屏 UI 容器
  // ========================================
  // CreateFullscreenUI 创建覆盖整个画布的 GUI 层
  // 参数2 (true) 表示启用前景渲染
  const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
  
  // 设置 UI 层的 layerMask 为 2
  // 这样只有 uiCamera (layerMask=2) 会渲染这个 UI
  if (ui.layer) {
    ui.layer.layerMask = 2;
  }

  // ========================================
  // 钻石颜色控制面板
  // ========================================
  // StackPanel 是垂直或水平排列子控件的容器
  const diamondColorPanel = new StackPanel();
  diamondColorPanel.width = "200px";
  diamondColorPanel.isVertical = true;  // 垂直排列
  // 定位到屏幕右侧中央
  diamondColorPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  diamondColorPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  ui.addControl(diamondColorPanel);

  // 标题文本
  const diamondColorText = new TextBlock();
  diamondColorText.text = "Diamond Color";
  diamondColorText.color = "White";
  diamondColorText.height = "30px";
  diamondColorPanel.addControl(diamondColorText);

  // 颜色选择器控件
  const diamondColorPicker = new ColorPicker();
  // 默认颜色：暖橙色 (#ef7c50)，产生温暖的钻石色调
  diamondColorPicker.value = Color3.FromHexString("#ef7c50");
  diamondColorPicker.height = "150px";
  diamondColorPicker.width = "150px";
  diamondColorPicker.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  diamondColorPanel.addControl(diamondColorPicker);

  // ========================================
  // 环境颜色控制面板
  // ========================================
  const envColorPanel = new StackPanel();
  envColorPanel.width = "200px";
  envColorPanel.isVertical = true;
  envColorPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  envColorPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  // paddingTop 使其显示在钻石颜色面板下方
  envColorPanel.paddingTop = "500px";
  ui.addControl(envColorPanel);

  // 标题文本
  const envColorText = new TextBlock();
  envColorText.text = "Environment Color";
  envColorText.color = "White";
  envColorText.height = "30px";
  envColorPanel.addControl(envColorText);

  // 颜色选择器控件
  const envColorPicker = new ColorPicker();
  // 默认颜色：接近黑色 (#000001)，深色背景突出钻石
  envColorPicker.value = Color3.FromHexString("#000001");
  envColorPicker.height = "150px";
  envColorPicker.width = "150px";
  envColorPicker.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  envColorPanel.addControl(envColorPicker);

  return { ui, diamondColorPicker, envColorPicker };
}
