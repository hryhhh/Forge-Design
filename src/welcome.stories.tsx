import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Button from './components/Button/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import Input from './components/Input/index'
import Select from './components/Select/index'
import Radio from './components/Radio/index'
import Checkbox from './components/Checkbox/index'
import Switch from './components/Switch/index'
import DatePicker from './components/DatePicker/index'
import TimePicker from './components/TimePicker/index'
import { Upload } from './components/Upload/index'
import Form from './components/Form/Form'
import FormItem from './components/Form/FormItem'
import './welcome.styles.scss'

// Type assertion for Radio.Group
const RadioGroup = (Radio as any).Group

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj

export const Welcome: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div className="welcome-container">
        {/* Header */}
        <header className="welcome-header">
          <div className="header-badge">
            <span className="brand">Forge Design</span>
            <span className="version-badge">v1.0.14</span>
          </div>
          <h1 className="header-title">React 组件库</h1>
          <p className="header-desc">
            基于 React 19 + TypeScript 5.7 的企业级 UI 组件库，提供常用业务组件
          </p>
          <div className="header-actions">
            <Button type="primary" size="large">
              开始使用
            </Button>
            <Button type="secondary" size="large" className="ml-8">
              查看文档
            </Button>
          </div>
          <div className="header-tech">
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">TypeScript 5.7</span>
            <span className="tech-tag">SCSS</span>
            <span className="tech-tag">MIT</span>
          </div>
        </header>

        {/* Section: Components */}
        <section className="welcome-section">
          <h2 className="section-title">组件列表</h2>

          {/* Layout Components */}
          <div className="component-group">
            <h3 className="group-title">布局组件</h3>
            <div className="component-grid">
              <div className="component-card">
                <div className="component-preview">
                  <Menu mode="horizontal" defaultIndex="0">
                    <MenuItem index="0">首页</MenuItem>
                    <MenuItem index="1">产品</MenuItem>
                    <MenuItem index="2">关于</MenuItem>
                  </Menu>
                </div>
                <div className="component-info">
                  <h4>Menu</h4>
                  <p>导航菜单，支持水平/垂直布局</p>
                  <code>mode, onSelect, SubMenu</code>
                </div>
              </div>
            </div>
          </div>

          {/* Form Components */}
          <div className="component-group">
            <h3 className="group-title">表单组件</h3>
            <div className="component-grid">
              <div className="component-card">
                <div className="component-preview">
                  <Input placeholder="请输入内容" style={{ width: 200 }} />
                </div>
                <div className="component-info">
                  <h4>Input</h4>
                  <p>输入框，支持密码、清除、组合</p>
                  <code>allowClear, prefix, suffix</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <Select
                    placeholder="请选择"
                    options={[{ value: 'a', label: '选项A' }]}
                    style={{ width: 150 }}
                  />
                </div>
                <div className="component-info">
                  <h4>Select</h4>
                  <p>选择器，支持单选/多选/搜索</p>
                  <code>mode, showSearch, multiple</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <RadioGroup defaultValue="a">
                    <Radio value="a">选项A</Radio>
                    <Radio value="b">选项B</Radio>
                  </RadioGroup>
                </div>
                <div className="component-info">
                  <h4>Radio</h4>
                  <p>单选框，支持按钮样式</p>
                  <code>optionType, direction</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <Checkbox.Group defaultValue={['a']}>
                    <Checkbox value="a">选项A</Checkbox>
                    <Checkbox value="b">选项B</Checkbox>
                  </Checkbox.Group>
                </div>
                <div className="component-info">
                  <h4>Checkbox</h4>
                  <p>多选框，支持按钮样式</p>
                  <code>optionType, direction</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <Switch checked={checked} onChange={setChecked} />
                </div>
                <div className="component-info">
                  <h4>Switch</h4>
                  <p>开关，支持加载状态</p>
                  <code>loading, disabled</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <DatePicker placeholder="请选择日期" style={{ width: 160 }} />
                </div>
                <div className="component-info">
                  <h4>DatePicker</h4>
                  <p>日期选择，支持格式化</p>
                  <code>showTime, disabledDate</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <TimePicker placeholder="请选择时间" style={{ width: 140 }} />
                </div>
                <div className="component-info">
                  <h4>TimePicker</h4>
                  <p>时间选择，支持禁用时段</p>
                  <code>disabledTime, format</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <Form
                    initialValues={{ name: '', email: '' }}
                    onFinish={() => {}}
                    className="demo-form"
                  >
                    <FormItem name="name" label="名称" required>
                      <Input placeholder="请输入名称" />
                    </FormItem>
                    <FormItem name="email" label="邮箱">
                      <Input placeholder="请输入邮箱" />
                    </FormItem>
                  </Form>
                </div>
                <div className="component-info">
                  <h4>Form</h4>
                  <p>表单容器，集成校验和提交</p>
                  <code>onFinish, FormItem, rules</code>
                </div>
              </div>
            </div>
          </div>

          {/* Action Components */}
          <div className="component-group">
            <h3 className="group-title">操作组件</h3>
            <div className="component-grid">
              <div className="component-card">
                <div className="component-preview">
                  <div className="button-group">
                    <Button type="primary">主要</Button>
                    <Button type="secondary">次要</Button>
                    <Button type="danger">危险</Button>
                    <Button type="primary" disabled>
                      禁用
                    </Button>
                  </div>
                </div>
                <div className="component-info">
                  <h4>Button</h4>
                  <p>按钮，支持多种类型和尺寸</p>
                  <code>type, size, disabled</code>
                </div>
              </div>
              <div className="component-card">
                <div className="component-preview">
                  <Upload action="/api/upload" />
                </div>
                <div className="component-info">
                  <h4>Upload</h4>
                  <p>文件上传，支持拖拽和预览</p>
                  <code>action, onProgress, multiple</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Quick Start */}
        <section className="welcome-section">
          <h2 className="section-title">快速开始</h2>
          <div className="code-section">
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">安装</span>
              </div>
              <pre>
                <code>npm install forge-design --save</code>
              </pre>
            </div>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">使用</span>
              </div>
              <pre>
                <code>{`import { Button, Menu, Upload } from 'forge-design'
import 'forge-design/build/index.css'

function App() {
  return (
    <Button type="primary">开始使用</Button>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Section: Features */}
        <section className="welcome-section">
          <h2 className="section-title">核心特性</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📦</div>
              <h3>12+ 组件</h3>
              <p>
                Button、Menu、Upload、Form、Input、Select、Radio、Checkbox、Switch、DatePicker、TimePicker
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h3>TypeScript</h3>
              <p>完整的类型定义，支持严格模式，提供优秀的开发体验</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🧪</div>
              <h3>测试覆盖</h3>
              <p>使用 Jest + Testing Library 进行单元测试，保证质量</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📖</div>
              <h3>文档完整</h3>
              <p>Storybook 交互式文档，TypeDoc 自动生成 API 文档</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="welcome-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>技术栈</h4>
              <p>React 19 + TypeScript 5.7 + SCSS</p>
            </div>
            <div className="footer-section">
              <h4>构建工具</h4>
              <p>Vite + Rollup + Storybook</p>
            </div>
            <div className="footer-section">
              <h4>版本</h4>
              <p>v1.0.14 | MIT License</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              由 <strong>hhhhry</strong> 制作
            </p>
          </div>
        </footer>
      </div>
    )
  },
}
