import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// https://rsbuild.dev/guide/basic/configure-rsbuild
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    favicon: "src/assets/favicon.ico",
    title: "Encurta Ai",
    meta: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      'color-scheme': 'light dark',
    },
    links: [
      {
        rel: 'stylesheet',
        href: 'css/pico.min.css',
      },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5150",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
