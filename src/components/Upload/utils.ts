import { UPLOAD_CONFIG } from './type'

export const uploadConfig: UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024,
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  concurrencyLimit: 3,
}
export const validateFiles = (selectedFiles: FileList | null) => {
  if (!selectedFiles) return { validFiles: [], newErrors: [] }

  const validFiles: File[] = []
  const newErrors: string[] = []

  Array.from(selectedFiles).forEach(file => {
    if (file.size > uploadConfig.maxFileSize) {
      newErrors.push(`文件 ${file.name} 大小超过10MB限制`)
      return
    }
    if (!uploadConfig.allowedTypes.includes(file.type)) {
      newErrors.push(`文件 ${file.name} 类型不支持`)
      return
    }
    validFiles.push(file)
  })
  return { validFiles, newErrors }
}

export const getFilePreview = (file: File): string | null => {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return null
}
