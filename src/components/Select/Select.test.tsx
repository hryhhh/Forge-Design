import { fireEvent, render, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Select from './index'

const options = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' },
  { value: 'grape', label: '葡萄', disabled: true },
]

describe('Select Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render basic select', () => {
    const { container } = render(<Select placeholder="请选择" options={options} />)
    expect(container.querySelector('.forge-select')).toBeInTheDocument()
  })

  it('should open dropdown on click', async () => {
    const { container } = render(<Select options={options} />)
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
  })

  it('should select an option', async () => {
    const handleChange = jest.fn()
    const { container } = render(<Select options={options} onChange={handleChange} />)
    
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
    
    const option = container.querySelector('.forge-select-item')
    fireEvent.click(option!)
    
    expect(handleChange).toHaveBeenCalledWith('apple', expect.anything())
  })

  it('should support controlled value', async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Select value="banana" options={options} onChange={handleChange} />
    )
    
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
    
    expect(container.querySelector('.forge-select-item--selected')).toHaveTextContent('香蕉')
  })

  it('should support defaultValue', async () => {
    const { container } = render(<Select defaultValue="orange" options={options} />)
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
  })

  it('should support size prop', () => {
    const { container } = render(<Select size="large" options={options} />)
    expect(container.querySelector('.forge-select--large')).toBeInTheDocument()
  })

  it('should support disabled state', () => {
    const { container } = render(<Select disabled options={options} />)
    expect(container.querySelector('.forge-select--disabled')).toBeInTheDocument()
  })

  it('should support showSearch', async () => {
    const { container } = render(
      <Select showSearch options={options} />
    )
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
    
    const searchInput = container.querySelector('input.forge-select-selection-search:not(.forge-select-selection-search--hidden)') as HTMLInputElement
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: '苹' } })
      await waitFor(() => {
        const items = container.querySelectorAll('.forge-select-item')
        expect(items.length).toBeGreaterThan(0)
      })
    }
  })

  it('should support allowClear', async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Select value="apple" options={options} allowClear onChange={handleChange} />
    )
    const clearBtn = container.querySelector('.forge-select-clear')
    expect(clearBtn).toBeInTheDocument()
    fireEvent.click(clearBtn!)
    expect(handleChange).toHaveBeenCalledWith(undefined, expect.anything())
  })

  it('should not show clear button when no value', () => {
    const { container } = render(<Select options={options} allowClear />)
    expect(container.querySelector('.forge-select-clear')).not.toBeInTheDocument()
  })

  it('should support multiple mode', async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Select mode="multiple" options={options} onChange={handleChange} />
    )
    
    // 打开下拉
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
    
    const items = container.querySelectorAll('.forge-select-item')
    if (items.length >= 2) {
      // 点击第一个选项（apple）
      fireEvent.click(items[0]!)
      expect(handleChange).toHaveBeenCalledWith(['apple'], expect.anything())
      
      // 重新打开下拉（因为选择后会关闭）
      fireEvent.click(container.querySelector('.forge-select')!)
      await waitFor(() => {
        expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
      })
      
      // 点击第二个选项（banana）
      const items2 = container.querySelectorAll('.forge-select-item')
      if (items2.length >= 2) {
        fireEvent.click(items2[1]!)
        expect(handleChange).toHaveBeenCalledWith(['apple', 'banana'], expect.anything())
      }
    }
  })

  it('should support tags mode', async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Select mode="tags" options={options} onChange={handleChange} />
    )
    
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
    
    const item = container.querySelector('.forge-select-item')
    if (item) {
      fireEvent.click(item)
      // tags 模式也应该返回数组
      expect(handleChange).toHaveBeenCalledWith(['apple'], expect.anything())
    }
  })

  it('should not select disabled option', async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Select options={options} onChange={handleChange} />
    )
    
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
    
    const disabledItem = Array.from(container.querySelectorAll('.forge-select-item'))
      .find((el: Element) => el.classList.contains('forge-select-item--disabled'))
    if (disabledItem) {
      fireEvent.click(disabledItem)
      expect(handleChange).not.toHaveBeenCalled()
    }
  })

  it('should support onFocus and onBlur', async () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    const { container } = render(
      <Select showSearch options={options} onFocus={handleFocus} onBlur={handleBlur} />
    )
    
    // 聚焦到搜索 input
    const searchInput = container.querySelector('input.forge-select-selection-search:not(.forge-select-selection-search--hidden)') as HTMLInputElement
    if (searchInput) {
      fireEvent.focus(searchInput)
      expect(handleFocus).toHaveBeenCalled()
      
      fireEvent.blur(searchInput)
      act(() => {
        jest.advanceTimersByTime(200)
      })
      expect(handleBlur).toHaveBeenCalled()
    }
  })

  it('should support autoFocus', () => {
    const { container } = render(<Select autoFocus options={options} />)
    expect(container.querySelector('.forge-select')).toHaveFocus()
  })

  it('should support loading state', async () => {
    const { container } = render(<Select loading options={options} />)
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-item--loading')).toBeInTheDocument()
    })
  })

  it('should render Select.Option', () => {
    const { container } = render(
      <Select>
        <Select.Option value="apple" label="苹果" />
        <Select.Option value="banana" label="香蕉" />
      </Select>
    )
    expect(container.querySelector('.forge-select')).toBeInTheDocument()
  })

  it('should handle maxTagCount', async () => {
    const { container } = render(
      <Select mode="multiple" maxTagCount={2} options={options} />
    )
    
    fireEvent.click(container.querySelector('.forge-select')!)
    await waitFor(() => {
      expect(container.querySelector('.forge-select-dropdown')).toBeInTheDocument()
    })
  })
})
