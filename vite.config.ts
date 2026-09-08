import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import glsl from "vite-plugin-glsl";
import { readFileSync } from "node:fs";

export default defineConfig({
  publicDir: "generated/public",
  plugins: [react(), glsl(), {
    name: "preload-scene-assets",
    transformIndexHtml() {
      const assets = JSON.parse(readFileSync(new URL("./src/generated/assets.json", import.meta.url), "utf8"));
      return [
        ...[assets.model, assets.diamondInner, assets.diamondOuter, assets.redCloth].map(href => ({
          tag: "link", attrs: { rel: "preload", as: "fetch", href, crossorigin: "anonymous" },
        })),
        ...assets.textures.map((href: string) => ({
          tag: "link", attrs: { rel: "preload", as: "image", href, crossorigin: "anonymous" },
        })),
      ];
    },
  }],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".frag", ".vert"],
  },
});
