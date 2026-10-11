// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// ランディングページは Cloudflare 上の静的サイトとして公開するため、静的出力に固定する。
export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
