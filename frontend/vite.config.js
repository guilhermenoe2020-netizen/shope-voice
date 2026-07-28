import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Evita CORS em dev e mantém o front "cego" à URL real da API
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
