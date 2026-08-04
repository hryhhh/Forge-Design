import type { Meta, StoryObj } from '@storybook/react-vite'
import TimePicker from './index'
import React from 'react'

const meta: Meta<typeof TimePicker> = {
  title: 'Forge Design/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# TimePicker 时间选择器组件

对标 Ant Design TimePicker，支持时分秒选择、禁用时段、自定义格式等功能。

## 主要功能
- 时间选择（时/分/秒）
- 受控 / 非受控
- 禁用时段（小时/分钟/秒）
- 隐藏禁用选项
- 自定义格式
- 允许清空
- 前缀/后缀
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TimePicker>

// 基础用法
export const Basic: Story = {
  render: () => <TimePicker placeholder="请选择时间" />,
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null)
    return (
      <>
        <TimePicker value={value} onChange={v => setValue(v)} />
        <span style={{ marginLeft: 8 }}>
          {value
            ? value.toLocaleTimeString('zh-CN', { hour12: false })
            : '未选择'}
        </span>
      </>
    )
  },
}

// 禁用
export const Disabled: Story = {
  render: () => <TimePicker disabled placeholder="禁用状态" />,
}

// 尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <TimePicker size="large" placeholder="大尺寸" />
      <TimePicker placeholder="默认尺寸" />
      <TimePicker size="small" placeholder="小尺寸" />
    </div>
  ),
}

// 不显示秒
export const WithoutSeconds: Story = {
  render: () => <TimePicker showSecond={false} placeholder="仅时分" />,
}

// 允许清空
export const AllowClear: Story = {
  render: () => <TimePicker allowClear placeholder="可清空" />,
}

// 前缀和后缀
export const WithPrefixSuffix: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}
    >
      <TimePicker prefix="🕐" placeholder="前缀示例" />
      <TimePicker suffix="北京时间" placeholder="后缀示例" />
    </div>
  ),
}

// 禁用时段
export const DisabledHours: Story = {
  render: () => (
    <TimePicker
      disabledHours={() => [0, 1, 2, 3, 4, 5]}
      placeholder="禁用凌晨0-5点"
    />
  ),
}

// 隐藏禁用选项
export const HideDisabledOptions: Story = {
  render: () => (
    <TimePicker
      disabledHours={() => [12, 13, 14]}
      hideDisabledOptions
      placeholder="隐藏已禁用的时段"
    />
  ),
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div
      style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <h3>会议安排</h3>
      <TimePicker placeholder="开始时间" />
      <TimePicker placeholder="结束时间" />

      <h3>工作时段</h3>
      <TimePicker
        disabledHours={() => [0, 1, 2, 3, 4, 5, 21, 22, 23]}
        placeholder="工作日时段（9:00-20:00）"
      />

      <h3>显示选项</h3>
      <TimePicker showSecond={false} placeholder="仅选择时分" />
    </div>
  ),
}
