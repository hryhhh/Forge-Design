import React, { useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { DatePickerProps } from './types'
import './_style.scss'

// 工具函数
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return format
    .replace('YYYY', String(year))
    .replace('YY', String(year).slice(-2))
    .replace('MM', String(month).padStart(2, '0'))
    .replace('DD', String(day).padStart(2, '0'))
    .replace('HH', String(hour).padStart(2, '0'))
    .replace('mm', String(minute).padStart(2, '0'))
    .replace('ss', String(second).padStart(2, '0'))
}

// 日历面板子组件
const CalendarPanel: React.FC<{
  value: Date
  onChange: (date: Date) => void
  disabledDate?: (current: Date) => boolean
}> = ({ value, onChange, disabledDate }) => {
  const [viewDate, setViewDate] = useState(value)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDay = firstDay.getDay()

  const days: (Date | null)[] = []
  for (let i = 0; i < startingDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i))
  }

  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1))
  }

  const handleDayClick = (date: Date) => {
    if (disabledDate?.(date)) return
    onChange(date)
  }

  const isDisabled = (date: Date) => disabledDate?.(date) ?? false

  const isSelected = (date: Date) =>
    date.getDate() === value.getDate() &&
    date.getMonth() === value.getMonth() &&
    date.getFullYear() === value.getFullYear()

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="forge-datepicker-panel">
      <div className="forge-datepicker-header">
        <button className="forge-datepicker-prev" onClick={prevMonth}>
          &lt;
        </button>
        <span className="forge-datepicker-month">
          {year}年{month + 1}月
        </span>
        <button className="forge-datepicker-next" onClick={nextMonth}>
          &gt;
        </button>
      </div>
      <div className="forge-datepicker-weekdays">
        {WEEKDAYS.map(d => (
          <div key={d} className="forge-datepicker-weekday">
            {d}
          </div>
        ))}
      </div>
      <div className="forge-datepicker-days">
        {days.map((day, index) => (
          <div
            key={index}
            className={classNames('forge-datepicker-day', {
              'forge-datepicker-day-disabled': day && isDisabled(day),
              'forge-datepicker-day-selected': day && isSelected(day),
              'forge-datepicker-day-today': day && isToday(day),
            })}
            onClick={() => day && handleDayClick(day)}
          >
            {day?.getDate()}
          </div>
        ))}
      </div>
    </div>
  )
}

const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    value,
    defaultValue,
    className,
    style,
    disabled = false,
    size = 'default',
    placeholder = '请选择日期',
    format = 'YYYY-MM-DD',
    showTime = false,
    allowClear = false,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    name,
    id,
    disabledDate,
    onChange,
    onFocus,
    onBlur,
    onClick,
  } = props

  const [internalValue, setInternalValue] = useState<Date | null>(
    defaultValue ?? null
  )
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const ignoreNextBlurRef = useRef(false)

  const currentValue = value ?? internalValue
  const dateString = currentValue ? formatDate(currentValue, format) : ''

  const isControlled = value !== undefined

  const handleChange = useCallback(
    (date: Date) => {
      const dateStr = formatDate(date, format)
      if (!isControlled) {
        setInternalValue(date)
      }
      onChange?.(date, dateStr)
      setOpen(false)
    },
    [isControlled, onChange, format]
  )

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setOpen(true)
      onFocus?.(e)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setTimeout(() => {
        if (
          !ignoreNextBlurRef.current &&
          !containerRef.current?.contains(document.activeElement)
        ) {
          setOpen(false)
        }
        ignoreNextBlurRef.current = false
      }, 0)
      onBlur?.(e)
    },
    [onBlur]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isControlled) {
        setInternalValue(null)
      }
      onChange?.(null, '')
    },
    [isControlled, onChange]
  )

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sizeClass =
    size === 'large'
      ? 'forge-datepicker--large'
      : size === 'small'
        ? 'forge-datepicker--small'
        : ''

  return (
    <div
      ref={containerRef}
      className={classNames('forge-datepicker', className, sizeClass, {
        'forge-datepicker--disabled': disabled,
        'forge-datepicker--open': open,
      })}
      style={style}
      onMouseDown={e => {
        if (containerRef.current?.contains(e.target as Node)) {
          ignoreNextBlurRef.current = true
        }
      }}
    >
      {addonBefore && (
        <span className="forge-datepicker-addon">{addonBefore}</span>
      )}
      <div className="forge-datepicker-wrapper">
        {prefix && <span className="forge-datepicker-prefix">{prefix}</span>}
        <input
          ref={inputRef}
          type="text"
          className="forge-datepicker-input"
          value={dateString}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={!showTime}
          name={name}
          id={id}
          onClick={e => onClick?.(e)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {suffix && <span className="forge-datepicker-suffix">{suffix}</span>}
        {!suffix && (
          <span className="forge-datepicker-suffix">
            <svg
              className="forge-datepicker-icon"
              viewBox="0 0 1024 1024"
              width="14"
              height="14"
            >
              <path d="M928 160H768v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H288v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136V492h752v300z" />
            </svg>
          </span>
        )}
        {allowClear && currentValue && (
          <span className="forge-datepicker-clear" onClick={handleClear}>
            ×
          </span>
        )}
      </div>
      {open && (
        <div className="forge-datepicker-dropdown">
          <CalendarPanel
            value={currentValue ?? new Date()}
            onChange={handleChange}
            disabledDate={disabledDate}
          />
        </div>
      )}
      {addonAfter && (
        <span className="forge-datepicker-addon">{addonAfter}</span>
      )}
    </div>
  )
}

export default DatePicker
