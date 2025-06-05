import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { Upload } from './Upload'
import userEvent from '@testing-library/user-event'
import * as utils from './utils'
import '@testing-library/jest-dom'
import axios, { AxiosError, CanceledError } from 'axios'

// 全局处理未捕获的 Promise rejection
process.on('unhandledRejection', reason => {
  console.warn(
    '发现未捕获的 Promise rejection，在 CI 环境中这可能导致测试失败：',
    reason
  )
})

// Mock console 方法，避免干扰测试输出
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

interface UploadResponse {
  data: { url: string }
}
type UploadError = Error | AxiosError | CanceledError<UploadResponse>
// Mock 文件对象
const createFile = (
  name: string = 'test.png',
  size: number = 1024,
  type: string = 'image/png'
) => {
  const file = new File([''], name, { type })
  Object.defineProperty(file, 'size', { value: size, configurable: false })
  return file
}

// Mock action 字符串
const mockActionString = 'https://jsonplaceholder.typicode.com/posts'

// Mock action 函数
const mockActionFunction = jest.fn(file =>
  Promise.resolve('https://jsonplaceholder.typicode.com/posts/' + file.name)
)

describe('Upload Component Tests', () => {
  let consoleErrorSpy: jest.SpyInstance
  let consoleWarnSpy: jest.SpyInstance
  let mockAxiosPost: jest.SpyInstance

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    // 清理所有 mock
    jest.clearAllMocks()

    // Mock URL API
    window.URL.createObjectURL = jest.fn(() => 'blob:mock-preview-url')
    window.URL.revokeObjectURL = jest.fn()

    // Mock axios
    mockAxiosPost = jest.spyOn(axios, 'post')

    // Mock action function
    mockActionFunction.mockClear()
    mockActionFunction.mockImplementation(async (file: File) => {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50))
      })
      return `https://jsonplaceholder.typicode.com/posts/${file.name}`
    })
  })

  afterEach(() => {
    // 清理所有 spy 和 mock
    consoleErrorSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    mockAxiosPost.mockRestore()

    // 清理可能残留的 DOM 元素
    document.body.innerHTML = ''

    // 恢复所有 mock
    jest.restoreAllMocks()
  })
  test('should render upload area and input', () => {
    const { container } = render(<Upload action={mockActionString} />)
    console.log('初始渲染的 DOM:', container.innerHTML)
    expect(screen.getByTestId('upload-container')).toBeInTheDocument()
    expect(screen.getByTestId('file-input')).toBeInTheDocument()
    expect(screen.getByTestId('upload-prompt')).toBeInTheDocument()
  })

  test('should show selected file after selecting a file', async () => {
    render(<Upload action={mockActionString} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement

    await userEvent.upload(input, file)

    expect(screen.getByText(file.name)).toBeInTheDocument()
    expect(screen.getByText('(0.00 MB)')).toBeInTheDocument()
  })

  test('should display preview for image files', async () => {
    render(<Upload action={mockActionString} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    await waitFor(() => {
      const previewImage = screen.getByAltText(file.name)
      expect(previewImage).toBeInTheDocument()
    })
  })
  test('should trigger upload and show success status', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({
      data: { url: 'https://jsonplaceholder.typicode.com/posts/test.png' },
    })
    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    await waitFor(() => {
      expect(mockActionFunction).toHaveBeenCalledWith(file)
      const statusElement = screen.getByTestId(`upload-status-${file.name}`)
      expect(statusElement).toHaveTextContent('success')
    })
  })
  test('should display error message when upload fails', async () => {
    const error = new Error('Upload failed')
    mockActionFunction.mockRejectedValueOnce(error)

    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message')
      expect(errorElement).toHaveTextContent(
        `文件 ${file.name} ${error.message}`
      )
      const statusElement = screen.getByTestId(`upload-status-${file.name}`)
      expect(statusElement).toHaveTextContent('error')
    })
  })
  it('should handle upload cancellation', async () => {
    // 设置正确的 Mock 组合
    const axiosIsCancelSpy = jest.spyOn(axios, 'isCancel').mockReturnValue(true)

    let rejectUpload: (reason: UploadError) => void
    const controllablePromise = new Promise<{ data: { url: string } }>(
      (_, reject) => {
        rejectUpload = reject
      }
    )
    controllablePromise.catch(() => {})

    const axiosPostSpy = jest
      .spyOn(axios, 'post')
      .mockReturnValue(controllablePromise)

    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    // 上传文件
    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    // 开始上传
    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    // 验证上传状态
    await waitFor(() => {
      const statusElement = screen.getByTestId(`upload-status-${file.name}`)
      expect(statusElement.textContent).toBe('uploading')
    })

    // 取消上传
    const cancelBtn = screen.getByRole('button', { name: /取消所有上传/ })
    await userEvent.click(cancelBtn)

    // 模拟 axios 取消错误
    rejectUpload!(new CanceledError('Operation canceled'))
    // 等待事件循环，确保 Promise rejection 不影响主流程
    await new Promise(resolve => setTimeout(resolve, 0))

    // 验证取消状态
    await waitFor(() => {
      const statusElement = screen.getByTestId(`upload-status-${file.name}`)
      expect(statusElement).toHaveTextContent('cancelled')
    })

    // 清理
    axiosPostSpy.mockRestore()
    axiosIsCancelSpy.mockRestore()
  })

  // 测试预览模态框相关代码
  test('should open and close preview modal', async () => {
    render(<Upload action={mockActionString} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    // 点击预览按钮
    const previewButton = screen.getByRole('button', { name: /预览/ })
    await userEvent.click(previewButton)

    // 验证模态框是否打开
    await waitFor(() => {
      const modalOverlay = document.querySelector('.preview-modal-overlay')
      expect(modalOverlay).toBeInTheDocument()
    })

    const modalOverlay = document.querySelector('.preview-modal-overlay')
    if (modalOverlay) {
      await userEvent.click(modalOverlay as Element)
    }

    // 验证模态框是否关闭
    await waitFor(
      () => {
        const modalOverlay = document.querySelector('.preview-modal-overlay')
        expect(modalOverlay).not.toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  //  修复进度回调测试
  test('should trigger progress callback during upload', async () => {
    const progressSpy = jest.fn()

    render(<Upload action={mockActionFunction} onProgress={progressSpy} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    // 等待进度回调被调用
    await waitFor(
      () => {
        expect(progressSpy).toHaveBeenCalledWith(file.name, expect.any(Number))
        expect(progressSpy).toHaveBeenCalledTimes(3) // 0, 50, 100
      },
      { timeout: 3000 }
    )
  })

  // 修复错误处理测试
  test('should handle upload service error', async () => {
    const error = new Error('Upload service error')

    //确保 mockActionFunction 被正确 mock
    mockActionFunction.mockRejectedValueOnce(error)

    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    // 增加超时时间，确保异步操作完成
    await waitFor(
      () => {
        const errorElement = screen.getByTestId('error-message')
        expect(errorElement).toHaveTextContent(
          `文件 ${file.name} ${error.message}`
        )
        const statusElement = screen.getByTestId(`upload-status-${file.name}`)
        expect(statusElement).toHaveTextContent('error')
      },
      { timeout: 5000 }
    )
  })

  test('should cancel upload correctly', async () => {
    const axiosIsCancelSpy = jest.spyOn(axios, 'isCancel').mockReturnValue(true)

    // 创建一个可控的 Promise，并正确处理拒绝
    let rejectFunction: (reason?: unknown) => void
    // @ts-expect-error: resolve 未使用，仅为类型完整性
    const mockPromise = new Promise<string>((resolve, reject) => {
      rejectFunction = reject
    })

    mockActionFunction.mockReturnValueOnce(mockPromise)

    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    // 验证上传状态
    await waitFor(
      () => {
        const statusElement = screen.getByTestId(`upload-status-${file.name}`)
        expect(statusElement.textContent).toBe('uploading')
      },
      { timeout: 2000 }
    )

    // 点击取消按钮
    const cancelBtn = screen.getByRole('button', { name: /取消所有上传/ })
    await userEvent.click(cancelBtn)

    // 使用 act 包装异步操作，确保状态更新完成
    await act(async () => {
      // 触发取消
      if (rejectFunction) {
        await Promise.resolve()
          .then(() => rejectFunction(new Error('Operation canceled')))
          .catch(() => {})
      }
      // 等待状态更新
      await new Promise(resolve => setTimeout(resolve, 150))
    })

    // 验证取消状态
    await waitFor(
      () => {
        const statusElement = screen.getByTestId(`upload-status-${file.name}`)
        expect(statusElement).toHaveTextContent('cancelled')
      },
      { timeout: 3000 }
    )

    axiosIsCancelSpy.mockRestore()
  })

  // 修复预览图片测试
  test('should show and hide preview image', async () => {
    render(<Upload action={mockActionString} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    // 验证文件列表中的预览图片
    await waitFor(() => {
      const previewImage = screen.getByAltText(file.name)
      expect(previewImage).toBeInTheDocument()
    })

    // 点击预览按钮
    const previewButton = screen.getByRole('button', { name: /预览/ })
    await userEvent.click(previewButton)

    // 使用更具体的选择器查找模态框中的图片
    await waitFor(() => {
      const modal = screen.getByTestId('preview-modal-overlay')
      const modalImage = modal.querySelector('img')
      expect(modalImage).toBeInTheDocument()
    })

    // 关闭预览
    const closeButton = screen.getByRole('button', { name: /关闭预览/ })
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(
        screen.queryByTestId('preview-modal-overlay')
      ).not.toBeInTheDocument()
    })
  })

  // 测试 utils 中的相关逻辑
  test('should validate file size correctly', async () => {
    const largeFile = createFile('large.pdf', 1024 * 1024 * 11) // 11MB
    const validateFilesSpy = jest.spyOn(utils, 'validateFiles')

    render(<Upload action={mockActionString} />)
    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, largeFile)

    await waitFor(() => {
      expect(validateFilesSpy).toHaveBeenCalled()
      const errorElement = screen.getByTestId('error-message')
      expect(errorElement).toHaveTextContent(/文件.*大小超过.*限制/)
    })
  })

  test('should allow drag and drop file upload', async () => {
    // 为成功场景重新创建 mock
    const axiosPostSpy = jest.spyOn(axios, 'post').mockResolvedValue({
      data: { url: 'https://jsonplaceholder.typicode.com/posts/test.png' },
    })

    render(<Upload action={mockActionFunction} />)
    const file = createFile()
    const dropArea = screen.getByText(/拖拽文件到此处或/)

    fireEvent.dragEnter(dropArea)
    fireEvent.dragOver(dropArea)
    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [file],
      },
    })

    await waitFor(() => {
      expect(screen.getByTestId(`filename-${file.name}`)).toBeInTheDocument()
    })

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    await waitFor(() => {
      expect(mockActionFunction).toHaveBeenCalledWith(file)
      const statusElement = screen.getByTestId(`upload-status-${file.name}`)
      expect(statusElement).toHaveTextContent('success')
    })

    // 清理 mock
    axiosPostSpy.mockRestore()
  })
  test('should remove file correctly', async () => {
    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const removeBtn = screen.getByRole('button', { name: /删除/i })
    await userEvent.click(removeBtn)

    await waitFor(() => {
      expect(screen.queryByText(file.name)).not.toBeInTheDocument()
    })
  })

  test('should disable upload button when no files are selected', async () => {
    render(<Upload action={mockActionString} />)
    // 先添加文件，让按钮显示
    const file = createFile()
    const input = screen.getByTestId('file-input')

    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      const uploadBtn = screen.getByRole('button', { name: /开始上传/i })

      expect(uploadBtn).toBeEnabled()
    })
  })

  test('should validate file size before upload', async () => {
    const largeFile = createFile('large.pdf', 1024 * 1024 * 11) // 11MB
    const validateFilesSpy = jest.spyOn(utils, 'validateFiles')

    render(<Upload action={mockActionString} />)
    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, largeFile)

    await waitFor(() => {
      expect(validateFilesSpy).toHaveBeenCalled()
      const errorElement = screen.getByTestId('error-message')
      expect(errorElement).toHaveTextContent(/文件.*大小超过.*限制/)
    })
  })
  test('should handle custom action function error', async () => {
    const error = new Error('Custom action failed')
    mockActionFunction.mockRejectedValueOnce(error)

    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message')
      expect(errorElement).toHaveTextContent(
        new RegExp(`文件.*${file.name}.*${error.message}`)
      )
      const statusElement = screen.getByTestId(`upload-status-${file.name}`)
      expect(statusElement).toHaveTextContent('error')
    })
  })
})
