import React, { useState, useRef, useCallback } from 'react'
import classNames from 'classnames'
import { SwitchProps } from './types'
import './_style.scss'

const Switch: React.FC<SwitchProps> = props => {
  const {
    checked,
    defaultChecked = false,
    className,
    style,
    disabled = false,
    size = 'default',
    loading = false,
    beforeChange,
    checkedChildren,
    unCheckedChildren,
    checkedColor,
    name,
    readOnly = false,
    autoFocus = false,
    checkedIcon,
    unCheckedIcon,
    onChange,
    onFocus,
    onBlur,
  } = props

  const [internalChecked, setInternalChecked] =
    useState<boolean>(defaultChecked)
  const inputRef = useRef<HTMLInputElement>(null)
  const [loadingState, setLoadingState] = useState(false)

  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  const handleToggle = useCallback(
    async (e: React.MouseEvent<HTMLSpanElement>) => {
      if (disabled || readOnly || loadingState) return

      let nextChecked: boolean
      if (isControlled) {
        nextChecked = !isChecked
      } else {
        nextChecked = !internalChecked
      }

      if (beforeChange) {
        setLoadingState(true)
        try {
          const result = beforeChange()
          if (result instanceof Promise) {
            const allowed = await result
            if (!allowed) return
          } else if (result === false) {
            return
          }
        } finally {
          setLoadingState(false)
        }
      }

      if (!isControlled) {
        setInternalChecked(nextChecked)
      }
      onChange?.(nextChecked, e as any)
    },
    [
      disabled,
      readOnly,
      loadingState,
      isControlled,
      isChecked,
      internalChecked,
      beforeChange,
      onChange,
    ]
  )

  const sizeClass =
    size === 'large'
      ? 'forge-switch--large'
      : size === 'small'
        ? 'forge-switch--small'
        : ''

  return (
    <span
      className={classNames(
        'forge-switch',
        className,
        sizeClass,
        { 'forge-switch--disabled': disabled },
        { 'forge-switch--checked': isChecked },
        { 'forge-switch--loading': loading || loadingState }
      )}
      style={
        {
          ...style,
          '--forge-switch-checked-color': checkedColor,
        } as React.CSSProperties
      }
      onClick={handleToggle}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="forge-switch-input"
        checked={isChecked}
        disabled={disabled || readOnly || loadingState}
        readOnly={readOnly}
        autoFocus={autoFocus}
        name={name}
        onChange={() => {}}
        onFocus={e => onFocus?.(e)}
        onBlur={e => onBlur?.(e)}
      />
      <span className="forge-switch-inner">
        {checkedChildren && isChecked ? (
          <span className="forge-switch-checked-content">
            {checkedChildren}
          </span>
        ) : null}
        {unCheckedChildren && !isChecked ? (
          <span className="forge-switch-unchecked-content">
            {unCheckedChildren}
          </span>
        ) : null}
        {checkedIcon && isChecked ? (
          <span className="forge-switch-icon">{checkedIcon}</span>
        ) : null}
        {!checkedIcon && !isChecked ? (
          <span className="forge-switch-icon">{unCheckedIcon}</span>
        ) : null}
      </span>
      <span className="forge-switch-handle" />
    </span>
  )
}

export default Switch
