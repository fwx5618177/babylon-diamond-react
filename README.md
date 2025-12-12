# Babylon Diamond React

[中文文档](./README_ZH.md)

A 3D diamond rendering demo built with Babylon.js and React. Realistic refraction, reflection, and light dispersion effects.

![Diamond Preview](./public/image.png)

## Features

- Realistic refraction using RenderTargetTexture (RTT)
- Dual-layer rendering for authentic diamond optics
- Real-time color adjustment
- Post-processing: chromatic aberration, bloom, vignette
- Auto-rotation showcase

## Tech Stack

- React 18 + TypeScript + Vite
- Babylon.js
- pnpm

## Project Structure

```
src/
├── main.tsx
├── App.tsx
└── scene/
    ├── DiamondScene.tsx    # Main scene
    ├── setup/              # Camera & lights
    ├── materials/          # Materials & refraction
    ├── ui/                 # Color pickers
    └── postprocess/        # Effects
```

## Quick Start

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## How It Works

1. **Refraction**: Invisible helper sphere + RTT captures environment
2. **Layered Materials**: Inner (refraction) + Outer (reflection)
3. **NodeMaterial**: Custom shaders via JSON
4. **Post-Processing**: Chromatic aberration + bloom + vignette

## Controls

- Mouse drag: Rotate
- Scroll: Zoom
- Color pickers: Adjust diamond/environment colors
