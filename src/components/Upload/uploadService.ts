import axios from 'axios'

export interface UploadCallbacks {
  onProgress: (fileName: string, progress: number) => void
  onStatusChange: (fileName: string, status: string) => void
}

export const uploadFile = async (file: File, callbacks: UploadCallbacks) => {
  const formData = new FormData()
  formData.append('file', file)

  callbacks.onStatusChange(file.name, 'uploading')
  callbacks.onProgress(file.name, 0)

  try {
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // 监听上传进度事件，更新上传进度
        onUploadProgress: progressEvent => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            callbacks.onProgress(file.name, progress)
          }
        },
        timeout: 5000,
      }
    )
    callbacks.onStatusChange(file.name, 'success')

    console.log(res.data)
    return res.data
  } catch (err) {
    callbacks.onStatusChange(file.name, 'error')
    throw err
  }
}
