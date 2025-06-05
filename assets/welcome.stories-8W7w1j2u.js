import{j as e}from"./jsx-runtime-D_zvdyIk.js";const d={title:"Welcome",parameters:{layout:"fullscreen"}},n={render:()=>e.jsxs("div",{className:"welcome-container",children:[e.jsxs("div",{className:"welcome-header",children:[e.jsx("h1",{children:"🔥 Forge Design System"}),e.jsx("p",{className:"welcome-subtitle",children:"专为现代 React 应用打造的企业级 UI 组件库"}),e.jsxs("div",{className:"welcome-badges",children:[e.jsx("span",{className:"badge",children:"v1.0.4"}),e.jsx("span",{className:"badge",children:"TypeScript"}),e.jsx("span",{className:"badge",children:"MIT License"})]})]}),e.jsxs("div",{className:"welcome-content",children:[e.jsxs("section",{className:"welcome-section",children:[e.jsx("h2",{children:"🚀 快速开始"}),e.jsxs("div",{className:"code-group",children:[e.jsxs("div",{className:"code-block-container",children:[e.jsx("h4",{children:"NPM 安装"}),e.jsx("pre",{className:"welcome-code-block",children:e.jsx("code",{children:"npm install forge-design --save"})})]}),e.jsxs("div",{className:"code-block-container",children:[e.jsx("h4",{children:"基础使用"}),e.jsx("pre",{className:"welcome-code-block",children:e.jsx("code",{children:`import { Button, Menu, Upload } from 'forge-design'
import 'forge-design/build/index.css'

function App() {
  return (
    <div>
      <Button type="primary">开始使用</Button>
    </div>
  )
}`})})]})]})]}),e.jsxs("section",{className:"welcome-section",children:[e.jsx("h2",{children:"✨ 核心特性"}),e.jsxs("div",{className:"features-grid",children:[e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"📦"}),e.jsx("h3",{children:"丰富的组件"}),e.jsx("p",{children:"提供 Button、Menu、Upload 等多种实用组件，覆盖常见业务场景"})]}),e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"🎨"}),e.jsx("h3",{children:"现代化设计"}),e.jsx("p",{children:"采用 SCSS 模块化样式，支持主题定制和响应式布局"})]}),e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"🔧"}),e.jsx("h3",{children:"TypeScript 支持"}),e.jsx("p",{children:"完整的类型定义，提供优秀的开发体验和类型安全"})]}),e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"🧪"}),e.jsx("h3",{children:"测试覆盖"}),e.jsx("p",{children:"使用 Jest + Testing Library 确保组件质量和稳定性"})]}),e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"📱"}),e.jsx("h3",{children:"响应式设计"}),e.jsx("p",{children:"适配各种屏幕尺寸，支持移动端和桌面端"})]}),e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"♿"}),e.jsx("h3",{children:"无障碍访问"}),e.jsx("p",{children:"遵循 WCAG 标准，确保所有用户都能正常使用"})]})]})]}),e.jsxs("section",{className:"welcome-section",children:[e.jsx("h2",{children:"🧩 组件概览"}),e.jsxs("div",{className:"components-overview",children:[e.jsxs("div",{className:"component-item",children:[e.jsx("h4",{children:"Button 按钮"}),e.jsx("p",{children:"支持多种类型、尺寸和状态的按钮组件"}),e.jsx("code",{children:"type, size, disabled, loading"})]}),e.jsxs("div",{className:"component-item",children:[e.jsx("h4",{children:"Menu 菜单"}),e.jsx("p",{children:"灵活的导航菜单，支持水平/垂直布局和子菜单"}),e.jsx("code",{children:"horizontal, vertical, SubMenu"})]}),e.jsxs("div",{className:"component-item",children:[e.jsx("h4",{children:"Upload 上传"}),e.jsx("p",{children:"功能完整的文件上传组件，支持拖拽、预览和进度显示"}),e.jsx("code",{children:"drag, preview, progress, validation"})]}),e.jsxs("div",{className:"component-item",children:[e.jsx("h4",{children:"Form 表单"}),e.jsx("p",{children:"表单组件集合，提供完整的表单解决方案"}),e.jsx("code",{children:"validation, layout, controls"})]})]})]}),e.jsxs("section",{className:"welcome-section",children:[e.jsx("h2",{children:"📖 使用示例"}),e.jsxs("div",{className:"example-container",children:[e.jsx("h4",{children:"组合使用示例"}),e.jsx("pre",{className:"welcome-code-block",children:e.jsx("code",{children:`import { Button, Menu, Upload } from 'forge-design'

function Dashboard() {
  const handleUpload = async (file: File) => {
    // 自定义上传逻辑
    return await uploadToServer(file)
  }

  return (
    <div className="dashboard">
      {/* 导航菜单 */}
      <Menu mode="horizontal" defaultSelectedKeys={['dashboard']}>
        <Menu.Item key="dashboard">控制台</Menu.Item>
        <Menu.Item key="files">文件管理</Menu.Item>
        <Menu.SubMenu key="settings" title="设置">
          <Menu.Item key="profile">个人信息</Menu.Item>
          <Menu.Item key="security">安全设置</Menu.Item>
        </Menu.SubMenu>
      </Menu>

      {/* 文件上传区域 */}
      <div className="upload-section">
        <h3>文件上传</h3>
        <Upload 
          action={handleUpload}
          onProgress={(fileName, progress) => {
            console.log(\`\${fileName}: \${progress}%\`)
          }}
        />
      </div>

      {/* 操作按钮 */}
      <div className="actions">
        <Button type="primary" size="large">
          保存更改
        </Button>
        <Button type="default">
          取消
        </Button>
      </div>
    </div>
  )
}`})})]})]}),e.jsxs("section",{className:"welcome-section",children:[e.jsx("h2",{children:"🛠️ 开发指南"}),e.jsxs("div",{className:"guide-grid",children:[e.jsxs("div",{className:"guide-item",children:[e.jsx("h4",{children:"📚 查看文档"}),e.jsx("p",{children:"在左侧导航栏中浏览所有组件的详细文档和示例"})]}),e.jsxs("div",{className:"guide-item",children:[e.jsx("h4",{children:"🎮 交互体验"}),e.jsx("p",{children:"每个组件都提供 Controls 面板，可以实时调整属性"})]}),e.jsxs("div",{className:"guide-item",children:[e.jsx("h4",{children:"📋 复制代码"}),e.jsx("p",{children:"所有示例都可以直接复制到您的项目中使用"})]})]})]}),e.jsxs("div",{className:"welcome-footer",children:[e.jsxs("div",{className:"footer-content",children:[e.jsxs("div",{className:"footer-section",children:[e.jsx("h4",{children:"技术栈"}),e.jsx("p",{children:"React 18 + TypeScript + SCSS + Storybook"})]}),e.jsxs("div",{className:"footer-section",children:[e.jsx("h4",{children:"构建工具"}),e.jsx("p",{children:"Vite + Rollup + Jest + ESLint"})]}),e.jsxs("div",{className:"footer-section",children:[e.jsx("h4",{children:"版本信息"}),e.jsx("p",{children:"当前版本: v1.0.4 | MIT License © 2025"})]})]}),e.jsx("div",{className:"footer-links",children:e.jsxs("p",{children:["由 ",e.jsx("strong",{children:"hhhhry"})," 用 ❤️ 制作"]})})]})]})]})};var s,i,c;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div className="welcome-container">
      <div className="welcome-header">
        <h1>🔥 Forge Design System</h1>
        <p className="welcome-subtitle">
          专为现代 React 应用打造的企业级 UI 组件库
        </p>

        <div className="welcome-badges">
          <span className="badge">v1.0.4</span>
          <span className="badge">TypeScript</span>
          <span className="badge">MIT License</span>
        </div>
      </div>

      <div className="welcome-content">
        <section className="welcome-section">
          <h2>🚀 快速开始</h2>
          <div className="code-group">
            <div className="code-block-container">
              <h4>NPM 安装</h4>
              <pre className="welcome-code-block">
                <code>npm install forge-design --save</code>
              </pre>
            </div>

            <div className="code-block-container">
              <h4>基础使用</h4>
              <pre className="welcome-code-block">
                <code>{\`import { Button, Menu, Upload } from 'forge-design'
import 'forge-design/build/index.css'

function App() {
  return (
    <div>
      <Button type="primary">开始使用</Button>
    </div>
  )
}\`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="welcome-section">
          <h2>✨ 核心特性</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>丰富的组件</h3>
              <p>提供 Button、Menu、Upload 等多种实用组件，覆盖常见业务场景</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>现代化设计</h3>
              <p>采用 SCSS 模块化样式，支持主题定制和响应式布局</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>TypeScript 支持</h3>
              <p>完整的类型定义，提供优秀的开发体验和类型安全</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧪</div>
              <h3>测试覆盖</h3>
              <p>使用 Jest + Testing Library 确保组件质量和稳定性</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>响应式设计</h3>
              <p>适配各种屏幕尺寸，支持移动端和桌面端</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">♿</div>
              <h3>无障碍访问</h3>
              <p>遵循 WCAG 标准，确保所有用户都能正常使用</p>
            </div>
          </div>
        </section>

        <section className="welcome-section">
          <h2>🧩 组件概览</h2>
          <div className="components-overview">
            <div className="component-item">
              <h4>Button 按钮</h4>
              <p>支持多种类型、尺寸和状态的按钮组件</p>
              <code>type, size, disabled, loading</code>
            </div>

            <div className="component-item">
              <h4>Menu 菜单</h4>
              <p>灵活的导航菜单，支持水平/垂直布局和子菜单</p>
              <code>horizontal, vertical, SubMenu</code>
            </div>

            <div className="component-item">
              <h4>Upload 上传</h4>
              <p>功能完整的文件上传组件，支持拖拽、预览和进度显示</p>
              <code>drag, preview, progress, validation</code>
            </div>

            <div className="component-item">
              <h4>Form 表单</h4>
              <p>表单组件集合，提供完整的表单解决方案</p>
              <code>validation, layout, controls</code>
            </div>
          </div>
        </section>

        <section className="welcome-section">
          <h2>📖 使用示例</h2>
          <div className="example-container">
            <h4>组合使用示例</h4>
            <pre className="welcome-code-block">
              <code>{\`import { Button, Menu, Upload } from 'forge-design'

function Dashboard() {
  const handleUpload = async (file: File) => {
    // 自定义上传逻辑
    return await uploadToServer(file)
  }

  return (
    <div className="dashboard">
      {/* 导航菜单 */}
      <Menu mode="horizontal" defaultSelectedKeys={['dashboard']}>
        <Menu.Item key="dashboard">控制台</Menu.Item>
        <Menu.Item key="files">文件管理</Menu.Item>
        <Menu.SubMenu key="settings" title="设置">
          <Menu.Item key="profile">个人信息</Menu.Item>
          <Menu.Item key="security">安全设置</Menu.Item>
        </Menu.SubMenu>
      </Menu>

      {/* 文件上传区域 */}
      <div className="upload-section">
        <h3>文件上传</h3>
        <Upload 
          action={handleUpload}
          onProgress={(fileName, progress) => {
            console.log(\\\`\\\${fileName}: \\\${progress}%\\\`)
          }}
        />
      </div>

      {/* 操作按钮 */}
      <div className="actions">
        <Button type="primary" size="large">
          保存更改
        </Button>
        <Button type="default">
          取消
        </Button>
      </div>
    </div>
  )
}\`}</code>
            </pre>
          </div>
        </section>

        <section className="welcome-section">
          <h2>🛠️ 开发指南</h2>
          <div className="guide-grid">
            <div className="guide-item">
              <h4>📚 查看文档</h4>
              <p>在左侧导航栏中浏览所有组件的详细文档和示例</p>
            </div>

            <div className="guide-item">
              <h4>🎮 交互体验</h4>
              <p>每个组件都提供 Controls 面板，可以实时调整属性</p>
            </div>

            <div className="guide-item">
              <h4>📋 复制代码</h4>
              <p>所有示例都可以直接复制到您的项目中使用</p>
            </div>
          </div>
        </section>

        <div className="welcome-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>技术栈</h4>
              <p>React 18 + TypeScript + SCSS + Storybook</p>
            </div>

            <div className="footer-section">
              <h4>构建工具</h4>
              <p>Vite + Rollup + Jest + ESLint</p>
            </div>

            <div className="footer-section">
              <h4>版本信息</h4>
              <p>当前版本: v1.0.4 | MIT License © 2025</p>
            </div>
          </div>

          <div className="footer-links">
            <p>
              由 <strong>hhhhry</strong> 用 ❤️ 制作
            </p>
          </div>
        </div>
      </div>
    </div>
}`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const l=["Welcome"];export{n as Welcome,l as __namedExportsOrder,d as default};
