import React, { useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { TimePickerProps } from './types'
import './_style.scss'

// 时间选择面板子组件
const TimePanel: React.FC<{
  value: Date
  onChange: (date: Date) => void
  format: string
  minuteStep: number
  secondStep: number
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
}> = ({
  value,
  onChange,
  format,
  minuteStep = 1,
  secondStep = 1,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
}) => {
  const [viewHour, setViewHour] = useState(value.getHours())
  const [viewMinute, setViewMinute] = useState(value.getMinutes())
  const [viewSecond, setViewSecond] = useState(value.getSeconds())

  const showSecond = format.includes('ss')
  const showMinute = format.includes('mm') || showSecond

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i).filter(m => m % minuteStep === 0)
  const seconds = Array.from({ length: 60 }, (_, i) => i).filter(s => s % secondStep === 0)

  const isHourDisabled = (hour: number) => disabledHours?.().includes(hour) ?? false
  const isMinuteDisabled = (minute: number) => disabledMinutes?.(viewHour)?.includes(minute) ?? false
  const isSecondDisabled = (second: number) => disabledSeconds?.(viewHour, viewMinute)?.includes(second) ?? false

  const handleHourChange = (hour: number) => {
    setViewHour(hour)
    const newDate = new Date(value)
    newDate.setHours(hour)
    onChange(newDate)
  }

  const handleMinuteChange = (minute: number) => {
    setViewMinute(minute)
    const newDate = new Date(value)
    newDate.setMinutes(minute)
    onChange(newDate)
  }

  const handleSecondChange = (second: number) => {
    setViewSecond(second)
    const newDate = new Date(value)
    newDate.setSeconds(second)
    onChange(newDate)
  }

  const Column = ({
    items,
    selected,
    disabled,
    onChange,
    label,
  }: {
    items: number[]
    selected: number
    disabled?: (item: number) => boolean
    onChange: (item: number) => void
    label: string
  }) => (
    <div className="forge-timepicker-column">
      <div className="forge-timepicker-column-title">{label}</div>
      <div className="forge-timepicker-column-list">
        {items.map(item => {
          const isDisabled = disabled?.(item)
          return (
            <div
              key={item}
              className={classNames('forge-timepicker-column-item', {
                'forge-timepicker-column-item-disabled': isDisabled,
                'forge-timepicker-column-item-active': item === selected,
              })}
              onClick={() => !isDisabled && onChange(item)}
            >
              {String(item).padStart(2, '0')}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="forge-timepicker-panel">
      {showMinute && (
        <>
          <Column
            items={hours}
            selected={viewHour}
            disabled={isHourDisabled}
            onChange={handleHourChange}
            label="时"
          />
          <span className="forge-timepicker-separator">:</span>
          <Column
            items={minutes}
            selected={viewMinute}
            disabled={isMinuteDisabled}
            onChange={handleMinuteChange}
            label="分"
          />
        </>
      )}
      {showSecond && (
        <>
          {!showMinute && <span className="forge-timepicker-separator">:</span>}
          <Column
            items={seconds}
            selected={viewSecond}
            disabled={isSecondDisabled}
            onChange={handleSecondChange}
            label="秒"
          />
        </>
      )}
    </div>
  )
}

const shortcuts = [
  { label: '现在', value: () => new Date() },
  { label: '上午', value: () => { const d = new Date(); d.setHours(9, 0, 0); return d } },
  { label: '下午', value: () => { const d = new Date(); d.setHours(14, 0, 0); return d } },
]

const TimePicker: React.FC<TimePickerProps> = props => {
  const {
    value,
    defaultValue,
    className,
    style,
    disabled = false,
    size = 'default',
    placeholder = '请选择时间',
    format = 'HH:mm:ss',
    
    minuteStep = 1,
    secondStep = 1,
    allowClear = false,
    prefix,
    suffix,
    name,
    id,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    onChange,
    onFocus,
    onBlur,
    onClick,
    autoFocus = false,
  } = props

  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const ignoreNextBlurRef = useRef(false)

  const currentValue = value ?? internalValue
  const timeString = currentValue ? currentValue.toLocaleTimeString('zh-CN', { hour12: false }) : ''
  const isControlled = value !== undefined

  const handleChange = useCallback(
    (date: Date) => {
      const timeStr = date.toLocaleTimeString('zh-CN', { hour12: false })
      if (!isControlled) setInternalValue(date)
      onChange?.(date, timeStr)
      setOpen(false)
    },
    [isControlled, onChange]
  )

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => { setOpen(true); onFocus?.(e) },
    [onFocus]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setTimeout(() => {
        if (!ignoreNextBlurRef.current && !containerRef.current?.contains(document.activeElement)) setOpen(false)
        ignoreNextBlurRef.current = false
      }, 0)
      onBlur?.(e)
    },
    [onBlur]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isControlled) setInternalValue(null)
      onChange?.(null, '')
    },
    [isControlled, onChange]
  )

  const handleShortcut = (date: Date) => {
    handleChange(date)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sizeClass = size === 'large' ? 'forge-timepicker--large' : size === 'small' ? 'forge-timepicker--small' : ''

  return (
    <div
      ref={containerRef}
      className={classNames('forge-timepicker', className, sizeClass, {
        'forge-timepicker--disabled': disabled,
        'forge-timepicker--open': open,
      })}
      style={style}
      onMouseDown={e => { if (containerRef.current?.contains(e.target as Node)) ignoreNextBlurRef.current = true }}
    >
      <div className="forge-timepicker-wrapper">
        {prefix && <span className="forge-timepicker-prefix">{prefix}</span>}
        <input
          type="text"
          className="forge-timepicker-input"
          value={timeString}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          name={name}
          id={id}
          autoFocus={autoFocus}
          onClick={e => { if (!disabled) { setOpen(true); onClick?.(e) } }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {suffix && <span className="forge-timepicker-suffix">{suffix}</span>}
        {!suffix && (
          <span className="forge-timepicker-suffix">
            <svg className="forge-timepicker-icon" viewBox="0 0 1024 1024" width="14" height="14">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              <path d="M512 124c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm0 700c-181.1 0-328-146.9-328-328s146.9-328 328-328 328 146.9 328 328-146.9 328-328 328z" />
              <path d="M512 260c-139.8 0-252 112.2-252 252s112.2 252 252 252 252-112.2 252-252-112.2-252-252-252zm0 440c-103.8 0-188-84.2-188-188s84.2-188 188-188 188 84.2 188 188-84.2 188-188 188z" />
            </svg>
          </span>
        )}
        {allowClear && currentValue && (
          <span className="forge-timepicker-clear" onClick={handleClear}>×</span>
        )}
      </div>
      {open && (
        <div className="forge-timepicker-dropdown">
          <TimePanel
            value={currentValue ?? new Date()}
            onChange={handleChange}
            format={format}
            minuteStep={minuteStep}
            secondStep={secondStep}
            disabledHours={disabledHours}
            disabledMinutes={disabledMinutes}
            disabledSeconds={disabledSeconds}
          />
          {/* 快捷选项 */}
          <div className="forge-timepicker-shortcuts">
            {shortcuts.map(s => (
              <button key={s.label} className="forge-timepicker-shortcut-btn" onClick={() => handleShortcut(s.value())}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimePicker
