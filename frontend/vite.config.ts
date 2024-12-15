import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  server:{
    proxy:{
      "/api":{
        target: "http://localhost:5000",
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
