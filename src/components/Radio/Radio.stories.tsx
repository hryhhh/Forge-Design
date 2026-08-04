import type { Meta, StoryObj } from '@storybook/react-vite'
import Radio from './index'
import React from 'react'

const meta: Meta<typeof Radio> = {
  title: 'Forge Design/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Radio 单选框组件

对标 Ant Design Radio，支持单选、多选、按钮样式等功能。

## 主要功能
- 单选框（Radio）
- 单选框组（Radio.Group）
- 垂直/水平布局
- 按钮样式
- 禁用状态
- 自定义选项
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

// 基础用法
export const Basic: Story = {
  render: () => (
    <Radio.Group defaultValue="a">
      <Radio value="a">选项A</Radio>
      <Radio value="b">选项B</Radio>
      <Radio value="c">选项C</Radio>
    </Radio.Group>
  ),
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('a')
    return (
      <Radio.Group value={value} onChange={(v) => setValue(v as string)}>
        <Radio value="a">选项A</Radio>
        <Radio value="b">选项B</Radio>
        <Radio value="c">选项C</Radio>
      </Radio.Group>
    )
  },
}

// 禁用
export const Disabled: Story = {
  render: () => (
    <Radio.Group defaultValue="a" disabled>
      <Radio value="a">选项A</Radio>
      <Radio value="b">选项B</Radio>
      <Radio value="c">选项C</Radio>
    </Radio.Group>
  ),
}

// 尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio.Group size="large" defaultValue="a">
        <Radio value="a">大尺寸</Radio>
        <Radio value="b">选项B</Radio>
      </Radio.Group>
      <Radio.Group defaultValue="a">
        <Radio value="a">中尺寸</Radio>
        <Radio value="b">选项B</Radio>
      </Radio.Group>
      <Radio.Group size="small" defaultValue="a">
        <Radio value="a">小尺寸</Radio>
        <Radio value="b">选项B</Radio>
      </Radio.Group>
    </div>
  ),
}

// 垂直布局
export const Vertical: Story = {
  render: () => (
    <Radio.Group direction="vertical" defaultValue="a">
      <Radio value="a">选项A</Radio>
      <Radio value="b">选项B</Radio>
      <Radio value="c">选项C</Radio>
    </Radio.Group>
  ),
}

// 按钮样式
export const ButtonStyle: Story = {
  render: () => (
    <Radio.Group optionType="button" defaultValue="a">
      <Radio value="a">选项A</Radio>
      <Radio value="b">选项B</Radio>
      <Radio value="c">选项C</Radio>
    </Radio.Group>
  ),
}

// 带禁用选项
export const WithDisabled: Story = {
  render: () => (
    <Radio.Group defaultValue="a">
      <Radio value="a">选项A</Radio>
      <Radio value="b" disabled>选项B（禁用）</Radio>
      <Radio value="c">选项C</Radio>
    </Radio.Group>
  ),
}

// 使用 options
export const WithOptions: Story = {
  render: () => (
    <Radio.Group
      options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
        { value: 'c', label: '选项C' },
        { value: 'd', label: '选项D', disabled: true },
      ]}
      defaultValue="a"
    />
  ),
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>用户信息</h3>
      <div>
        <span style={{ marginRight: 8 }}>性别：</span>
        <Radio.Group defaultValue="male">
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </div>
      <div>
        <span style={{ marginRight: 8 }}>职业：</span>
        <Radio.Group optionType="button" defaultValue="developer">
          <Radio value="developer">开发者</Radio>
          <Radio value="designer">设计师</Radio>
          <Radio value="pm">产品经理</Radio>
        </Radio.Group>
      </div>
      <div>
        <span style={{ marginRight: 8 }}>兴趣：</span>
        <Radio.Group defaultValue="coding">
          <Radio value="coding">编程</Radio>
          <Radio value="reading">阅读</Radio>
          <Radio value="sport">运动</Radio>
        </Radio.Group>
      </div>
    </div>
  ),
}
