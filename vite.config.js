import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/entry.js"),
      name: "MyLogin",
      // the proper extensions will be added
      fileName: "my-login",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "@cloudbase/js-sdk", "axios"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "@cloudbase/js-sdk": "cloudbase",
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi", "vue"],
  },

  plugins: [vue(), Unocss({})],
  server: { port: 3000 },
});
