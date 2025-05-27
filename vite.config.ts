import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 调整 chunk 大小警告限制
    chunkSizeWarningLimit: 1000, // 提高到 1MB
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks: {
          // 将 React 相关库分离
          react: ['react', 'react-dom'],
          // 将工具库分离
          utils: ['classnames', '@fortawesome/fontawesome-svg-core'],
          // 将 Storybook 相关分离
          storybook: ['@storybook/react', '@storybook/blocks'],
        },
      },
    },
  },
})
