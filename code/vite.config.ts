import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
              "vue",
              "vue-router",
              "vuex",
              {
                "@vueuse/core": [
                  "useMouse",
                  ["useFetch", "useMyFetch"]
                ],
                axios: [
                  ["default", "axios"]
                ],
                vue: ["PropType", "defineProps", "InjectionKey", "Ref"]
              }
            ],
            dirs: [],
            dts: "src/types/auto-imports.d.ts",
            vueTemplate: false,
            eslintrc: {
              enabled: false,
              filepath: "./.eslintrc-auto-import.json",
              globalsPropValue: true
            }
        }),
        Components({
            dirs: ['src/components', 'src/views'], // 指定components位置 預設是'src/components'
            // include: [/\.vue$/],
            dts: 'src/types/components.d.ts', // .d.ts生成位置
            extensions: ['vue'],
        }),
    ],

    resolve: {
        alias: { // 設定別名
            '@': path.resolve(__dirname, 'src') // 根目錄下的 src 資料夾
        }
    },

    // 代理伺服器
    server: {
        host: true, // [!]預設是掛載 localhost，設定為 true 可以允許外部連接 (Vite 才能連 Docker Container 的 port)
        port: 5173,
        strictPort: false, // Port被占用時直接退出， false會嘗試連接下一個可用Port
        open: true, // dev時自動打開網頁，也可以給網址指定。
        // 自訂代理規則，配合後端進行Api呼叫等。
        // 預設使用 [http-proxy](https://github.com/http-party/node-http-proxy) 完整設定請見官方
        // proxy: {
        //     '/api': {
        //         target: 'http://www.opshell/api/', // 本機串接
        //         ws: true, // 代理的WebSockets
        //         changeOrigin: true, // 允許websockets跨域
        //         rewrite: (path) => path.replace(/^\/api/, ''),
        //     },
        // },
    },

    // 共用全域 SCSS
    css: {
      preprocessorOptions: {
          scss: {
              additionalData: `@import "@/assets/scss/opshell.scss";`,
              charset: false,
          },
      },
  },
});
