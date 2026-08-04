import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form, { FormItem } from './index'

describe('Form Component', () => {
  it('should render form with children', () => {
    const { getByText } = render(
      <Form>
        <FormItem name="username" label="用户名">
          <input type="text" />
        </FormItem>
      </Form>
    )
    expect(getByText('用户名')).toBeInTheDocument()
  })

  it('should handle form submission', async () => {
    const onFinish = jest.fn()
    const { getByRole } = render(
      <Form onFinish={onFinish} initialValues={{ username: '' }}>
        <FormItem name="username" label="用户名">
          <input type="text" />
        </FormItem>
        <button type="submit">提交</button>
      </Form>
    )

    const input = getByRole('textbox')
    const submitBtn = getByRole('button', { name: /提交/i })

    fireEvent.change(input, { target: { value: 'testuser' } })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ username: 'testuser' })
    })
  })

  it('should validate required field', async () => {
    const onFinishFailed = jest.fn()
    const { getByRole } = render(
      <Form onFinishFailed={onFinishFailed} initialValues={{ username: '' }}>
        <FormItem
          name="username"
          label="用户名"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <input type="text" />
        </FormItem>
        <button type="submit">提交</button>
      </Form>
    )

    const submitBtn = getByRole('button', { name: /提交/i })

    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(onFinishFailed).toHaveBeenCalled()
    })
  })

  it('should support horizontal layout', () => {
    const { container } = render(
      <Form layout="horizontal">
        <FormItem name="username" label="用户名">
          <input type="text" />
        </FormItem>
      </Form>
    )

    expect(container.querySelector('form')).toBeInTheDocument()
  })
})
