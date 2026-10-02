import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: "esbuild", // Or 'terser'
    rollupOptions: {
      treeshake: true,
    },
    cssCodeSplit: true,
  },
  plugins: [react()],
  server: {
    // host:'192.168.255.245',
    port: 3000,
    proxy: {
      "/api": {
        target: "https://coreapi.yoowifi.com", // Change to your API URL
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          const rewrittenPath = path.replace(/.*?\/api/, "");

          return rewrittenPath;
        }, // Removes "/api" before forwarding
      },
      // CRM uses a cert chain Node may not trust on :8443 — disabling verify fixes dev proxy 500s
      "/crm-jane": {
        target: "https://crm.yoowifi.com:8443",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/crm-jane/, "/jane"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "&": path.resolve(__dirname, "./"),
    },
  },
});
