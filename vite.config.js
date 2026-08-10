
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Production exposes only minified bundles, never original JSX source maps.
    sourcemap: false,
  },
  server: {
    watch: {
      usePolling: true, // Yeh line aapke save karte hi browser ko update karegi
    },
  },
});
