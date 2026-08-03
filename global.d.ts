// 支持 .scss 文件导入
declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

// 支持 vite-plugin-sass 导入
declare module 'vite-plugin-sass' {
  import { Plugin } from 'vite'
  const sassPlugin: () => Plugin
  export default sassPlugin
}

// 显式声明 import.meta.env 类型（解决 VSCode TS server 识别问题）
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_UPLOAD_ACTION?: string
  [key: string]: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 引用 vite/client 类型（备用，确保类型完整）
/// <reference types="vite/client" />
