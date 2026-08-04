import React, { useState, useRef, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { CheckboxProps, CheckboxGroupProps, CheckboxOption } from './types'
import './_style.scss'

// CheckboxGroup 子组件
const CheckboxGroupInner: React.FC<CheckboxGroupProps> = props => {
  const {
    value,
    defaultValue,
    className,
    style,
    disabled = false,
    size = 'middle',
    direction = 'horizontal',
    options,
    optionType = 'default',
    children,
    name,
    readOnly = false,
    autoFocus = false,
    onChange,
    onFocus,
    onBlur,
  } = props

  const [internalValue, setInternalValue] = useState<(string | number)[]>(
    defaultValue ?? []
  )
  const containerRef = useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = useCallback(
    (
      newValue: string | number,
      checked: boolean,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      let newValueArray: (string | number)[]
      if (checked) {
        newValueArray = [...currentValue, newValue]
      } else {
        newValueArray = currentValue.filter(
          (v: string | number) => v !== newValue
        )
      }
      if (!isControlled) {
        setInternalValue(newValueArray)
      }
      onChange?.(newValueArray, e)
    },
    [isControlled, currentValue, onChange]
  )

  const handleFocus = useCallback(() => {
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    onBlur?.()
  }, [onBlur])

  // 解析 options
  const optionItems = useMemo(() => {
    if (options) return options
    const items: CheckboxOption[] = []
    if (children) {
      React.Children.forEach(children, (child: React.ReactNode) => {
        if (React.isValidElement(child)) {
          const childProps = child.props as {
            value?: string | number
            label?: React.ReactNode
            disabled?: boolean
          }
          const value = childProps.value
          if (value !== undefined) {
            items.push({
              value,
              label: childProps.label ?? value,
              disabled: childProps.disabled,
            })
          }
        }
      })
    }
    return items
  }, [options, children])

  const directionClass =
    direction === 'vertical' ? 'forge-checkbox-group--vertical' : ''
  const typeClass =
    optionType === 'button' ? 'forge-checkbox-group--button' : ''

  return (
    <div
      ref={containerRef}
      className={classNames(
        'forge-checkbox-group',
        className,
        directionClass,
        typeClass,
        { 'forge-checkbox-group--large': size === 'large' },
        { 'forge-checkbox-group--small': size === 'small' },
        { 'forge-checkbox-group--disabled': disabled }
      )}
      style={style}
      role="group"
      aria-disabled={disabled}
    >
      {optionItems.length > 0
        ? optionItems.map((item: CheckboxOption, index: number) => {
            const isChecked = currentValue.includes(item.value)
            const isDisabled = item.disabled || disabled
            return (
              <label
                key={item.value}
                className={classNames(
                  'forge-checkbox',
                  { 'forge-checkbox--large': size === 'large' },
                  { 'forge-checkbox--small': size === 'small' },
                  optionType === 'button' ? 'forge-checkbox-button' : '',
                  { 'forge-checkbox--disabled': isDisabled },
                  { 'forge-checkbox--checked': isChecked }
                )}
              >
                <input
                  type="checkbox"
                  className="forge-checkbox-input"
                  checked={isChecked}
                  disabled={isDisabled}
                  readOnly={readOnly}
                  autoFocus={autoFocus && index === 0}
                  name={name}
                  data-testid={String(item.value)}
                  onChange={e => handleChange(item.value, e.target.checked, e)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <span className="forge-checkbox-box" />
                <span className="forge-checkbox-label">
                  {item.label ?? item.value}
                </span>
              </label>
            )
          })
        : children}
    </div>
  )
}

// 主 Checkbox 组件
const Checkbox: React.FC<CheckboxProps> & {
  Group: React.FC<CheckboxGroupProps>
} = props => {
  const {
    checked,
    defaultChecked = false,
    className,
    style,
    disabled = false,
    size = 'middle',
    indeterminate = false,
    children,
    name,
    readOnly = false,
    autoFocus = false,
    onChange,
    onFocus,
    onBlur,
  } = props

  const [internalChecked, setInternalChecked] =
    useState<boolean>(defaultChecked)
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      onChange?.(newChecked, e)
    },
    [isControlled, onChange]
  )

  const sizeClass =
    size === 'large'
      ? 'forge-checkbox--large'
      : size === 'small'
        ? 'forge-checkbox--small'
        : ''

  return (
    <label
      className={classNames(
        'forge-checkbox',
        className,
        sizeClass,
        { 'forge-checkbox--disabled': disabled },
        { 'forge-checkbox--checked': isChecked },
        { 'forge-checkbox--indeterminate': indeterminate }
      )}
      style={style}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="forge-checkbox-input"
        checked={isChecked}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        name={name}
        onChange={handleChange}
        onFocus={e => onFocus?.(e)}
        onBlur={e => onBlur?.(e)}
      />
      <span className="forge-checkbox-box" />
      <span className="forge-checkbox-label">{children}</span>
    </label>
  )
}

// Attach sub-components
Checkbox.Group = CheckboxGroupInner

export default Checkbox
