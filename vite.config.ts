// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
        target: 'es2015',  // Ensure compatibility for older JavaScript engines

    outDir: "build", // Explicitly set to 'dist' (Vite's default)
    // outDir: "dist", // Explicitly set to 'dist' (Vite's default)
    sourcemap: mode === "development", // Optional: sourcemaps for dev
  },
}));