import React, { useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { InputProps, InputGroupProps, InputAddOnProps } from './types'
import './_style.scss'

// TextArea 子组件
const TextAreaInner: React.FC<{
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  onPressEnter?: (e: React.KeyboardEvent) => void
  readOnly?: boolean
  autoFocus?: boolean
  maxLength?: number
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  className?: string
  style?: React.CSSProperties
  rows?: number
}> = props => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [height, setHeight] = useState<string>('auto')

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const adjustHeight = () => {
      if (!props.autoSize) {
        setHeight('auto')
        return
      }
      const { minRows = 1, maxRows = Infinity } =
        (props.autoSize as { minRows?: number; maxRows?: number }) || {}
      const style = window.getComputedStyle(textarea)
      const padding =
        parseInt(style.paddingTop) + parseInt(style.paddingBottom)
      const border =
        parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)
      const effectiveRows = props.rows || minRows
      const rowHeight =
        (textarea.scrollHeight - padding - border) / Math.max(1, effectiveRows)
      const minHeight = rowHeight * minRows + padding + border
      const maxHeight = rowHeight * maxRows + padding + border
      const newHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight
      )
      setHeight(`${newHeight}px`)
    }

    adjustHeight()
    textarea.addEventListener('input', adjustHeight)
    return () => textarea.removeEventListener('input', adjustHeight)
  }, [props.autoSize, props.rows])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange?.(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      props.onPressEnter?.(e)
    }
  }

  return (
    <textarea
      ref={textareaRef}
      className={classNames('forge-input forge-textarea', props.className)}
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      disabled={props.disabled}
      readOnly={props.readOnly}
      autoFocus={props.autoFocus}
      maxLength={props.maxLength}
      rows={props.rows || 1}
      style={{ ...props.style, resize: 'none', height }}
      onChange={handleChange}
      onBlur={() => props.onBlur?.()}
      onFocus={() => props.onFocus?.()}
      onKeyDown={handleKeyDown}
    />
  )
}

// Group 子组件
const InputGroupInner: React.FC<InputGroupProps> = props => {
  const {
    children,
    size = 'middle',
    className,
    style,
    addonBefore,
    addonAfter,
  } = props

  const groupClasses = classNames('forge-input-group', className, {
    [`forge-input-group--${size}`]: size,
  })

  const childArray = React.Children.toArray(children)
  const hasAddon = !!addonBefore || !!addonAfter

  return (
    <div className={groupClasses} style={style}>
      {addonBefore && (
        <span className="forge-input-group-addon forge-input-group-addon-before">
          {addonBefore}
        </span>
      )}
      <div className="forge-input-group-wrapper">
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) return child
          const isLast = index === childArray.length - 1
          return React.cloneElement(child as React.ReactElement<any>, {
            ...(child.props as object),
            className: classNames(((child as React.ReactElement<any>).props.className || ''), {
              'forge-input-group-first': !hasAddon && index === 0,
              'forge-input-group-last': !hasAddon && isLast,
              'forge-input-group-middle':
                !hasAddon && index > 0 && !isLast,
            }),
          })
        })}
      </div>
      {addonAfter && (
        <span className="forge-input-group-addon forge-input-group-addon-after">
          {addonAfter}
        </span>
      )}
    </div>
  )
}

// AddOn 子组件
const InputAddOnInner: React.FC<InputAddOnProps> = props => {
  const { children, type = 'before', className, style } = props
  return (
    <span
      className={classNames(
        'forge-input-add-on',
        `forge-input-add-on--${type}`,
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}

// 主 Input 组件
const Input: React.FC<InputProps> & {
  TextArea: React.FC<any>
  Group: React.FC<InputGroupProps>
  AddOn: React.FC<InputAddOnProps>
} = props => {
  const {
    value,
    defaultValue = '',
    placeholder,
    disabled = false,
    size = 'middle',
    type = 'text',
    prefix,
    suffix,
    allowClear = false,
    maxLength,
    minLength,
    readOnly = false,
    autoFocus = false,
    className,
    style,
    name,
    id,
    onChange,
    onBlur,
    onFocus,
    onPressEnter,
    onClear,
  } = props

  const [internalValue, setInternalValue] = useState<string>(defaultValue)
  const [focused, setFocused] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const hasValue = currentValue !== '' && currentValue !== undefined

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue, e)
    },
    [isControlled, onChange]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur?.(e)
    },
    [onBlur]
  )

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus?.(e)
    },
    [onFocus]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onPressEnter?.(e)
      }
    },
    [onPressEnter]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const newValue = ''
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
      onClear?.()
      inputRef.current?.focus()
    },
    [isControlled, onChange, onClear]
  )

  const showClear = allowClear && hasValue && !disabled && !readOnly

  const inputClasses = classNames('forge-input', className, {
    [`forge-input--${size}`]: size,
    'forge-input--disabled': disabled,
    'forge-input--focused': focused,
    'forge-input--with-prefix': !!prefix,
    'forge-input--with-suffix': !!suffix || showClear,
    'forge-input--password': type === 'password',
  })

  return (
    <div
      className={classNames('forge-input-wrapper', {
        'forge-input-wrapper--disabled': disabled,
      })}
      style={style}
    >
      {prefix && <span className="forge-input-prefix">{prefix}</span>}
      <div className="forge-input-affix-wrapper">
        <input
          ref={inputRef}
          type={type === 'password' ? (focused ? 'text' : 'password') : type}
          className={inputClasses}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          id={id}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        {suffix && <span className="forge-input-suffix">{suffix}</span>}
        {showClear && (
          <span
            className="forge-input-clear"
            onClick={handleClear}
            role="button"
            aria-label="clear"
          >
            <svg viewBox="0 0 1024 1024" width="12" height="12">
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m121.8 358.8L535.6 512l98.2 98.2c4.7 4.7 4.7 12.3 0 17l-17 17c-4.7 4.7-12.3 4.7-17 0L501.8 546l-98.2 98.2c-4.7 4.7-12.3 4.7-17 0l-17-17c-4.7-4.7-4.7-12.3 0-17l98.2-98.2-98.2-98.2c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 12.3-4.7 17 0l98.2 98.2 98.2-98.2c4.7-4.7 12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17z"
                fill="currentColor"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  )
}

// Attach sub-components
Input.TextArea = TextAreaInner
Input.Group = InputGroupInner
Input.AddOn = InputAddOnInner

export default Input
