import React, { useState, useRef, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { RadioProps, RadioGroupProps, RadioOption } from './types'
import './_style.scss'

// RadioGroup 子组件
const RadioGroupInner: React.FC<RadioGroupProps> = props => {
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
    bordered = true,
    children,
    name,
    readOnly = false,
    autoFocus = false,
    onChange,
    onFocus,
    onBlur,
  } = props

  const [internalValue, setInternalValue] = useState<string | number>(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = useCallback((newValue: string | number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue, e)
  }, [isControlled, onChange])

  const handleFocus = useCallback(() => {
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    onBlur?.()
  }, [onBlur])

  // 解析 options
  const optionItems = useMemo<RadioOption[]>(() => {
    if (options) return options
    const items: RadioOption[] = []
    if (children) {
      React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
          items.push({
            value: child.props.value,
            label: child.props.label ?? child.props.value,
            disabled: child.props.disabled,
            autoFocus: child.props.autoFocus,
          })
        }
      })
    }
    return items
  }, [options, children])

  const directionClass = direction === 'vertical' ? 'forge-radio-group--vertical' : ''
  const typeClass = optionType === 'button' ? 'forge-radio-group--button' : ''

  return (
    <div
      ref={containerRef}
      className={classNames(
        'forge-radio-group',
        className,
        directionClass,
        typeClass,
        { 'forge-radio-group--large': size === 'large' },
        { 'forge-radio-group--small': size === 'small' },
        { 'forge-radio-group--disabled': disabled }
      )}
      style={style}
      role="radiogroup"
      aria-disabled={disabled}
    >
      {optionItems.length > 0 ? (
        optionItems.map((item, index) => {
          const isChecked = currentValue === item.value
          const isDisabled = item.disabled || disabled
          return (
            <label
              key={index}
              className={classNames(
                'forge-radio',
                { 'forge-radio--large': size === 'large' },
                { 'forge-radio--small': size === 'small' },
                optionType === 'button' ? 'forge-radio-button' : '',
                { 'forge-radio--disabled': isDisabled },
                { 'forge-radio--checked': isChecked },
                { 'forge-radio--bordered': bordered !== false }
              )}
            >
              <input
                type="radio"
                className="forge-radio-input"
                value={String(item.value)}
                checked={isChecked}
                disabled={isDisabled}
                readOnly={readOnly}
                autoFocus={autoFocus && index === 0}
                name={name}
                onChange={(e) => handleChange(item.value, e)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <span className="forge-radio-dot" />
              <span className="forge-radio-label">{item.label ?? item.value}</span>
            </label>
          )
        })
      ) : (
        children
      )}
    </div>
  )
}

// 主 Radio 组件
const Radio: React.FC<RadioProps> = props => {
  const {
    value,
    defaultValue,
    className,
    style,
    disabled = false,
    size = 'middle',
    children,
    name,
    onChange,
    onFocus,
    onBlur,
  } = props

  const [internalValue, setInternalValue] = useState<string | number>(defaultValue)
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(e, newValue)
  }, [isControlled, onChange])

  const sizeClass = size === 'large' ? 'forge-radio--large' : size === 'small' ? 'forge-radio--small' : ''

  return (
    <label
      className={classNames(
        'forge-radio',
        className,
        sizeClass,
        { 'forge-radio--disabled': disabled },
        { 'forge-radio--checked': currentValue !== undefined && currentValue !== '' }
      )}
      style={style}
    >
      <input
        ref={inputRef}
        type="radio"
        className="forge-radio-input"
        value={String(currentValue ?? '')}
        checked={!!currentValue}
        disabled={disabled}
        onChange={handleChange}
        onFocus={() => onFocus?.()}
        onBlur={() => onBlur?.()}
        name={name}
      />
      <span className="forge-radio-dot" />
      <span className="forge-radio-label">{children}</span>
    </label>
  )
}

// Attach sub-components
Radio.Group = RadioGroupInner

export default Radio
