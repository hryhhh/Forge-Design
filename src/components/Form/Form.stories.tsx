import type { Meta, StoryObj } from '@storybook/react-vite'
import Form, { FormItem } from './index'

const meta: Meta<typeof Form> = {
  title: 'Forge Design/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Form>

// 基础表单
export const Basic: Story = {
  render: () => (
    <Form
      initialValues={{ username: '', email: '' }}
      onFinish={values => console.log('Submitted:', values)}
    >
      <FormItem
        name="username"
        label="用户名"
        required
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <input type="text" placeholder="请输入用户名" />
      </FormItem>
      <FormItem
        name="email"
        label="邮箱"
        required
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <input type="email" placeholder="请输入邮箱" />
      </FormItem>
      <button type="submit">提交</button>
    </Form>
  ),
}

// 水平布局
export const Horizontal: Story = {
  render: () => (
    <Form layout="horizontal">
      <FormItem name="username" label="用户名">
        <input type="text" />
      </FormItem>
      <FormItem name="email" label="邮箱">
        <input type="email" />
      </FormItem>
    </Form>
  ),
}

// 内联布局
export const Inline: Story = {
  render: () => (
    <Form layout="inline">
      <FormItem name="username" label="用户名">
        <input type="text" />
      </FormItem>
      <FormItem name="age" label="年龄">
        <input type="number" />
      </FormItem>
    </Form>
  ),
}

// 带验证
export const WithValidation: Story = {
  render: () => (
    <Form
      onFinish={values => alert('提交成功: ' + JSON.stringify(values))}
      onFinishFailed={() => alert('验证失败')}
    >
      <FormItem
        name="username"
        label="用户名"
        required
        rules={[{ required: true, message: '用户名不能为空' }]}
      >
        <input type="text" placeholder="请输入用户名" />
      </FormItem>
      <FormItem
        name="email"
        label="邮箱"
        required
        rules={[
          { required: true, message: '请输入邮箱' },
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        ]}
      >
        <input type="email" placeholder="请输入邮箱" />
      </FormItem>
      <button type="submit">提交</button>
    </Form>
  ),
}
