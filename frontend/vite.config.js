import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { API_URL, WS_URL } from './config.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: API_URL,
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: WS_URL,
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
