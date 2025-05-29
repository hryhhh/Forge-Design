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
