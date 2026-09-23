import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * public/ 아래의 독립 정적 템플릿을 dev 서버에서도 디렉터리 URL로 열 수 있게
 * index.html로 리라이트한다. 프리미엄 디자인은 /<브랜드>/, 나머지는 /templates/<이름>/ 이다.
 * 프로덕션(Netlify)은 디렉터리 인덱스를 스스로 해석하므로 dev 전용이다.
 */
function staticTemplatesDirIndex(): Plugin {
  const publicDir = path.resolve(import.meta.dirname, "./public");
  return {
    name: "static-templates-dir-index",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (
          url.length > 1 &&
          url.endsWith("/") &&
          !url.includes("..") &&
          fs.existsSync(path.join(publicDir, url, "index.html"))
        ) {
          req.url = `${url}index.html`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [staticTemplatesDirIndex(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // 자주 안 바뀌는 라이브러리를 따로 묶어 배포마다 다시 받지 않게 한다
        manualChunks(id: string) {
          if (/node_modules[\/](react|react-dom|react-router|react-router-dom|scheduler)[\/]/.test(id)) return "vendor-react";
          if (id.includes("@supabase")) return "vendor-supabase";
          return undefined;
        },
      },
    },
  },
});
