import type { Meta, StoryObj } from '@storybook/react'
import { Upload } from './index'
// import { UploadProps } from './type'

const meta: Meta<typeof Upload> = {
  title: 'Forge Design/Upload',
  component: Upload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '文件上传组件，支持拖拽上传、多文件选择、上传进度显示等功能',
      },
    },
  },
  argTypes: {
    action: {
      control: 'text',
      description: '上传文件的目标地址',
      table: {
        type: { summary: 'string | ((file: File) => Promise<string>)' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Upload>

export const Default: Story = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
  },
  parameters: {
    docs: {
      description: {
        story: '基础的文件上传功能，支持点击选择或拖拽上传文件',
      },
    },
  },
}
