import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sassDts from "vite-plugin-sass-dts";
import mkcert from "vite-plugin-mkcert";
import path from "path";

const __dirname = path.resolve();

export default defineConfig({
  plugins: [react(), sassDts(), mkcert()],
  resolve: {
    alias: [{ find: "@", replacement: `${__dirname}/src` }],
  },
  server: {
    host: "hmteresting.netlify.app",
    proxy: {
      "/mini": {
        target: "https://miniproject-team9.p-e.kr/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/mini/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'src/App.tsx', // 혹은 다른 진입 파일로 변경
      },
    },
  },
});
