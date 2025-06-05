import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'
import { Upload } from './index'

const meta: Meta<typeof Upload> = {
  title: 'Forge Design/Upload',
  component: Upload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# 文件上传组件

一个功能完整的文件上传组件，支持多种上传方式和丰富的交互特性。

## ✨ 主要功能

### 📁 多种上传方式
- **拖拽上传**: 将文件拖拽到上传区域
- **点击选择**: 点击上传区域选择文件
- **多文件选择**: 同时选择多个文件

### 📊 上传管理
- **实时进度**: 显示每个文件的上传进度
- **并发控制**: 最多同时上传 3 个文件
- **状态管理**: 显示上传状态（等待、上传中、成功、失败、已取消）
- **灵活取消**: 可取消单个或全部文件上传

### 🔍 文件处理
- **格式验证**: 自动验证文件类型和大小
- **图片预览**: 支持图片文件预览功能
- **错误提示**: 详细的错误信息提示

### ⚙️ 配置选项
- **自定义上传**: 支持 URL 字符串或函数形式的上传处理
- **进度回调**: 提供上传进度回调函数
- **取消令牌**: 支持 Axios 取消令牌

## 📋 文件限制

**支持格式:**
- 图片: JPEG, PNG, GIF, WebP
- 文档: PDF, Word (.doc, .docx)

**大小限制:** 单个文件最大 10MB

## 🎯 使用场景

### 基础用法
\`\`\`tsx
<Upload action="https://api.example.com/upload" />
\`\`\`

### 自定义处理
\`\`\`tsx
<Upload 
  action={async (file) => {
    // 自定义上传逻辑
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const result = await response.json()
    return result.url
  }}
  onProgress={(fileName, progress) => {
    console.log(\`\${fileName}: \${progress}%\`)
  }}
/>
\`\`\`

### 完整功能演示
下面的示例展示了组件的所有功能特性，包括文件验证、进度显示、预览功能和错误处理。
        `,
      },
    },
  },
  argTypes: {
    action: {
      control: 'text',
      description: '上传文件的目标地址或处理函数',
      table: {
        type: { summary: 'string | ((file: File) => Promise<string>)' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onProgress: {
      action: 'progress-updated',
      description: '上传进度回调函数',
      table: {
        type: { summary: '(fileName: string, progress: number) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    cancelToken: {
      control: false,
      description: 'Axios 取消令牌，用于取消上传请求',
      table: {
        type: { summary: 'CancelTokenSource' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Upload>

// 完整功能演示
export const CompleteDemo: Story = {
  args: {
    action: async (file: File) => {
      // 模拟真实的上传过程
      const uploadTime = Math.random() * 4000 + 1000 // 1-5秒随机上传时间

      // 模拟可能的上传失败（20% 概率）
      if (Math.random() < 0.2) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        throw new Error('网络错误，上传失败')
      }

      // 模拟成功上传
      await new Promise(resolve => setTimeout(resolve, uploadTime))
      return `https://cdn.example.com/uploads/${Date.now()}-${file.name}`
    },
    onProgress: action('upload-progress'),
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🚀 完整功能演示

这个示例展示了 Upload 组件的所有功能特性：

#### 📤 上传功能测试
1. **拖拽上传**: 将文件拖拽到虚线框内
2. **点击上传**: 点击"点击上传"按钮选择文件
3. **多文件**: 可同时选择多个文件

#### 🔍 文件验证测试
- 尝试上传超过 10MB 的文件（会显示错误）
- 尝试上传不支持的文件格式（会显示错误）
- 上传支持的文件格式（图片、PDF、Word）

#### 📊 进度和状态
- 观察实时上传进度条
- 查看不同的状态显示（等待、上传中、成功、失败）
- 使用"取消所有上传"功能

#### 👁️ 预览功能
- 上传图片文件后点击"预览"按钮
- 在模态框中查看图片
- 点击外部区域关闭预览

#### ❌ 错误处理
- 组件会随机模拟 20% 的上传失败
- 观察错误信息的显示和处理
- 失败的文件可以重新上传

#### 📋 并发控制
- 选择 5+ 个文件测试并发限制
- 观察最多同时上传 3 个文件的限制

**提示**: 打开浏览器开发者工具的 Console 面板，可以看到详细的上传进度日志。
        `,
      },
    },
  },
}
