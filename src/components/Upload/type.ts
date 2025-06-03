import { CancelTokenSource } from 'axios'

export interface UploadFile extends File {
  id: string
}
export interface UploadStatus {
  [fileName: string]: string
}
export interface UploadProgress {
  [fileName: string]: number
}
export interface UPLOAD_CONFIG {
  maxFileSize: number
  allowedTypes: string[]
  concurrencyLimit: number
}

export interface UploadProps {
  action: string | ((file: File) => Promise<string>)
  cancelToken?: CancelTokenSource // 添加这个属性
}

export interface UploadResponse {
  url: string
  status: 'success' | 'error'
  fileName?: string
  size?: number
  timestamp?: number
}
