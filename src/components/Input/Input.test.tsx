import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './index'

describe('Input Component', () => {
  it('should render basic input', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="请输入内容" />
    )
    expect(getByPlaceholderText('请输入内容')).toBeInTheDocument()
  })

  it('should render controlled input', async () => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <Input value="test" onChange={handleChange} />
    )
    const input = getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('test')

    fireEvent.change(input, { target: { value: 'updated' } })
    expect(handleChange).toHaveBeenCalledWith('updated', expect.anything())
  })

  it('should render uncontrolled input with defaultValue', () => {
    const { getByRole } = render(<Input defaultValue="default" />)
    const input = getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('default')
  })

  it('should support size prop', () => {
    const { getByRole } = render(<Input size="large" />)
    const input = getByRole('textbox') as HTMLInputElement
    expect(input).toHaveClass('forge-input--large')
  })

  it('should render small size', () => {
    const { getByRole } = render(<Input size="small" />)
    const input = getByRole('textbox') as HTMLInputElement
    expect(input).toHaveClass('forge-input--small')
  })

  it('should support disabled state', () => {
    const { getByRole } = render(<Input disabled />)
    const input = getByRole('textbox') as HTMLInputElement
    expect(input).toBeDisabled()
    expect(input).toHaveClass('forge-input--disabled')
  })

  it('should support password type', () => {
    const { container } = render(<Input type="password" />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.type).toBe('password')
  })

  it('should show clear button when allowClear is true', () => {
    const { getByRole } = render(
      <Input value="test" allowClear onClear={() => {}} />
    )
    const clearBtn = getByRole('button', { name: /clear/i })
    expect(clearBtn).toBeInTheDocument()
  })

  it('should not show clear button when value is empty', () => {
    const { queryByRole } = render(<Input allowClear />)
    const clearBtn = queryByRole('button', { name: /clear/i })
    expect(clearBtn).not.toBeInTheDocument()
  })

  it('should clear value when clear button is clicked', () => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <Input value="test" allowClear onChange={handleChange} />
    )
    const clearBtn = getByRole('button', { name: /clear/i })
    fireEvent.click(clearBtn)
    expect(handleChange).toHaveBeenCalledWith('')
  })

  it('should support prefix', () => {
    const { getByText } = render(<Input prefix="🔍" />)
    expect(getByText('🔍')).toBeInTheDocument()
  })

  it('should support suffix', () => {
    const { getByText } = render(<Input suffix="🔒" />)
    expect(getByText('🔒')).toBeInTheDocument()
  })

  it('should support maxLength', () => {
    const { getByRole } = render(<Input maxLength={10} />)
    const input = getByRole('textbox') as HTMLInputElement
    expect(input.maxLength).toBe(10)
  })

  it('should support onPressEnter', () => {
    const handlePressEnter = jest.fn()
    const { getByRole } = render(<Input onPressEnter={handlePressEnter} />)
    const input = getByRole('textbox') as HTMLInputElement
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(handlePressEnter).toHaveBeenCalled()
  })

  it('should support onFocus and onBlur', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    const { getByRole } = render(
      <Input onFocus={handleFocus} onBlur={handleBlur} />
    )
    const input = getByRole('textbox') as HTMLInputElement
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('should support autoFocus', () => {
    const { getByRole } = render(<Input autoFocus />)
    const input = getByRole('textbox') as HTMLInputElement
    expect(document.activeElement).toBe(input)
  })

  it('should support readOnly', () => {
    const { getByRole } = render(<Input value="readonly" readOnly />)
    const input = getByRole('textbox') as HTMLInputElement
    expect(input).toHaveAttribute('readonly')
  })

  it('should render TextArea component', () => {
    const { getByRole } = render(<Input.TextArea placeholder="请输入" />)
    const textarea = getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('should support TextArea autoSize', () => {
    const { getByRole } = render(
      <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
    )
    const textarea = getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toBeInTheDocument()
  })

  it('should render Input.Group', () => {
    const { container } = render(
      <Input.Group>
        <Input placeholder="前缀" />
        <Input placeholder="后缀" />
      </Input.Group>
    )
    expect(container.querySelector('.forge-input-group')).toBeInTheDocument()
  })

  it('should render Input.Group with addonBefore', () => {
    const { container } = render(
      <Input.Group addonBefore="http://">
        <Input placeholder="请输入网址" />
      </Input.Group>
    )
    expect(container.querySelector('.forge-input-group-addon-before')).toBeInTheDocument()
  })

  it('should render Input.Group with addonAfter', () => {
    const { container } = render(
      <Input.Group addonAfter=".com">
        <Input placeholder="请输入域名" />
      </Input.Group>
    )
    expect(container.querySelector('.forge-input-group-addon-after')).toBeInTheDocument()
  })

  it('should render Input.AddOn', () => {
    const { getByText } = render(<Input.AddOn type="before">¥</Input.AddOn>)
    expect(getByText('¥')).toBeInTheDocument()
  })
})
