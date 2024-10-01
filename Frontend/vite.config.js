import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
      },
    },
  },
  plugins: [react()],
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      process.env.VITE_API_BASE_URL
    ),
    // "process.env.VITE_API_KEY": JSON.stringify(process.env.VITE_API_KEY),
  },
});

// import.meta.env.VITE_API_BASE_URL;