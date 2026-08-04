import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import DatePicker from './index'

describe('DatePicker Component', () => {
  it('should render basic datepicker', () => {
    const { container } = render(<DatePicker />)
    expect(container.querySelector('.forge-datepicker')).toBeInTheDocument()
  })

  it('should render input with placeholder', () => {
    const { container } = render(<DatePicker placeholder="选择日期" />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.placeholder).toBe('选择日期')
  })

  it('should support defaultValue', () => {
    const date = new Date(2024, 0, 15)
    const { container } = render(<DatePicker defaultValue={date} />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('2024-01-15')
  })

  it('should support value prop', () => {
    const date = new Date(2024, 5, 20)
    const { container } = render(<DatePicker value={date} />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('2024-06-20')
  })

  it('should support size prop', () => {
    const { container } = render(<DatePicker size="large" />)
    expect(container.querySelector('.forge-datepicker--large')).toBeInTheDocument()
  })

  it('should support small size', () => {
    const { container } = render(<DatePicker size="small" />)
    expect(container.querySelector('.forge-datepicker--small')).toBeInTheDocument()
  })

  it('should support disabled state', () => {
    const { container } = render(<DatePicker disabled />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toBeDisabled()
    expect(container.querySelector('.forge-datepicker--disabled')).toBeInTheDocument()
  })

  it('should open calendar on focus', () => {
    const { container } = render(<DatePicker />)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.focus(input)
    expect(container.querySelector('.forge-datepicker-dropdown')).toBeInTheDocument()
  })

  it('should show calendar panel with current month', () => {
    const { container } = render(<DatePicker />)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.focus(input)
    const panel = container.querySelector('.forge-datepicker-panel')
    expect(panel).toBeInTheDocument()
  })

  it('should support format prop', () => {
    const date = new Date(2024, 0, 15)
    const { container } = render(<DatePicker value={date} format="YYYY/MM/DD" />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('2024/01/15')
  })

  it('should support allowClear', () => {
    const handleChange = jest.fn()
    const date = new Date(2024, 0, 15)
    const { container } = render(
      <DatePicker value={date} allowClear onChange={handleChange} />
    )
    const clearBtn = container.querySelector('.forge-datepicker-clear')
    expect(clearBtn).toBeInTheDocument()
    fireEvent.click(clearBtn!)
    expect(handleChange).toHaveBeenCalledWith(null, '')
  })

  it('should not show clear button when no value', () => {
    const { container } = render(<DatePicker allowClear />)
    expect(container.querySelector('.forge-datepicker-clear')).not.toBeInTheDocument()
  })

  it('should support disabledDate', () => {
    const { container } = render(
      <DatePicker disabledDate={(current) => current.getDate() > 15} />
    )
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.focus(input)
    const disabledDays = container.querySelectorAll('.forge-datepicker-day-disabled')
    expect(disabledDays.length).toBeGreaterThan(0)
  })

  it('should support prefix and suffix', () => {
    const { container } = render(
      <DatePicker prefix={<span>📅</span>} suffix={<span>📍</span>} />
    )
    expect(container.querySelector('.forge-datepicker-prefix')).toBeInTheDocument()
    expect(container.querySelector('.forge-datepicker-suffix')).toBeInTheDocument()
  })

  it('should support onFocus and onBlur', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    const { container } = render(
      <DatePicker onFocus={handleFocus} onBlur={handleBlur} />
    )
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('should support autoFocus', () => {
    const { container } = render(<DatePicker autoFocus />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toBeInstanceOf(HTMLInputElement)
  })

  it('should close calendar when clicking outside', () => {
    const { container } = render(<DatePicker />)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.focus(input)
    expect(container.querySelector('.forge-datepicker-dropdown')).toBeInTheDocument()
    
    fireEvent.mouseDown(document.body)
    expect(container.querySelector('.forge-datepicker-dropdown')).not.toBeInTheDocument()
  })

  it('should render calendar with correct month', () => {
    const date = new Date(2024, 5, 20)
    const { container } = render(<DatePicker value={date} />)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.focus(input)
    
    const monthLabel = container.querySelector('.forge-datepicker-month')
    expect(monthLabel).toHaveTextContent('2024年6月')
  })

  it('should navigate to previous month', () => {
    const date = new Date(2024, 5, 20)
    const { container } = render(<DatePicker value={date} />)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.focus(input)
    
    const prevBtn = container.querySelector('.forge-datepicker-prev') as HTMLButtonElement
    fireEvent.click(prevBtn)
    
    const monthLabel = container.querySelector('.forge-datepicker-month')
    expect(monthLabel).toHaveTextContent('2024年5月')
  })
})
