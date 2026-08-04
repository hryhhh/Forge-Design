import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Switch from './index'

describe('Switch Component', () => {
  it('should render basic switch', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('.forge-switch')).toBeInTheDocument()
  })

  it('should support defaultChecked', () => {
    const { container } = render(<Switch defaultChecked />)
    const input = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    expect(input.checked).toBe(true)
    expect(
      container.querySelector('.forge-switch--checked')
    ).toBeInTheDocument()
  })

  it('should support checked prop (controlled)', () => {
    const { container } = render(<Switch checked />)
    const input = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    expect(input.checked).toBe(true)
    expect(
      container.querySelector('.forge-switch--checked')
    ).toBeInTheDocument()
  })

  it('should support unchecked', () => {
    const { container } = render(<Switch checked={false} />)
    const input = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    expect(input.checked).toBe(false)
    expect(
      container.querySelector('.forge-switch--checked')
    ).not.toBeInTheDocument()
  })

  it('should support size prop', () => {
    const { container } = render(<Switch size="large" />)
    expect(container.querySelector('.forge-switch--large')).toBeInTheDocument()
  })

  it('should support small size', () => {
    const { container } = render(<Switch size="small" />)
    expect(container.querySelector('.forge-switch--small')).toBeInTheDocument()
  })

  it('should support disabled state', () => {
    const { container } = render(<Switch disabled />)
    const input = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    expect(input).toBeDisabled()
    expect(
      container.querySelector('.forge-switch--disabled')
    ).toBeInTheDocument()
  })

  it('should toggle on click', () => {
    const handleChange = jest.fn()
    const { container } = render(<Switch onChange={handleChange} />)
    const switchEl = container.querySelector('.forge-switch') as HTMLElement
    fireEvent.click(switchEl)
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('should toggle off on click when checked', () => {
    const handleChange = jest.fn()
    const { container } = render(<Switch checked onChange={handleChange} />)
    const switchEl = container.querySelector('.forge-switch') as HTMLElement
    fireEvent.click(switchEl)
    expect(handleChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it('should support loading state', () => {
    const { container } = render(<Switch loading />)
    expect(
      container.querySelector('.forge-switch--loading')
    ).toBeInTheDocument()
  })

  it('should support beforeChange to block toggle', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Switch beforeChange={() => false} onChange={handleChange} />
    )
    const switchEl = container.querySelector('.forge-switch') as HTMLElement
    fireEvent.click(switchEl)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('should support checkedChildren and unCheckedChildren', () => {
    const { container } = render(
      <Switch checkedChildren="开" unCheckedChildren="关" />
    )
    expect(
      container.querySelector('.forge-switch-unchecked-content')
    ).toHaveTextContent('关')
  })

  it('should support onFocus and onBlur', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    const { container } = render(
      <Switch onFocus={handleFocus} onBlur={handleBlur} />
    )
    const input = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('should support autoFocus', () => {
    const { container } = render(<Switch autoFocus />)
    const input = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    expect(document.activeElement).toBe(input)
  })
})
