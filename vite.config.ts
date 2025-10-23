import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', //prompt, autoUpdate
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Cachea todo esto
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/,
            handler: 'NetworkOnly', // O 'StaleWhileRevalidate' si querés que se vea lo último cargado y luego actualice
            options: {
              cacheName: 'leaflet-tiles',
            },
          }
        ],
      },
      manifest: {
        name: 'Pcp - App Choferes',
        short_name: 'PcP Choferes',
        description: 'App para choferes de Paseos con Peques',
        theme_color: '#332876',
        background_color: '#332876',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
