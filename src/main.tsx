/**
 * ============================================================================
 * main.tsx - 应用程序入口文件
 * ============================================================================
 * 
 * 
 * 项目架构：
 * src/
 * ├── main.tsx          # 入口文件，挂载 React 应用
 * ├── App.tsx           # 根组件，渲染 3D 场景
 * ├── scene/            # 3D 场景相关模块
 * │   ├── DiamondScene.tsx   # 主场景组件
 * │   ├── setup/             # 相机和灯光设置
 * │   ├── materials/         # 材质和折射效果
 * │   ├── ui/                # GUI 控制面板
 * │   └── postprocess/       # 后处理效果
 * └── styles/           # 全局样式
 * 
 * ============================================================================
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App";

/**
 * 使用 React 18 的 createRoot API 挂载应用
 * 
 * StrictMode 的作用：
 * 1. 检测不安全的生命周期方法
 * 2. 检测遗留的 Context API
 * 3. 检测意外的副作用
 * 4. 在开发模式下会故意双重渲染组件以发现问题
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
