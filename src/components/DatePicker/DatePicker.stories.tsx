import type { Meta, StoryObj } from '@storybook/react-vite'
import DatePicker from './index'
import React from 'react'

const meta: Meta<typeof DatePicker> = {
  title: 'Forge Design/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DatePicker 日期选择器组件

对标 Ant Design DatePicker，支持日期选择、时间选择、禁用日期等功能。

## 主要功能
- 日期选择
- 日期格式化
- 时间选择（showTime）
- 禁用日期
- 清除按钮
- 加载状态
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

// 基础用法
export const Basic: Story = {
  render: () => <DatePicker placeholder="请选择日期" />,
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null)
    return (
      <>
        <DatePicker value={value} onChange={(v) => setValue(v)} />
        <span style={{ marginLeft: 8 }}>{value?.toLocaleDateString()}</span>
      </>
    )
  },
}

// 禁用
export const Disabled: Story = {
  render: () => <DatePicker disabled />,
}

// 尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DatePicker size="large" placeholder="大尺寸" />
      <DatePicker placeholder="默认尺寸" />
      <DatePicker size="small" placeholder="小尺寸" />
    </div>
  ),
}

// 自定义格式
export const CustomFormat: Story = {
  render: () => <DatePicker format="YYYY年MM月DD日" />,
}

// 允许清空
export const AllowClear: Story = {
  render: () => <DatePicker allowClear />,
}

// 禁用日期
export const DisabledDate: Story = {
  render: () => (
    <DatePicker
      disabledDate={(current) => current > new Date()}
      placeholder="只能选今天及之前的日期"
    />
  ),
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>日期选择</h3>
      <DatePicker placeholder="开始日期" />
      <DatePicker placeholder="结束日期" />
      
      <h3>带格式的日期</h3>
      <DatePicker format="YYYY/MM/DD" placeholder="YYYY/MM/DD" />
      
      <h3>禁用未来的日期</h3>
      <DatePicker
        disabledDate={(current) => current > new Date()}
        placeholder="只能选今天及之前的日期"
      />
    </div>
  ),
}
