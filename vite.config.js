import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ganti "/sisi-otaku/" dengan "/NAMA-REPO-KAMU/" jika nama repo GitHub kamu berbeda.
// Jika deploy ke Vercel/Netlify (bukan GitHub Pages), ganti base menjadi "/".
export default defineConfig({
  plugins: [react()],
  base: "/sisi-otaku/",
});
