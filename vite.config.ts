import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * public/templates/ 아래의 독립 정적 템플릿(clinic-basic 등)을 dev 서버에서도
 * 디렉터리 URL(/templates/foo/)로 열 수 있게 index.html로 리라이트한다.
 * 프로덕션(Netlify)은 디렉터리 인덱스를 스스로 해석하므로 dev 전용이다.
 */
function staticTemplatesDirIndex(): Plugin {
  return {
    name: "static-templates-dir-index",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (/^\/templates\/[^/]+\/$/.test(url)) {
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
});
