import { useState, useCallback } from 'react'
import { validateFiles, getFilePreview } from './utils'
import { uploadFile } from './uploadService'
import { UploadProps } from './type'

export const useUpload = ({ action, cancelToken }: UploadProps) => {
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

    const newStatus: Record<string, string> = {}
    validFiles.forEach(file => {
      newStatus[file.name] = '待上传'
    })
    setUploadStatus(prev => ({ ...prev, ...newStatus }))
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
    setIsUploading(true)

    for (const file of files) {
      if (uploadStatus[file.name] === '待上传') {
        try {
          const res = await uploadFile(file, action, {
            onProgress: (fileName, progress) => {
              setUploadProgress(prev => ({ ...prev, [fileName]: progress }))
            },
            onStatusChange: (fileName, status) => {
              setUploadStatus(prev => ({ ...prev, [fileName]: status }))
            },
          })

          console.log(`文件 ${file.name} 上传成功, `, res)
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : '上传失败'
          console.error(`文件 ${file.name} 上传失败:`, err)
          setErrors(prev => [...prev, `文件 ${file.name} ${errorMessage}`])
          setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }))
        }
      }
    }

    setIsUploading(false)
  }, [files, uploadStatus, action])
  const handleCancel = useCallback(
    (fileId: string) => {
      if (cancelToken) {
        cancelToken.cancel('Upload cancelled by user')
        setUploadStatus(prev => ({ ...prev, [fileId]: 'cancelled' }))
        setIsUploading(false)
      }
    },
    [cancelToken]
  )

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
    handleCancel,
  }
}
