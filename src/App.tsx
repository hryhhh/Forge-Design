import { useState } from 'react'
import Button from './components/Button'
import { Menu } from './components/Menu'
import Input from './components/Input'
import Select from './components/Select'
import Radio from './components/Radio'
import Checkbox from './components/Checkbox'
import Switch from './components/Switch'
import DatePicker from './components/DatePicker'
import TimePicker from './components/TimePicker'
import { FormItem } from './components/Form'
import Form from './components/Form'
import { Upload } from './components/Upload'

interface Project {
  id: number
  name: string
  category: string
  description: string
  cover?: string
  createdAt: string
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [projects, setProjects] = useState<Project[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [menuMode, setMenuMode] = useState<'horizontal' | 'vertical'>(
    'horizontal'
  )
  const [selectValue, setSelectValue] = useState<string>('')
  const [radioValue, setRadioValue] = useState<string>('web')
  const [checkboxValues, setCheckboxValues] = useState<string[]>([])
  const [swtch, setSwtch] = useState<boolean>(false)
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [timeValue, setTimeValue] = useState<Date | null>(null)

  const handleCreateProject = async (values: any) => {
    setSubmitting(true)
    setSubmitStatus('idle')

    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 800))

    const newProject: Project = {
      id: Date.now(),
      name: values.name,
      category: values.category,
      description: values.description || '',
      createdAt: new Date().toLocaleDateString('zh-CN'),
    }

    setProjects([newProject, ...projects])
    setSubmitting(false)
    setSubmitStatus('success')
    setCurrentPage('projects')
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <span className="logo">Forge-Design</span>
        <nav className="main-nav">
          <Menu
            mode="horizontal"
            defaultIndex={currentPage}
            onSelect={index => setCurrentPage(index)}
          >
            <Menu.Item index="home">首页</Menu.Item>
            <Menu.Item index="projects">项目列表</Menu.Item>
            <Menu.Item index="create">新建项目</Menu.Item>
          </Menu>
        </nav>
        <div className="header-right">
          <Button size="small" type="link">
            帮助
          </Button>
          <Button size="small" type="secondary">
            登录
          </Button>
          <Button size="small" type="primary">
            注册
          </Button>
        </div>
      </header>

      <main className="app-main">
        {currentPage === 'home' && (
          <div className="home">
            <div className="hero">
              <h1>Forge-Design 组件库</h1>
              <p className="hero-desc">
                基于 React + TypeScript 的轻量级 UI 组件库，提供常用业务组件
              </p>
              <div className="hero-actions">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setCurrentPage('create')}
                >
                  创建第一个项目
                </Button>
                <Button
                  type="secondary"
                  size="large"
                  onClick={() => setCurrentPage('projects')}
                >
                  查看项目
                </Button>
              </div>
            </div>

            <section className="components-demo">
              <h2>组件示例</h2>
              <div className="demo-grid">
                <div className="demo-card">
                  <h3>Button</h3>
                  <div className="demo-items">
                    <Button type="primary">主要按钮</Button>
                    <Button type="secondary">次要按钮</Button>
                    <Button type="danger">危险按钮</Button>
                    <Button type="primary" disabled>
                      禁用状态
                    </Button>
                  </div>
                </div>

                <div className="demo-card">
                  <h3>Input</h3>
                  <div className="demo-form">
                    <Input
                      placeholder="请输入文本"
                      allowClear
                      style={{ width: '100%', marginBottom: 8 }}
                    />
                    <Input
                      type="password"
                      placeholder="请输入密码"
                      allowClear
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="demo-card">
                  <h3>Select</h3>
                  <div className="demo-form">
                    <Select
                      placeholder="请选择"
                      value={selectValue}
                      onChange={v => setSelectValue(v as string)}
                      style={{ width: '100%' }}
                      options={[
                        { value: 'web', label: 'Web 应用' },
                        { value: 'mobile', label: '移动应用' },
                        { value: 'desktop', label: '桌面应用' },
                        { value: 'api', label: 'API 服务' },
                      ]}
                    />
                  </div>
                </div>

                <div className="demo-card">
                  <h3>Radio</h3>
                  <div className="demo-form">
                    <Radio.Group
                      value={radioValue}
                      onChange={v => setRadioValue(v as string)}
                      options={[
                        { value: 'web', label: 'Web 应用' },
                        { value: 'mobile', label: '移动应用' },
                        { value: 'desktop', label: '桌面应用' },
                      ]}
                    />
                  </div>
                </div>

                <div className="demo-card">
                  <h3>Checkbox</h3>
                  <div className="demo-form">
                    <Checkbox.Group
                      value={checkboxValues}
                      onChange={v => setCheckboxValues(v as string[])}
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue' },
                        { value: 'angular', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                      ]}
                    />
                  </div>
                </div>

                <div className="demo-card">
                  <h3>Switch</h3>
                  <div className="demo-form">
                    <Switch
                      checked={swtch}
                      onChange={v => setSwtch(v)}
                      checkedChildren="开"
                      unCheckedChildren="关"
                    />
                  </div>
                </div>

                <div className="demo-card">
                  <h3>DatePicker</h3>
                  <div className="demo-form">
                    <DatePicker
                      value={dateValue}
                      onChange={d => setDateValue(d)}
                      style={{ width: '100%' }}
                      placeholder="选择日期"
                    />
                  </div>
                </div>

                <div className="demo-card">
                  <h3>TimePicker</h3>
                  <div className="demo-form">
                    <TimePicker
                      value={timeValue}
                      onChange={d => setTimeValue(d)}
                      style={{ width: '100%' }}
                      placeholder="选择时间"
                    />
                  </div>
                </div>

                <div className="demo-card demo-card--menu">
                  <h3>Menu</h3>
                  <div className="menu-toggle">
                    <Button
                      size="small"
                      type={menuMode === 'horizontal' ? 'primary' : 'secondary'}
                      onClick={() => setMenuMode('horizontal')}
                    >
                      水平
                    </Button>
                    <Button
                      size="small"
                      type={menuMode === 'vertical' ? 'primary' : 'secondary'}
                      onClick={() => setMenuMode('vertical')}
                    >
                      垂直
                    </Button>
                  </div>
                  <Menu mode={menuMode} defaultIndex="0">
                    {menuMode === 'horizontal' ? (
                      <>
                        <Menu.Item index="0">首页</Menu.Item>
                        <Menu.Item index="1">产品</Menu.Item>
                        <Menu.Item index="2">关于</Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Item index="0">仪表盘</Menu.Item>
                        <Menu.Item index="1">订单管理</Menu.Item>
                        <Menu.Item index="2">用户中心</Menu.Item>
                        <Menu.Item index="3">系统设置</Menu.Item>
                      </>
                    )}
                  </Menu>
                </div>

                <div className="demo-card">
                  <h3>Upload</h3>
                  <Upload action="/api/upload" />
                  <p className="upload-hint">
                    支持拖拽或点击上传，建议尺寸 1200×630
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'create' && (
          <div className="create-page">
            <div className="page-header">
              <h2>新建项目</h2>
              <Button
                size="small"
                type="secondary"
                onClick={() => setCurrentPage('home')}
              >
                返回
              </Button>
            </div>

            <div className="create-layout">
              <div className="create-form-section">
                <h3>项目信息</h3>
                <Form
                  initialValues={{ name: '', category: '', description: '' }}
                  onFinish={handleCreateProject}
                  className="project-form"
                >
                  <FormItem
                    name="name"
                    label="项目名称"
                    required
                    rules={[
                      { required: true, message: '请输入项目名称' },
                      { min: 2, message: '项目名称至少2个字符' },
                    ]}
                  >
                    <Input placeholder="请输入项目名称" />
                  </FormItem>

                  <FormItem
                    name="category"
                    label="项目类型"
                    required
                    rules={[{ required: true, message: '请选择项目类型' }]}
                  >
                    <Select
                      placeholder="请选择项目类型"
                      options={[
                        { value: 'web', label: 'Web 应用' },
                        { value: 'mobile', label: '移动应用' },
                        { value: 'desktop', label: '桌面应用' },
                        { value: 'api', label: 'API 服务' },
                      ]}
                    />
                  </FormItem>

                  <FormItem name="description" label="项目描述">
                    <Input.TextArea
                      rows={4}
                      placeholder="请输入项目描述（可选）"
                    />
                  </FormItem>

                  {submitStatus === 'success' && (
                    <div className="submit-success">
                      项目创建成功，正在跳转到项目列表...
                    </div>
                  )}

                  <div className="form-actions">
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={submitting}
                    >
                      {submitting ? '创建中...' : '创建项目'}
                    </Button>
                    <Button
                      type="secondary"
                      onClick={() => setCurrentPage('home')}
                    >
                      取消
                    </Button>
                  </div>
                </Form>
              </div>

              <div className="create-aside">
                <h3>项目封面</h3>
                <Upload action="/api/upload" />
                <p className="upload-hint">
                  支持 JPG、PNG 格式，建议尺寸 1200×630
                </p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'projects' && (
          <div className="projects-page">
            <div className="page-header">
              <h2>我的项目</h2>
              <Button type="primary" onClick={() => setCurrentPage('create')}>
                新建项目
              </Button>
            </div>

            {projects.length === 0 ? (
              <div className="empty-state">
                <p>还没有项目</p>
                <Button type="primary" onClick={() => setCurrentPage('create')}>
                  创建第一个项目
                </Button>
              </div>
            ) : (
              <div className="project-list">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-info">
                      <h4>{project.name}</h4>
                      <p className="project-meta">
                        <span className="project-type">{project.category}</span>
                        <span className="project-date">
                          {project.createdAt}
                        </span>
                      </p>
                      {project.description && (
                        <p className="project-desc">{project.description}</p>
                      )}
                    </div>
                    <Button
                      type="danger"
                      size="small"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      删除
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Forge-Design © 2026 — 轻量级 React 组件库</p>
      </footer>
    </div>
  )
}

export default App
