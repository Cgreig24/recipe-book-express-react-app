import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.VITE_API_URL,
  },
  plugins: [react()],
});
