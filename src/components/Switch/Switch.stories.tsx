import type { Meta, StoryObj } from '@storybook/react-vite'
import Switch from './index'
import React from 'react'

const meta: Meta<typeof Switch> = {
  title: 'Forge Design/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Switch 开关组件

对标 Ant Design Switch，支持开关切换、加载状态、自定义图标等功能。

## 主要功能
- 开关切换（Switch）
- 受控 / 非受控
- 加载状态
- 自定义开启/关闭文本
- 禁用状态
- 尺寸控制
`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

// 基础用法
export const Basic: Story = {
  render: () => <Switch defaultChecked />,
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    return (
      <>
        <Switch checked={checked} onChange={(v) => setChecked(v)} />
        <span style={{ marginLeft: 8 }}>{checked ? '开' : '关'}</span>
      </>
    )
  },
}

// 禁用
export const Disabled: Story = {
  render: () => (
    <Switch defaultChecked disabled />
  ),
}

// 尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch size="large" defaultChecked />
      <Switch defaultChecked />
      <Switch size="small" defaultChecked />
    </div>
  ),
}

// 加载状态
export const Loading: Story = {
  render: () => <Switch loading />
}

// 自定义文本
export const WithText: Story = {
  render: () => (
    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
  ),
}

// 带颜色
export const WithColor: Story = {
  render: () => <Switch defaultChecked checkedColor="#52c41a" />
}

// 自定义图标
export const WithIcon: Story = {
  render: () => (
    <Switch
      defaultChecked
      checkedIcon="✓"
      unCheckedIcon="✗"
    />
  ),
}

// 阻止切换
export const BeforeChange: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        checked={checked}
        beforeChange={() => window.confirm('确定要切换吗？')}
        onChange={(v) => setChecked(v)}
      />
    )
  },
}

// 完整示例
export const CompleteExample: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>通知设置</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>邮件通知</span>
        <Switch defaultChecked />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>短信通知</span>
        <Switch />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>推送通知</span>
        <Switch defaultChecked />
      </div>

      <h3>系统设置</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>深色模式</span>
        <Switch checkedChildren="开" unCheckedChildren="关" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>自动保存</span>
        <Switch defaultChecked disabled />
      </div>
    </div>
  ),
}
