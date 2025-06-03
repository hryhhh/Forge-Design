import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Upload } from './Upload'
import userEvent from '@testing-library/user-event'
import * as utils from './utils'
import '@testing-library/jest-dom'
import axios from 'axios'

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

// Mock axios 取消令牌
const mockCancelToken = axios.CancelToken.source()

describe('Upload Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // 解决 URL.createObjectURL 报错问题
    window.URL.createObjectURL = jest.fn(() => 'blob:mock-preview-url')
    window.URL.revokeObjectURL = jest.fn()
    // Mock axios
    jest.spyOn(axios, 'post').mockResolvedValue({
      data: { url: 'https://jsonplaceholder.typicode.com/posts/test.png' },
    })
    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(() =>
        Promise.reject(new axios.Cancel('Upload cancelled'))
      )
  })

  test('should render upload area and input', () => {
    render(<Upload action={mockActionString} />)
    expect(screen.getByText(/拖拽文件到此处或/)).toBeInTheDocument()
    expect(screen.getByLabelText(/点击上传/i)).toBeInTheDocument()
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
  test('should handle upload cancellation', async () => {
    render(<Upload action={mockActionFunction} cancelToken={mockCancelToken} />)
    const file = createFile()

    const input = screen.getByTestId('file-input') as HTMLInputElement
    await userEvent.upload(input, file)

    const uploadBtn = screen.getByRole('button', { name: /开始上传/ })
    await userEvent.click(uploadBtn)

    await waitFor(() => {
      const statusElement = screen.getByTestId(`upload-status-${file.name}`)
      expect(statusElement.textContent).toBe('uploading')
      const cancelBtn = screen.getByRole('button', { name: /取消上传/ })
      expect(cancelBtn).toBeInTheDocument()
      return { cancelBtn, statusElement }
    }).then(async ({ cancelBtn, statusElement }) => {
      await userEvent.click(cancelBtn)
      await waitFor(() => {
        expect(statusElement).toHaveTextContent('cancelled')
      })
    })
  })
  test('should allow drag and drop file upload', async () => {
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
    const uploadBtn = screen.getByRole('button', { name: /开始上传/i })
    expect(uploadBtn).toBeDisabled()
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
