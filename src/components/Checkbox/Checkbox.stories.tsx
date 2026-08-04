import type { Meta, StoryObj } from '@storybook/react-vite'
import Checkbox from './index'
import React from 'react'

const meta: Meta<typeof Checkbox> = {
  title: 'Forge Design/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Checkbox 多选框组件

对标 Ant Design Checkbox，支持多选、按钮样式等功能。

## 主要功能
- 复选框（Checkbox）
- 复选框组（Checkbox.Group）
- 垂直/水平布局
- 按钮样式
- 半选状态
- 禁用状态
- 自定义选项
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// 基础用法
export const Basic: Story = {
  render: () => (
    <Checkbox.Group defaultValue={['a', 'c']}>
      <Checkbox value="a">选项A</Checkbox>
      <Checkbox value="b">选项B</Checkbox>
      <Checkbox value="c">选项C</Checkbox>
    </Checkbox.Group>
  ),
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['a'])
    return (
      <Checkbox.Group value={value} onChange={(v: (string | number)[]) => setValue(v.map(String))}>
        <Checkbox value="a">选项A</Checkbox>
        <Checkbox value="b">选项B</Checkbox>
        <Checkbox value="c">选项C</Checkbox>
      </Checkbox.Group>
    )
  },
}

// 禁用
export const Disabled: Story = {
  render: () => (
    <Checkbox.Group defaultValue={['a']} disabled>
      <Checkbox value="a">选项A</Checkbox>
      <Checkbox value="b">选项B</Checkbox>
      <Checkbox value="c">选项C</Checkbox>
    </Checkbox.Group>
  ),
}

// 尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox.Group size="large" defaultValue={['a']}>
        <Checkbox value="a">大尺寸</Checkbox>
        <Checkbox value="b">选项B</Checkbox>
      </Checkbox.Group>
      <Checkbox.Group defaultValue={['a']}>
        <Checkbox value="a">中尺寸</Checkbox>
        <Checkbox value="b">选项B</Checkbox>
      </Checkbox.Group>
      <Checkbox.Group size="small" defaultValue={['a']}>
        <Checkbox value="a">小尺寸</Checkbox>
        <Checkbox value="b">选项B</Checkbox>
      </Checkbox.Group>
    </div>
  ),
}

// 垂直布局
export const Vertical: Story = {
  render: () => (
    <Checkbox.Group direction="vertical" defaultValue={['a']}>
      <Checkbox value="a">选项A</Checkbox>
      <Checkbox value="b">选项B</Checkbox>
      <Checkbox value="c">选项C</Checkbox>
    </Checkbox.Group>
  ),
}

// 按钮样式
export const ButtonStyle: Story = {
  render: () => (
    <Checkbox.Group optionType="button" defaultValue={['a']}>
      <Checkbox value="a">选项A</Checkbox>
      <Checkbox value="b">选项B</Checkbox>
      <Checkbox value="c">选项C</Checkbox>
    </Checkbox.Group>
  ),
}

// 半选状态
export const Indeterminate: Story = {
  render: () => (
    <Checkbox indeterminate>半选状态</Checkbox>
  ),
}

// 带禁用选项
export const WithDisabled: Story = {
  render: () => (
    <Checkbox.Group defaultValue={['a']}>
      <Checkbox value="a">选项A</Checkbox>
      <Checkbox value="b" disabled>选项B（禁用）</Checkbox>
      <Checkbox value="c">选项C</Checkbox>
    </Checkbox.Group>
  ),
}

// 使用 options
export const WithOptions: Story = {
  render: () => (
    <Checkbox.Group
      options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
        { value: 'c', label: '选项C' },
        { value: 'd', label: '选项D', disabled: true },
      ]}
      defaultValue={['a', 'c']}
    />
  ),
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>兴趣爱好</h3>
      <Checkbox.Group defaultValue={['reading']}>
        <Checkbox value="reading">阅读</Checkbox>
        <Checkbox value="coding">编程</Checkbox>
        <Checkbox value="sports">运动</Checkbox>
        <Checkbox value="music">音乐</Checkbox>
      </Checkbox.Group>
      
      <h3>偏好设置</h3>
      <Checkbox.Group optionType="button" defaultValue={['dark']}>
        <Checkbox value="light">浅色模式</Checkbox>
        <Checkbox value="dark">深色模式</Checkbox>
      </Checkbox.Group>
      
      <h3>通知选项</h3>
      <Checkbox.Group direction="vertical">
        <Checkbox value="email">邮件通知</Checkbox>
        <Checkbox value="sms">短信通知</Checkbox>
        <Checkbox value="push">推送通知</Checkbox>
      </Checkbox.Group>
    </div>
  ),
}
