import { useState, useCallback } from 'react'

import { validateFiles, getFilePreview } from './utils'
import { uploadFile } from './uploadService'
import { uploadConfig } from './utils'

export const useUpload = () => {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  )
  const [errors, setErrors] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  //处理文件选择事件，验证文件大小和类型，更新状态和错误信息
  const handleSelect = useCallback((selectedFiles: FileList | null) => {
    const { validFiles, newErrors } = validateFiles(selectedFiles)
    setFiles(prev => [...prev, ...validFiles])
    setErrors(newErrors)
  }, [])

  //处理文件拖拽事件，验证文件大小和类型，更新状态和错误信息
  const handleDrag = useCallback((e: React.DragEvent) => {
    // 阻止默认行为和事件冒泡
    e.preventDefault()
    e.stopPropagation()
    //当文件进入或悬停在拖拽区域时，设置 dragActive 为 true
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  //处理文件拖拽释放事件
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()

      setDragActive(false)

      //如果释放的文件列表不为空，调用 handleSelect 处理文件
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleSelect(e.dataTransfer.files)
      }
    },
    [handleSelect]
  )

  const removeFile = useCallback(
    (fileName: string) => {
      const file = files.find(f => f.name === fileName)
      if (file && file.type.startsWith('image/')) {
        const preview = getFilePreview(file)
        if (preview) {
          URL.revokeObjectURL(preview)
        }
      }

      setFiles(prev => prev.filter(f => f.name !== fileName))

      setUploadProgress(pre => {
        const newProgress = { ...pre }
        delete newProgress[fileName]
        return newProgress
      })
      setUploadStatus(pre => {
        const newStatus = { ...pre }
        delete newStatus[fileName]
        return newStatus
      })
    },
    [files]
  )

  const handleUpload = useCallback(async () => {
    const pendingFiles = files.filter(f => !uploadStatus[f.name])
    if (pendingFiles.length === 0) return

    setIsUploading(true)

    try {
      for (
        let i = 0;
        i < pendingFiles.length;
        i += uploadConfig.concurrencyLimit
      ) {
        const promises = pendingFiles
          .slice(i, (i += uploadConfig.concurrencyLimit))
          .map(file =>
            uploadFile(file, {
              onProgress: (fileName, progress) => {
                setUploadProgress(prev => ({ ...prev, [fileName]: progress }))
              },
              onStatusChange: (fileName, status) => {
                setUploadStatus(prev => ({ ...prev, [fileName]: status }))
              },
            })
          )
        await Promise.all(promises)
      }
    } finally {
      setIsUploading(false)
    }
  }, [files, uploadStatus])

  return {
    files,
    dragActive,
    uploadStatus,
    uploadProgress,
    errors,
    isUploading,
    handleSelect,
    handleDrag,
    handleDrop,
    handleUpload,
    getFilePreview,
    removeFile,
  }
}
