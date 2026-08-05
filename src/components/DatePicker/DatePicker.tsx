import React, { useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { DatePickerProps } from './types'
import './_style.scss'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return format
    .replace('YYYY', String(year))
    .replace('YY', String(year).slice(-2))
    .replace('MM', String(month).padStart(2, '0'))
    .replace('DD', String(day).padStart(2, '0'))
}

type PanelView = 'date' | 'month' | 'year'

const CalendarPanel: React.FC<{
  value: Date
  onChange: (date: Date) => void
  disabledDate?: (current: Date) => boolean
  view?: PanelView
  onSwitchView?: (view: PanelView) => void
}> = ({ value, onChange, disabledDate, view = 'date', onSwitchView }) => {
  const [viewDate, setViewDate] = useState(value)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  // 月份选择视图
  const MonthView = () => (
    <div className="forge-datepicker-months">
      {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map((m, i) => (
        <div
          key={m}
          className={classNames('forge-datepicker-month-item', {
            'forge-datepicker-month-item-selected': i === month,
          })}
          onClick={() => setViewDate(new Date(year, i, 1))}
        >
          {m}
        </div>
      ))}
    </div>
  )

  // 年份选择视图
  const YearView = () => {
    const startYear = Math.floor(viewDate.getFullYear() / 12) * 12
    const years = Array.from({ length: 12 }, (_, i) => startYear + i)
    return (
      <div className="forge-datepicker-years">
        {years.map(y => (
          <div
            key={y}
            className={classNames('forge-datepicker-year-item', {
              'forge-datepicker-year-item-selected': y === year,
            })}
            onClick={() => setViewDate(new Date(y, month, 1))}
          >
            {y}年
          </div>
        ))}
      </div>
    )
  }

  // 日期网格
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDay = firstDay.getDay()
  const days: (Date | null)[] = []
  for (let i = 0; i < startingDay; i++) days.push(null)
  for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i))

  const isDisabled = (date: Date) => disabledDate?.(date) ?? false
  const isSelected = (date: Date) =>
    date.getDate() === value.getDate() &&
    date.getMonth() === value.getMonth() &&
    date.getFullYear() === value.getFullYear()
  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))
  const prevYear = () => setViewDate(new Date(year - 1, month, 1))
  const nextYear = () => setViewDate(new Date(year + 1, month, 1))

  if (view === 'month') {
    return (
      <div className="forge-datepicker-panel">
        <div className="forge-datepicker-header">
          <button className="forge-datepicker-prev" onClick={prevYear}>&lt;&lt;</button>
          <span className="forge-datepicker-month">{year}年</span>
          <button className="forge-datepicker-next" onClick={nextYear}>&gt;&gt;</button>
        </div>
        <MonthView />
        <div className="forge-datepicker-month-view-footer">
          <button className="forge-datepicker-back-btn" onClick={() => onSwitchView?.('date')}>返回日期</button>
        </div>
      </div>
    )
  }

  const startYear = Math.floor(viewDate.getFullYear() / 12) * 12;
  if (view === 'year') {
    return (
      <div className="forge-datepicker-panel">
        <div className="forge-datepicker-header">
          <button className="forge-datepicker-prev" onClick={prevMonth}>&lt;</button>
          <span className="forge-datepicker-month">{startYear} - {startYear + 11}</span>
          <button className="forge-datepicker-next" onClick={nextMonth}>&gt;</button>
        </div>
        <YearView />
        <div className="forge-datepicker-month-view-footer">
          <button className="forge-datepicker-back-btn" onClick={() => onSwitchView?.('month')}>返回月份</button>
        </div>
      </div>
    )
  }

  return (
    <div className="forge-datepicker-panel">
      <div className="forge-datepicker-header">
        <button className="forge-datepicker-prev" onClick={prevYear}>&lt;&lt;</button>
        <button className="forge-datepicker-prev" onClick={prevMonth}>&lt;</button>
        <span
          className="forge-datepicker-month"
          onClick={() => onSwitchView?.('month')}
          style={{ cursor: 'pointer' }}
        >
          {year}年{month + 1}月
        </span>
        <button className="forge-datepicker-next" onClick={nextMonth}>&gt;</button>
        <button className="forge-datepicker-next" onClick={nextYear}>&gt;&gt;</button>
      </div>
      <div className="forge-datepicker-weekdays">
        {WEEKDAYS.map(d => <div key={d} className="forge-datepicker-weekday">{d}</div>)}
      </div>
      <div className="forge-datepicker-days">
        {days.map((day, index) => {
          if (!day) return <div key={index} />
          return (
            <div
              key={index}
              className={classNames('forge-datepicker-day', {
                'forge-datepicker-day-disabled': isDisabled(day),
                'forge-datepicker-day-selected': isSelected(day),
                'forge-datepicker-day-today': isToday(day) && !isSelected(day),
              })}
              onClick={() => !isDisabled(day) && onChange(day)}
            >
              {day.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const shortcuts = [
  { label: '今日', value: () => new Date() },
  { label: '昨日', value: () => { const d = new Date(); d.setDate(d.getDate() - 1); return d } },
  { label: '近7日', value: () => { const d = new Date(); d.setDate(d.getDate() - 6); return d } },
]

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
    autoFocus = false,
  } = props

  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<PanelView>('date')
  const containerRef = useRef<HTMLDivElement>(null)
  const ignoreNextBlurRef = useRef(false)

  const currentValue = value ?? internalValue
  const dateString = currentValue ? formatDate(currentValue, format) : ''
  const isControlled = value !== undefined

  const handleChange = useCallback(
    (date: Date) => {
      const dateStr = formatDate(date, format)
      if (!isControlled) setInternalValue(date)
      onChange?.(date, dateStr)
      setOpen(false)
    },
    [isControlled, onChange, format]
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

  const sizeClass = size === 'large' ? 'forge-datepicker--large' : size === 'small' ? 'forge-datepicker--small' : ''

  return (
    <div
      ref={containerRef}
      className={classNames('forge-datepicker', className, sizeClass, {
        'forge-datepicker--disabled': disabled,
        'forge-datepicker--open': open,
      })}
      style={style}
      onMouseDown={e => { if (containerRef.current?.contains(e.target as Node)) ignoreNextBlurRef.current = true }}
    >
      {addonBefore && <span className="forge-datepicker-addon">{addonBefore}</span>}
      <div className="forge-datepicker-wrapper">
        {prefix && <span className="forge-datepicker-prefix">{prefix}</span>}
        <input
          type="text"
          className="forge-datepicker-input"
          value={dateString}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          name={name}
          id={id}
          autoFocus={autoFocus}
          onClick={e => onClick?.(e)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {suffix && <span className="forge-datepicker-suffix">{suffix}</span>}
        {!suffix && (
          <span className="forge-datepicker-suffix">
            <svg className="forge-datepicker-icon" viewBox="0 0 1024 1024" width="14" height="14">
              <path d="M928 160H768v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H288v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136V492h752v300z" />
            </svg>
          </span>
        )}
        {allowClear && currentValue && (
          <span className="forge-datepicker-clear" onClick={handleClear}>×</span>
        )}
      </div>
      {open && (
        <div className="forge-datepicker-dropdown">
          <CalendarPanel
            value={currentValue ?? new Date()}
            onChange={handleChange}
            disabledDate={disabledDate}
            view={view}
            onSwitchView={setView}
          />
          {/* 快捷选项 */}
          <div className="forge-datepicker-shortcuts">
            {shortcuts.map(s => (
              <button key={s.label} className="forge-datepicker-shortcut-btn" onClick={() => handleShortcut(s.value())}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {addonAfter && <span className="forge-datepicker-addon">{addonAfter}</span>}
    </div>
  )
}

export default DatePicker
