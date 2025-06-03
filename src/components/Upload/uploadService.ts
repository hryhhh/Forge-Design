import axios from 'axios'
import type { UploadProps, UploadResponse } from './type'

export interface UploadCallbacks {
  onProgress: (fileName: string, progress: number) => void
  onStatusChange: (fileName: string, status: string) => void
}

export const uploadFile = async (
  file: File,
  action: UploadProps['action'],
  callbacks: UploadCallbacks
): Promise<UploadResponse> => {
  // 统一处理 action，得到最终 url
  let url: string
  if (typeof action === 'function') {
    console.log('调用自定义 action 函数', file.name)
    url = await action(file)
    console.log('自定义 action 返回 URL:', url)
  } else {
    url = action
  }

  callbacks.onStatusChange(file.name, 'uploading')
  callbacks.onProgress(file.name, 0)

  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          callbacks.onProgress(file.name, progress)
        }
      },
      timeout: 5000,
    })
    console.log(res)

    callbacks.onStatusChange(file.name, 'success')

    return {
      url: res.data.url || url,
      status: 'success',
      fileName: file.name,
      size: file.size,
      timestamp: Date.now(),
    }
  } catch (err) {
    callbacks.onStatusChange(file.name, 'error')
    throw err
  }
}
