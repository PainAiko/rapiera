import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app':resolve(__dirname, './src/app'),
      '@pages': resolve(__dirname, './src/pages'),
      '@shared': resolve(__dirname, './src/shared'),
      '@assets': resolve(__dirname, './src/shared/assets'),
      '@utils': resolve(__dirname, './src/shared/utils'),
      '@components': resolve(__dirname, './src/shared/components'),
      '@config': resolve(__dirname, './src/shared/config'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@features': resolve(__dirname, './src/features'),
      '@entities': resolve(__dirname, './src/entities')
    }
  },
  build: {
    ssr: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react_chunk': ['react', 'react-dom', 'react-router-dom'],
          'redux_chunk': ['@reduxjs/toolkit', 'react-redux'],
          'utils_chunk': ['moment', 'js-cookie', 'sweetalert2'],
          'jspdf_chunk': ['jspdf','jspdf-autotable'],
          'api_chunk': ['axios', 'graphql', '@apollo/client', 'event-source-polyfill'],
          'react_lib_chunk': ['react-data-table-component', 'react-image-file-resizer', 'react-signature-canvas']
        }
      }
    },
  }
})
