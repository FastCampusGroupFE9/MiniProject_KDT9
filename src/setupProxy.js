import { createProxyMiddleware } from "http-proxy-middleware";

export default function setupProxy(app) {
  app.use(
    "/api", // 프록시로 설정할 경로
    createProxyMiddleware({
      target: "http://52.78.200.157", // 프록시로 보낼 서버의 주소
      changeOrigin: true, // 호스트 헤더를 변경하여 프록시 서버에 접속
      rewrite: (path) => path.replace(/^\/api/, ""),
    }),
  );
}

// proxy: {
//   "/kdt5": {
//     target: "https://chickenlecture.xyz/api",
//     changeOrigin: true,
//     secure: true,
//     rewrite: (path) => path.replace(/^\/kdt5/, ""),
//   },
// },
// },