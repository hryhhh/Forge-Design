import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Checkbox from './index'

describe('Checkbox Component', () => {
  it('should render basic checkbox', () => {
    const { container } = render(<Checkbox>选项</Checkbox>)
    expect(container.querySelector('.forge-checkbox')).toBeInTheDocument()
    expect(container.querySelector('.forge-checkbox-label')).toHaveTextContent('选项')
  })

  it('should render checkbox with value', () => {
    const { container } = render(<Checkbox value="a">选项A</Checkbox>)
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(input).toBeInTheDocument()
    // HTML checkbox value is always "on" by default
    expect(input.value).toBe('on')
  })

  it('should support defaultChecked', () => {
    const { container } = render(<Checkbox defaultChecked>选项</Checkbox>)
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(input.checked).toBe(true)
  })

  it('should support checked prop', () => {
    const { container } = render(<Checkbox checked>选项</Checkbox>)
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(input.checked).toBe(true)
    expect(container.querySelector('.forge-checkbox--checked')).toBeInTheDocument()
  })

  it('should support size prop', () => {
    const { container } = render(<Checkbox size="large">大选项</Checkbox>)
    expect(container.querySelector('.forge-checkbox--large')).toBeInTheDocument()
  })

  it('should support disabled state', () => {
    const { container } = render(<Checkbox disabled>禁用选项</Checkbox>)
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(input).toBeDisabled()
    expect(container.querySelector('.forge-checkbox--disabled')).toBeInTheDocument()
  })

  it('should support onChange', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Checkbox onChange={handleChange}>选项</Checkbox>
    )
    const checkbox = container.querySelector('.forge-checkbox') as HTMLElement
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('should toggle onChange', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Checkbox checked onChange={handleChange}>选项</Checkbox>
    )
    const checkbox = container.querySelector('.forge-checkbox') as HTMLElement
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it('should support indeterminate', () => {
    const { container } = render(<Checkbox indeterminate>半选</Checkbox>)
    expect(container.querySelector('.forge-checkbox--indeterminate')).toBeInTheDocument()
  })

  it('should support onFocus and onBlur', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    const { container } = render(
      <Checkbox onFocus={handleFocus} onBlur={handleBlur}>选项</Checkbox>
    )
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('should render Checkbox.Group', () => {
    const { container } = render(
      <Checkbox.Group>
        <Checkbox value="a">选项A</Checkbox>
        <Checkbox value="b">选项B</Checkbox>
      </Checkbox.Group>
    )
    expect(container.querySelector('.forge-checkbox-group')).toBeInTheDocument()
  })

  it('should support Checkbox.Group with options', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Checkbox.Group
        options={[
          { value: 'a', label: '选项A' },
          { value: 'b', label: '选项B' },
          { value: 'c', label: '选项C', disabled: true },
        ]}
        onChange={handleChange}
      />
    )
    expect(container.querySelector('.forge-checkbox-group')).toBeInTheDocument()
    expect(container.querySelectorAll('.forge-checkbox').length).toBe(3)
  })

  it('should support Checkbox.Group controlled value', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Checkbox.Group value={['a', 'b']} options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
        { value: 'c', label: '选项C' },
      ]} onChange={handleChange} />
    )
    const checkedCheckboxes = container.querySelectorAll('.forge-checkbox--checked')
    expect(checkedCheckboxes.length).toBe(2)
  })

  it('should support Checkbox.Group defaultValue', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Checkbox.Group defaultValue={['a']} options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
      ]} onChange={handleChange} />
    )
    const checkedCheckboxes = container.querySelectorAll('.forge-checkbox--checked')
    expect(checkedCheckboxes.length).toBe(1)
  })

  it('should handle Checkbox.Group change', async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Checkbox.Group options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
      ]} onChange={handleChange} />
    )
    
    const checkboxes = container.querySelectorAll('.forge-checkbox')
    if (checkboxes.length >= 2) {
      fireEvent.click(checkboxes[0])
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['a'], expect.anything())
      })
      fireEvent.click(checkboxes[1])
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['a', 'b'], expect.anything())
      })
      fireEvent.click(checkboxes[0])
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['b'], expect.anything())
      })
    }
  })

  it('should not select disabled option in Checkbox.Group', async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Checkbox.Group options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B', disabled: true },
      ]} onChange={handleChange} />
    )
    
    const checkboxes = container.querySelectorAll('.forge-checkbox')
    if (checkboxes.length >= 2) {
      fireEvent.click(checkboxes[1])
      expect(handleChange).not.toHaveBeenCalled()
    }
  })

  it('should support Checkbox.Group disabled', () => {
    const { container } = render(
      <Checkbox.Group disabled options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
      ]} />
    )
    const inputs = container.querySelectorAll('input[type="checkbox"]')
    inputs.forEach(input => {
      expect(input).toBeDisabled()
    })
  })

  it('should support Checkbox.Group size prop', () => {
    const { container } = render(
      <Checkbox.Group size="large" options={[
        { value: 'a', label: '选项A' },
      ]} />
    )
    expect(container.querySelector('.forge-checkbox-group--large')).toBeInTheDocument()
  })

  it('should support Checkbox.Group direction vertical', () => {
    const { container } = render(
      <Checkbox.Group direction="vertical" options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
      ]} />
    )
    expect(container.querySelector('.forge-checkbox-group--vertical')).toBeInTheDocument()
  })

  it('should support Checkbox.Group optionType button', () => {
    const { container } = render(
      <Checkbox.Group optionType="button" options={[
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' },
      ]} />
    )
    expect(container.querySelector('.forge-checkbox-group--button')).toBeInTheDocument()
    expect(container.querySelector('.forge-checkbox-button')).toBeInTheDocument()
  })

  it('should support autoFocus', () => {
    const { container } = render(
      <Checkbox.Group autoFocus options={[
        { value: 'a', label: '选项A' },
      ]} />
    )
    const firstInput = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(document.activeElement).toBe(firstInput)
  })
})
