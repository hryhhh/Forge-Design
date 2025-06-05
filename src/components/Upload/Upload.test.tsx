import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { Upload } from './Upload'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import axios from 'axios'

// 设置全局超时时间
jest.setTimeout(30000)

// Mock 文件对象创建函数
const createFile = (
  name: string = 'test.png',
  size: number = 1024,
  type: string = 'image/png'
) => {
  const file = new File([''], name, { type })
  Object.defineProperty(file, 'size', { value: size, configurable: false })
  return file
}

// Mock action function
const mockActionFunction = jest.fn(file =>
  Promise.resolve(`https://api.example.com/files/${file.name}`)
)

describe('Upload Component', () => {
  beforeEach(() => {
    // 清理 DOM 和 mock
    document.body.innerHTML = ''
    jest.clearAllMocks()

    // Mock URL API
    window.URL.createObjectURL = jest.fn(() => 'blob:mock-url')
    window.URL.revokeObjectURL = jest.fn()

    // Mock console 方法
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('应该渲染基本的上传组件', async () => {
    render(<Upload action={mockActionFunction} />)
    await waitFor(() => {
      expect(screen.getByTestId('upload-container')).toBeInTheDocument()
      expect(screen.getByTestId('file-input')).toBeInTheDocument()
      expect(screen.getByTestId('upload-prompt')).toBeInTheDocument()
    })
  })

  test('选择文件后应该显示在列表中', async () => {
    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await act(async () => {
      await userEvent.upload(input, file)
    })

    await waitFor(() => {
      expect(screen.getByTestId(`filename-${file.name}`)).toBeInTheDocument()
      expect(screen.getByText('(0.00 MB)')).toBeInTheDocument()
    })
  })

  test('应该正确处理拖拽上传', async () => {
    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const dropArea = screen.getByTestId('upload-prompt')

    await act(async () => {
      fireEvent.dragEnter(dropArea)
      fireEvent.dragOver(dropArea)
      fireEvent.drop(dropArea, {
        dataTransfer: {
          files: [file],
        },
      })
    })

    await waitFor(() => {
      expect(screen.getByTestId(`filename-${file.name}`)).toBeInTheDocument()
    })
  })

  test('上传成功时应该更新状态', async () => {
    const mockPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { url: 'https://api.example.com/files/test.png' },
    })

    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await act(async () => {
      await userEvent.upload(input, file)
    })

    const uploadButton = screen.getByRole('button', { name: /开始上传/ })
    await act(async () => {
      await userEvent.click(uploadButton)
    })

    await waitFor(() => {
      expect(mockActionFunction).toHaveBeenCalledWith(file)
      const status = screen.getByTestId(`upload-status-${file.name}`)
      expect(status).toHaveTextContent(/success|uploaded/)
    })

    mockPost.mockRestore()
  })

  test('上传失败时应该显示错误信息', async () => {
    const errorMessage = 'Upload failed'
    mockActionFunction.mockRejectedValueOnce(new Error(errorMessage))

    render(<Upload action={mockActionFunction} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await act(async () => {
      await userEvent.upload(input, file)
    })

    const uploadButton = screen.getByRole('button', { name: /开始上传/ })
    await act(async () => {
      await userEvent.click(uploadButton)
    })

    await waitFor(() => {
      const status = screen.getByTestId(`upload-status-${file.name}`)
      expect(status).toHaveTextContent('error')
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        errorMessage
      )
    })
  })

  test('应该能够取消上传', async () => {
    const file = createFile()
    mockActionFunction.mockImplementation(() => new Promise(() => {})) // 永不resolve的Promise

    render(<Upload action={mockActionFunction} />)

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await act(async () => {
      await userEvent.upload(input, file)
    })

    const uploadButton = screen.getByRole('button', { name: /开始上传/ })
    await act(async () => {
      await userEvent.click(uploadButton)
    })

    await waitFor(() => {
      const cancelButton = screen.getByTestId(`cancel-button-${file.name}`)
      expect(cancelButton).toBeInTheDocument()
    })

    const cancelButton = screen.getByTestId(`cancel-button-${file.name}`)
    await act(async () => {
      await userEvent.click(cancelButton)
    })

    await waitFor(() => {
      const status = screen.getByTestId(`upload-status-${file.name}`)
      expect(status).toHaveTextContent('cancelled')
    })
  })

  test('应该限制文件大小', async () => {
    const largeFile = createFile('large.png', 11 * 1024 * 1024) // 11MB
    render(<Upload action={mockActionFunction} />)

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await act(async () => {
      await userEvent.upload(input, largeFile)
    })

    await waitFor(
      () => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(
          /大小超过/
        )
      },
      { timeout: 3000 }
    )
  })

  // test('应该限制文件类型', async () => {
  //     const invalidFile = createFile('test.exe', 1024, 'application/x-msdownload');
  //     render(<Upload action={mockActionFunction} />);

  //     const input = screen.getByTestId('file-input') as HTMLInputElement;
  //     await act(async () => {
  //         await userEvent.upload(input, invalidFile);
  //     });

  //     // 等待错误列表出现
  //     await waitFor(() => {
  //         const errorMessages = screen.getAllByTestId('error-message');
  //         expect(errorMessages[0]).toHaveTextContent(/类型不支持/);
  //     }, { timeout: 5000 });
  // });

  test('应该支持多文件上传', async () => {
    render(<Upload action={mockActionFunction} />)
    const files = [createFile('test1.png'), createFile('test2.png')]

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await act(async () => {
      await userEvent.upload(input, files)
    })

    for (const file of files) {
      await waitFor(() => {
        expect(screen.getByTestId(`filename-${file.name}`)).toBeInTheDocument()
      })
    }
  })
})
