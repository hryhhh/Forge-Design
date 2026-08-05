import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RangePicker } from './index'
import type { RangePickerPlaceholder } from './types'

const ph1: RangePickerPlaceholder = ['开始', '结束']

// 获取当前月份的开始和中间日期
const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()

describe('RangePicker Component', () => {
  it('should render basic range picker', () => {
    const { container } = render(<RangePicker />)
    expect(container.querySelector('.forge-range-picker')).toBeInTheDocument()
  })

  it('should render two inputs', () => {
    const { container } = render(<RangePicker />)
    const inputs = container.querySelectorAll('.forge-range-picker-input')
    expect(inputs).toHaveLength(2)
  })

  it('should show placeholder for both inputs', () => {
    const { container } = render(<RangePicker placeholder={ph1} />)
    const inputs = container.querySelectorAll<HTMLInputElement>('.forge-range-picker-input')
    expect(inputs[0].placeholder).toBe('开始')
    expect(inputs[1].placeholder).toBe('结束')
  })

  it('should open calendar on focus', () => {
    const { container } = render(<RangePicker />)
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    expect(container.querySelector('.forge-range-picker-dropdown')).toBeInTheDocument()
  })

  it('should show two calendar panels', () => {
    const { container } = render(<RangePicker />)
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    const panels = container.querySelectorAll('.forge-range-picker-panel')
    expect(panels).toHaveLength(2)
  })

  it('should support disabled state', () => {
    const { container } = render(<RangePicker disabled />)
    const inputs = container.querySelectorAll<HTMLInputElement>('.forge-range-picker-input')
    inputs.forEach(input => expect(input).toBeDisabled())
  })

  it('should support size prop', () => {
    const { container } = render(<RangePicker size="large" />)
    expect(container.querySelector('.forge-range-picker--large')).toBeInTheDocument()
  })

  it('should support allowClear', () => {
    const handleChange = jest.fn()
    const startDate = new Date(currentYear, currentMonth, 1)
    const endDate = new Date(currentYear, currentMonth, 15)
    const { container } = render(
      <RangePicker
        value={[startDate, endDate] as any}
        allowClear
        onChange={handleChange}
      />
    )
    const clearBtn = container.querySelector('.forge-datepicker-clear')
    expect(clearBtn).toBeInTheDocument()
    fireEvent.click(clearBtn!)
    expect(handleChange).toHaveBeenCalledWith(null, ['', ''])
  })

  it('should not show clear button when no value', () => {
    const { container } = render(<RangePicker allowClear />)
    expect(container.querySelector('.forge-datepicker-clear')).not.toBeInTheDocument()
  })

  it('should close calendar when clicking outside', () => {
    const { container } = render(<RangePicker />)
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    expect(container.querySelector('.forge-range-picker-dropdown')).toBeInTheDocument()

    fireEvent.mouseDown(document.body)
    expect(container.querySelector('.forge-range-picker-dropdown')).not.toBeInTheDocument()
  })

  it('should support disabledDate', () => {
    const { container } = render(
      <RangePicker disabledDate={current => current.getDate() > 15} />
    )
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    const disabledDays = container.querySelectorAll('.forge-datepicker-day-disabled')
    expect(disabledDays.length).toBeGreaterThan(0)
  })

  it('left panel should only set startDate', () => {
    const handleChange = jest.fn()
    const { container } = render(<RangePicker onChange={handleChange} />)
    
    // Focus to open
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    
    // Click on a day in left panel (first panel)
    const panels = container.querySelectorAll('.forge-range-picker-panel')
    const leftPanelDays = panels[0]?.querySelectorAll('.forge-datepicker-day')
    if (leftPanelDays && leftPanelDays.length > 0) {
      fireEvent.click(leftPanelDays[0]!)
    }
    
    // Should have called onChange with single date (startDate only)
    expect(handleChange).toHaveBeenCalledTimes(1)
    const [[start, end]] = handleChange.mock.calls[0]
    expect(start).toBeTruthy()
    expect(end).toBeFalsy()
  })

  it('right panel should set endDate when startDate exists', () => {
    const handleChange = jest.fn()
    const startDate = new Date(currentYear, currentMonth, 1)
    
    const { container } = render(
      <RangePicker
        value={[startDate, null] as any}
        onChange={handleChange}
      />
    )
    
    // Focus to open
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    
    // Click on a day in right panel (second panel)
    const panels = container.querySelectorAll('.forge-range-picker-panel')
    const rightPanelDays = panels[1]?.querySelectorAll('.forge-datepicker-day')
    if (rightPanelDays && rightPanelDays.length > 0) {
      fireEvent.click(rightPanelDays[0]!)
    }
    
    // Should have called onChange with both dates
    expect(handleChange).toHaveBeenCalled()
  })

  it('should show range start and end classes with current month dates', () => {
    const startDate = new Date(currentYear, currentMonth, 1)
    const endDate = new Date(currentYear, currentMonth, 10)
    
    const { container } = render(
      <RangePicker
        value={[startDate, endDate] as any}
      />
    )
    
    // Focus to open
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    
    const rangeStart = container.querySelector('.forge-datepicker-day-range-start')
    const rangeEnd = container.querySelector('.forge-datepicker-day-range-end')
    
    expect(rangeStart).toBeInTheDocument()
    expect(rangeEnd).toBeInTheDocument()
  })

  it('should show in-range class for dates between start and end', () => {
    const startDate = new Date(currentYear, currentMonth, 1)
    const endDate = new Date(currentYear, currentMonth, 10)
    
    const { container } = render(
      <RangePicker
        value={[startDate, endDate] as any}
      />
    )
    
    // Focus to open
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    
    const inRange = container.querySelectorAll('.forge-datepicker-day-in-range')
    expect(inRange.length).toBeGreaterThan(0)
  })

  it('should mark today date', () => {
    const { container } = render(<RangePicker />)
    
    // Focus to open
    const input = container.querySelector('.forge-range-picker-input') as HTMLInputElement
    fireEvent.focus(input)
    
    const todayEl = container.querySelector('.forge-datepicker-day-today')
    expect(todayEl).toBeInTheDocument()
  })
})
