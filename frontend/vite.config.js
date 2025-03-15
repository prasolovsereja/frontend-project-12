import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: import.meta.env.VITE_API_URL || 'http://localhost:5001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: import.meta.env.VITE_WS_URL || 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
