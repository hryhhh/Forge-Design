import type { Meta, StoryObj } from '@storybook/react-vite'
import Select from './index'
import React from 'react'

const meta: Meta<typeof Select> = {
  title: 'Forge Design/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Select 选择器组件

对标 Ant Design Select，支持单选、多选、标签模式、搜索过滤等功能。

## 主要功能
- 单选 / 多选 / 标签模式
- 搜索过滤
- 选项分组
- 清除按钮
- 加载状态
- 自定义选项渲染
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const options = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' },
  { value: 'grape', label: '葡萄' },
  { value: 'watermelon', label: '西瓜' },
]

// 基础用法
export const Basic: Story = {
  render: () => (
    <Select placeholder="请选择水果" options={options} style={{ width: 200 }} />
  ),
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <Select
        value={value}
        onChange={v => setValue(v as string)}
        placeholder="受控选择"
        options={options}
        style={{ width: 200 }}
      />
    )
  },
}

// 多选
export const Multiple: Story = {
  render: () => (
    <Select
      mode="multiple"
      placeholder="多选水果"
      options={options}
      style={{ width: '100%' }}
    />
  ),
}

// 标签模式
export const Tags: Story = {
  render: () => (
    <Select
      mode="tags"
      placeholder="标签模式"
      options={options}
      style={{ width: '100%' }}
    />
  ),
}

// 搜索过滤
export const WithSearch: Story = {
  render: () => (
    <Select
      showSearch
      placeholder="搜索水果"
      options={options}
      style={{ width: 200 }}
    />
  ),
}

// 选项分组
export const Group: Story = {
  render: () => (
    <Select
      placeholder="请选择"
      options={[
        { value: 'a1', label: '苹果' },
        { value: 'a2', label: '香蕉' },
        { value: 'b1', label: '白菜' },
        { value: 'b2', label: '萝卜' },
      ]}
      style={{ width: 200 }}
    />
  ),
}

// 禁用
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Select
        placeholder="禁用"
        options={options}
        disabled
        style={{ width: 150 }}
      />
      <Select placeholder="正常" options={options} style={{ width: 150 }} />
    </div>
  ),
}

// 尺寸
export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 200 }}
    >
      <Select size="large" placeholder="大尺寸" options={options} />
      <Select placeholder="中尺寸" options={options} />
      <Select size="small" placeholder="小尺寸" options={options} />
    </div>
  ),
}

// 清除
export const WithClear: Story = {
  render: () => (
    <Select
      placeholder="可清除"
      allowClear
      options={options}
      style={{ width: 200 }}
    />
  ),
}

// 加载状态
export const Loading: Story = {
  render: () => <Select loading placeholder="加载中" style={{ width: 200 }} />,
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div
      style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <h3>用户信息</h3>
      <Select
        placeholder="姓名"
        options={[
          { value: 'a', label: '张三' },
          { value: 'b', label: '李四' },
        ]}
        style={{ width: '100%' }}
      />
      <Select
        placeholder="性别"
        options={[
          { value: 'm', label: '男' },
          { value: 'f', label: '女' },
        ]}
        style={{ width: '100%' }}
      />
      <Select
        showSearch
        placeholder="城市"
        options={[
          { value: 'bj', label: '北京' },
          { value: 'sh', label: '上海' },
          { value: 'gz', label: '广州' },
        ]}
        style={{ width: '100%' }}
      />
      <Select
        mode="multiple"
        placeholder="兴趣爱好"
        options={[
          { value: 'read', label: '阅读' },
          { value: 'sport', label: '运动' },
          { value: 'music', label: '音乐' },
        ]}
        style={{ width: '100%' }}
      />
    </div>
  ),
}
