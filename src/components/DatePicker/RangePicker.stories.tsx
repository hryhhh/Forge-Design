import type { Meta, StoryObj } from '@storybook/react-vite'
import RangePicker from './RangePicker'
import React from 'react'
import type { RangePickerPlaceholder } from './types'

const meta: Meta<typeof RangePicker> = {
  title: 'Forge Design/DatePicker/RangePicker',
  component: RangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# RangePicker 日期范围选择器组件

对标 Ant Design RangePicker，支持选择日期范围（开始日期 - 结束日期）。

## 主要功能
- 左面板选开始日期，右面板选结束日期
- 悬停预览范围（选中开始日期后，鼠标悬停右面板日期显示预览）
- 范围跨面板高亮
- 右侧面板月份联动（右面板不能早于左面板）
- 禁用日期
- 自定义格式
- 允许清空
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RangePicker>

const ph1: RangePickerPlaceholder = ['开始日期', '结束日期']
const ph2: RangePickerPlaceholder = ['禁用状态', '']
const ph3: RangePickerPlaceholder = ['大尺寸', '']
const ph4: RangePickerPlaceholder = ['默认尺寸', '']
const ph5: RangePickerPlaceholder = ['小尺寸', '']
const ph6: RangePickerPlaceholder = ['开始', '结束']
const ph7: RangePickerPlaceholder = ['禁用周末', '']
const ph8: RangePickerPlaceholder = ['出发日期', '返回日期']
const ph9: RangePickerPlaceholder = ['开始时间', '结束时间']

// 基础用法
export const Basic: Story = {
  render: () => <RangePicker placeholder={ph1} />,
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<[Date, Date] | null>(null)
    return (
      <>
        <RangePicker
          value={value as any}
          onChange={(v: any) => setValue(v)}
        />
        <span style={{ marginLeft: 8 }}>
          {value ? `${value[0].toLocaleDateString()} - ${value[1].toLocaleDateString()}` : '未选择'}
        </span>
      </>
    )
  },
}

// 禁用
export const Disabled: Story = {
  render: () => <RangePicker disabled placeholder={ph2} />,
}

// 尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RangePicker size="large" placeholder={ph3} />
      <RangePicker placeholder={ph4} />
      <RangePicker size="small" placeholder={ph5} />
    </div>
  ),
}

// 自定义格式
export const CustomFormat: Story = {
  render: () => <RangePicker format="YYYY年MM月DD日" placeholder={ph6} />,
}

// 允许清空
export const AllowClear: Story = {
  render: () => <RangePicker allowClear placeholder={ph1} />,
}

// 禁用日期
export const DisabledDate: Story = {
  render: () => (
    <RangePicker
      disabledDate={(current) => current.getDay() === 0 || current.getDay() === 6}
      placeholder={ph7}
    />
  ),
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>行程设置</h3>
      <RangePicker placeholder={ph8} />
      
      <h3>限时活动</h3>
      <RangePicker
        disabledDate={(current) => current > new Date()}
        placeholder={ph9}
      />
      
      <h3>自定义格式</h3>
      <RangePicker format="YYYY/MM/DD" placeholder={ph6} />
    </div>
  ),
}

// 悬停预览范围
export const HoverPreview: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <RangePicker placeholder={ph1} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '选中开始日期后，鼠标悬停右面板日期，会显示预览范围（灰色色块）。',
      },
    },
  },
}

// 面板联动
export const PanelSync: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <RangePicker placeholder={ph1} />
      <span style={{ fontSize: 12, color: '#9ca3af' }}>
        提示：选择开始日期后，右面板会自动跳转到下一个月；右面板不能早于左面板
      </span>
    </div>
  ),
}
