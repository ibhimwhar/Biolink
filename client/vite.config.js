import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/auth': import.meta.env.VITE_API_BASE_URL,
      '/api': import.meta.env.VITE_API_BASE_URL
    }
  }
})
