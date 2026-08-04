import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from './index'
import React from 'react'

const meta: Meta<typeof Input> = {
  title: 'Forge Design/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Input 输入框组件

对标 Ant Design Input，支持受控/非受控、密码框、清除按钮、前缀后缀、输入框组合等功能。

## 主要功能
- 受控/非受控模式
- 密码输入（type="password"）
- 清除按钮（allowClear）
- 前缀/后缀（prefix/suffix）
- 尺寸规格（large/middle/small）
- 输入框组合（Input.Group）
- 多行文本（Input.TextArea）
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

// 基础用法
export const Basic: Story = {
  render: () => (
    <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input placeholder="请输入内容" />
      <Input defaultValue="默认值" />
    </div>
  ),
}

// 受控与非受控
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = React.useState('')
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input value={value} onChange={(val) => setValue(val)} placeholder="受控输入" />
          <Input defaultValue="非受控输入" placeholder="非受控输入" />
        </div>
      )
    }
    return <ControlledExample />
  },
}

// 密码输入
export const Password: Story = {
  render: () => (
    <Input type="password" placeholder="请输入密码" allowClear />
  ),
}

// 清除按钮
export const WithClear: Story = {
  render: () => <Input placeholder="可清除的输入框" allowClear />,
}

// 前缀和后缀
export const WithPrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Input prefix="🔍" placeholder="搜索" />
      <Input suffix="📧" placeholder="邮箱" />
      <Input prefix="¥" suffix=".00" placeholder="金额" />
    </div>
  ),
}

// 尺寸规格
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Input size="large" placeholder="Large" />
      <Input placeholder="Middle (默认)" />
      <Input size="small" placeholder="Small" />
    </div>
  ),
}

// 禁用和只读
export const DisabledReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Input placeholder="禁用状态" disabled />
      <Input value="只读状态" readOnly />
    </div>
  ),
}

// 输入框组合
export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}>
      <Input.Group>
        <Input placeholder="前缀" />
        <Input placeholder="后缀" />
      </Input.Group>
      <Input.Group addonBefore="http://">
        <Input placeholder="请输入网址" />
      </Input.Group>
      <Input.Group addonAfter=".com">
        <Input placeholder="请输入域名" />
      </Input.Group>
    </div>
  ),
}

// 文本域
export const TextArea: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}>
      <Input.TextArea rows={3} placeholder="多行输入" />
      <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} placeholder="自动调整高度" />
    </div>
  ),
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>用户注册</h3>
      <Input placeholder="用户名" prefix="👤" />
      <Input type="password" placeholder="密码" allowClear />
      <Input placeholder="邮箱" suffix="📧" />
      <Input.Group addonBefore="http://" addonAfter=".com">
        <Input placeholder="请输入网址" />
      </Input.Group>
      <Input.TextArea rows={3} placeholder="个人简介" autoSize={{ minRows: 2, maxRows: 5 }} />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Input style={{ width: 100 }} placeholder="验证码" />
        <button style={{ padding: '4px 16px', background: '#8fc3fb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          获取验证码
        </button>
      </div>
    </div>
  ),
}
