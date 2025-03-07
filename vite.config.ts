import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: 'https://www.lardemariapara.org/',
  assetsInclude: [
    "**/*.jpg",
    "**/*.JPG",
    "**/*.png",
    "**/*.jpeg",
    "**/*.svg",
    "**/*.webp",
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
