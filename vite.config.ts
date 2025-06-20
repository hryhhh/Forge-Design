import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks: {
          // 将 React 相关库分离
          react: ['react', 'react-dom'],
          // 将工具库分离
          utils: ['classnames', '@fortawesome/fontawesome-svg-core'],
          // 将 Storybook 相关分离
          storybook: ['@storybook/react-vite', '@storybook/addon-docs/blocks'],
        },
      },
    },
  },
})
