# Babylon Diamond React

[English](./README.md)

基于 Babylon.js 和 React 的 3D 钻石渲染演示。实现逼真的折射、反射和光色散效果。

![钻石预览](./public/image.png)

## 功能特性

- 使用 RenderTargetTexture (RTT) 实现逼真折射
- 内外层分离的材质系统
- 实时颜色调整
- 后处理：色差、泛光、暗角
- 自动旋转展示

## 技术栈

- React 18 + TypeScript + Vite
- Babylon.js
- pnpm

## 项目结构

```
src/
├── main.tsx
├── App.tsx
└── scene/
    ├── DiamondScene.tsx    # 主场景
    ├── setup/              # 相机和灯光
    ├── materials/          # 材质和折射
    ├── ui/                 # 颜色选择器
    └── postprocess/        # 后处理效果
```

## 快速开始

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

## 实现原理

1. **折射**：不可见辅助球体 + RTT 捕获环境
2. **分层材质**：内层（折射）+ 外层（反射）
3. **NodeMaterial**：通过 JSON 定义自定义着色器
4. **后处理**：色差 + 泛光 + 暗角

## 控制

- 鼠标拖拽：旋转
- 滚轮：缩放
- 颜色选择器：调整钻石/环境颜色
