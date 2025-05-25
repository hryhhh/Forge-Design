import type { Meta, StoryObj } from '@storybook/react'
import './welcome.styles.scss'

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj

export const Welcome: Story = {
  render: () => (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Forge Design System</h1>
        <p className="welcome-subtitle">一套现代化的 React UI 组件库</p>
      </div>

      <div className="welcome-content">
        <h2>🚀 快速开始</h2>
        <pre className="welcome-code-block">
          npm install forge-design --save
        </pre>

        <h2>✨ 特性</h2>
        <ul className="welcome-features">
          <li>📦 丰富的组件 - 提供按钮、菜单、表单等多种常用组件</li>
          <li>🎨 可定制主题 - 灵活的样式系统，支持自定义主题</li>
          <li>📱 响应式设计 - 适配各种屏幕尺寸</li>
          <li>♿ 无障碍访问 - 符合 WCAG 2.1 标准</li>
          <li>🔧 TypeScript 支持 - 提供完整的类型定义</li>
        </ul>

        <h2>📖 使用示例</h2>
        <pre className="welcome-code-block">
          {`import { Button, Menu } from 'forge-design';

function App() {
  return (
    <div>
      <Button btnType={ButtonType.Primary}>点击我</Button>
      <Menu defaultIndex="0">
        <Menu.Item>首页</Menu.Item>
        <Menu.Item>关于我们</Menu.Item>
      </Menu>
    </div>
  );
}`}
        </pre>

        <h2>🧩 组件列表</h2>
        <p>在左侧导航栏中浏览所有可用组件。每个组件都有详细的文档和示例。</p>

        <div className="welcome-footer">
          <p>版本: v1.0.0</p>
          <p>MIT License © 2023</p>
        </div>
      </div>
    </div>
  ),
}
