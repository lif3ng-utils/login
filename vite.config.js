import { defineConfig } from "vite";
import path from "path";
import { isVue2 } from "vue-demi";
import vue from "@vitejs/plugin-vue";
// import { createVuePlugin as vue2 } from "vite-plugin-vue2";
import Unocss from "unocss/vite";

console.log({ isVue2 });
// const vue = isVue2 ? vue2 : vue3;
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: path.resolve(__dirname, `./node_modules/${isVue2 ? "vue2" : "vue"}`),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/entry.js"),
      name: "MyLogin",
      // the proper extensions will be added
      fileName: "my-login",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "vue2",
        "@vue/composition-api",
        "@cloudbase/js-sdk",
        "axios",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          vue2: "Vue",
          axios: "axios",
          "@cloudbase/js-sdk": "cloudbase",
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["vue"],
  },

  plugins: [vue(), Unocss({})],
  server: { port: 3000 },
});
