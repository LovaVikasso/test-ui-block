import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Switch to Dart Sass modern compiler API to avoid legacy-js-api deprecation
        api: "modern-compiler",
        // Additionally silence the warning in case a dependency still invokes the legacy API
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
});
