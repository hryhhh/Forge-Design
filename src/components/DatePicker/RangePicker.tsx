import React, { useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { RangePickerProps, RangePickerPlaceholder } from './types'
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

interface CalendarPanelProps {
  date: Date
  onChange: (date: Date) => void
  disabledDate?: (current: Date) => boolean
  startDate?: Date | null
  endDate?: Date | null
  side: 'left' | 'right'
  hoverDate?: Date | null
  onHover?: (date: Date | null) => void
  minDate?: Date | null
  view?: PanelView
  onSwitchView?: (view: PanelView) => void
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({
  date,
  onChange,
  disabledDate,
  startDate,
  endDate,
  side,
  hoverDate,
  onHover,
  minDate,
  view = 'date',
  onSwitchView,
}) => {
  const year = date.getFullYear()
  const month = date.getMonth()

  // 月份选择视图
  const MonthView = () => (
    <div className="forge-datepicker-months">
      {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map((m, i) => {
        const isSelected = year === date.getFullYear() && i === month
        const isDisabled = minDate && i < minDate.getMonth() && year === minDate.getFullYear()
        return (
          <div
            key={m}
            className={classNames('forge-datepicker-month-item', {
              'forge-datepicker-month-item-selected': isSelected,
              'forge-datepicker-month-item-disabled': isDisabled,
            })}
            onClick={() => !isDisabled && onChange(new Date(year, i, 1))}
          >
            {m}
          </div>
        )
      })}
    </div>
  )

  // 年份选择视图
  const YearView = () => {
    const startYear = Math.floor(year / 12) * 12
    const years = Array.from({ length: 12 }, (_, i) => startYear + i)
    return (
      <div className="forge-datepicker-years">
        {years.map(y => {
          const isSelected = y === year
          const isDisabled = minDate && y < minDate.getFullYear()
          return (
            <div
              key={y}
              className={classNames('forge-datepicker-year-item', {
                'forge-datepicker-year-item-selected': isSelected,
                'forge-datepicker-year-item-disabled': isDisabled,
              })}
              onClick={() => !isDisabled && onChange(new Date(y, month, 1))}
            >
              {y}年
            </div>
          )
        })}
      </div>
    )
  }

  // 日期网格
  const days: (Date | null)[] = []
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDay = firstDay.getDay()
  for (let i = 0; i < startingDay; i++) days.push(null)
  for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i))

  const isDisabled = (d: Date) => disabledDate?.(d) ?? false
  const isSelected = (d: Date) => {
    if (startDate && d.toDateString() === startDate.toDateString()) return true
    if (endDate && d.toDateString() === endDate.toDateString()) return true
    return false
  }

  const getRangeStart = (): Date | null => {
    if (hoverDate && side === 'right' && startDate && !endDate) return startDate
    if (!startDate || !endDate) return null
    return startDate.getTime() <= endDate.getTime() ? startDate : endDate
  }

  const getRangeEnd = (): Date | null => {
    if (hoverDate && side === 'right' && startDate && !endDate) return hoverDate
    if (!startDate || !endDate) return null
    return startDate.getTime() <= endDate.getTime() ? endDate : startDate
  }

  const rangeStart = getRangeStart()
  const rangeEnd = getRangeEnd()
  const isInRange = (d: Date) => {
    if (!rangeStart || !rangeEnd) return false
    const t = d.getTime()
    return t > rangeStart.getTime() && t < rangeEnd.getTime()
  }
  const isRangeStart = (d: Date) => rangeStart?.toDateString() === d.toDateString()
  const isRangeEnd = (d: Date) => rangeEnd?.toDateString() === d.toDateString()
  const isToday = (d: Date) => {
    const today = new Date()
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  }

  const prevMonth = () => onChange(new Date(year, month - 1, 1))
  const nextMonth = () => onChange(new Date(year, month + 1, 1))
  const prevYear = () => onChange(new Date(year - 1, month, 1))
  const nextYear = () => onChange(new Date(year + 1, month, 1))

  const canGoPrevMonth = () => {
    if (side !== 'right' || !minDate) return true
    const prev = new Date(year, month - 1, 1)
    return prev.getTime() >= minDate.getTime()
  }

  if (view === 'month') {
    return (
      <div className="forge-range-picker-panel">
        <div className="forge-datepicker-header">
          <button className="forge-datepicker-prev" onClick={prevYear}>&lt;&lt;</button>
          <span className="forge-datepicker-month">{year}年</span>
          <button className="forge-datepicker-next" onClick={nextYear}>&gt;&gt;</button>
        </div>
        <MonthView />
        <div className="forge-datepicker-month-view-footer">
          <button className="forge-datepicker-back-btn" onClick={() => onSwitchView?.('date')}>
            返回日期
          </button>
        </div>
      </div>
    )
  }

  if (view === 'year') {
    return (
      <div className="forge-range-picker-panel">
        <div className="forge-datepicker-header">
          <button className="forge-datepicker-prev" onClick={prevMonth}>&lt;</button>
          <span className="forge-datepicker-month">
            {Math.floor(year / 12) * 12} - {(Math.floor(year / 12) * 12) + 11}
          </span>
          <button className="forge-datepicker-next" onClick={nextMonth}>&gt;</button>
        </div>
        <YearView />
        <div className="forge-datepicker-month-view-footer">
          <button className="forge-datepicker-back-btn" onClick={() => onSwitchView?.('month')}>
            返回月份
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="forge-range-picker-panel">
      <div className="forge-datepicker-header">
        <button className="forge-datepicker-prev" onClick={prevYear} disabled={side === 'right' && year === minDate?.getFullYear() && month === minDate?.getMonth()}>&lt;&lt;</button>
        <button className="forge-datepicker-prev" onClick={prevMonth} disabled={!canGoPrevMonth()}>&lt;</button>
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
          const disabled = isDisabled(day)
          const selected = isSelected(day)
          const inRange = isInRange(day)
          const today = isToday(day)
          return (
            <div
              key={index}
              className={classNames('forge-datepicker-day', {
                'forge-datepicker-day-disabled': disabled,
                'forge-datepicker-day-selected': selected,
                'forge-datepicker-day-today': today && !selected,
                'forge-datepicker-day-in-range': inRange,
                'forge-datepicker-day-range-start': isRangeStart(day),
                'forge-datepicker-day-range-end': isRangeEnd(day),
              })}
              onClick={() => !disabled && onChange(day)}
              onMouseEnter={() => side === 'right' && startDate && !endDate && onHover?.(day)}
              onMouseLeave={() => side === 'right' && onHover?.(null)}
            >
              {day.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const RangePicker: React.FC<RangePickerProps> = props => {
  const {
    value,
    defaultValue,
    className,
    style,
    disabled = false,
    size = 'default',
    placeholder = ['开始日期', '结束日期'] as RangePickerPlaceholder,
    format = 'YYYY-MM-DD',
    allowClear = false,
    prefix,
    suffix,
    disabledDate,
    onChange,
    onFocus,
    onBlur,
    onClick,
  } = props

  const [internalStart, setInternalStart] = useState<Date | null>(defaultValue?.[0] ?? null)
  const [internalEnd, setInternalEnd] = useState<Date | null>(defaultValue?.[1] ?? null)
  const [open, setOpen] = useState(false)
  const [leftMonth, setLeftMonth] = useState(() => {
    const d = defaultValue?.[0] ?? new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [rightMonth, setRightMonth] = useState(() => {
    const d = defaultValue?.[0] ?? new Date()
    return new Date(d.getFullYear(), d.getMonth() + 1, 1)
  })
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [leftView, setLeftView] = useState<PanelView>('date')
  const [rightView, setRightView] = useState<PanelView>('date')
  const containerRef = useRef<HTMLDivElement>(null)
  const ignoreNextBlurRef = useRef(false)

  const startDate = value?.[0] ?? internalStart
  const endDate = value?.[1] ?? internalEnd
  const isControlled = value !== undefined

  const startStr = startDate ? formatDate(startDate, format) : ''
  const endStr = endDate ? formatDate(endDate, format) : ''

  const handleDateClick = useCallback(
    (date: Date, panelSide: 'left' | 'right') => {
      if (disabledDate?.(date)) return
      let newStart = startDate
      let newEnd = endDate
      let shouldClose = false

      if (panelSide === 'left') {
        newStart = date
        newEnd = null
        if (!isControlled) { setInternalStart(date); setInternalEnd(null) }
        setRightMonth(new Date(date.getFullYear(), date.getMonth() + 1, 1))
        setRightView('date')
      } else {
        if (!startDate) {
          newStart = date
          newEnd = null
          if (!isControlled) { setInternalStart(date); setInternalEnd(null) }
        } else if (date.getTime() < startDate.getTime()) {
          newStart = date
          newEnd = null
          if (!isControlled) { setInternalStart(date); setInternalEnd(null) }
        } else {
          newEnd = date
          if (!isControlled) setInternalEnd(date)
          shouldClose = true
        }
      }

      const startStr = newStart ? formatDate(newStart, format) : ''
      const endStr = newEnd ? formatDate(newEnd, format) : ''
      if (shouldClose) setOpen(false)
      onChange?.([newStart!, newEnd!] as [Date, Date], [startStr, endStr] as [string, string])
    },
    [startDate, endDate, isControlled, format, onChange, disabledDate]
  )

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => { setOpen(true); onFocus?.(e) }, [onFocus])
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!ignoreNextBlurRef.current && !containerRef.current?.contains(document.activeElement)) setOpen(false)
      ignoreNextBlurRef.current = false
    }, 0)
    onBlur?.(e)
  }, [onBlur])
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) { setInternalStart(null); setInternalEnd(null) }
    onChange?.(null, ['', ''] as [string, string])
  }, [isControlled, onChange])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (rightMonth.getTime() < leftMonth.getTime()) {
      setRightMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1))
    }
  }, [leftMonth])

  const sizeClass = size === 'large' ? 'forge-range-picker--large' : size === 'small' ? 'forge-range-picker--small' : ''

  // 快捷选项
  const shortcuts = [
    { label: '今日', value: [new Date(), new Date()] as [Date, Date] | null },
    { label: '近7日', value: (() => { const end = new Date(); const start = new Date(end.getTime() - 6 * 24 * 60 * 60 * 1000); return [start, end] as [Date, Date] })() },
    { label: '近30日', value: (() => { const end = new Date(); const start = new Date(end.getTime() - 29 * 24 * 60 * 60 * 1000); return [start, end] as [Date, Date] })() },
    { label: '本月', value: (() => { const now = new Date(); return [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)] as [Date, Date] })() },
  ]

  const handleShortcut = (dates: [Date, Date] | null) => {
    if (!dates) return
    if (!isControlled) {
      setInternalStart(dates[0])
      setInternalEnd(dates[1])
    }
    const s = formatDate(dates[0], format)
    const e = formatDate(dates[1], format)
    onChange?.(dates as [Date, Date], [s, e] as [string, string])
    setOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className={classNames('forge-range-picker', className, sizeClass, {
        'forge-range-picker--disabled': disabled,
        'forge-range-picker--open': open,
      })}
      style={style}
      onMouseDown={e => { if (containerRef.current?.contains(e.target as Node)) ignoreNextBlurRef.current = true }}
    >
      {prefix && <span className="forge-range-picker-prefix">{prefix}</span>}
      <div className="forge-range-picker-wrapper">
        <input type="text" className="forge-range-picker-input forge-range-picker-input-start" value={startStr} placeholder={placeholder[0]} disabled={disabled} readOnly onClick={e => onClick?.(e)} onFocus={handleFocus} onBlur={handleBlur} />
        <span className="forge-range-picker-separator">-</span>
        <input type="text" className="forge-range-picker-input forge-range-picker-input-end" value={endStr} placeholder={placeholder[1]} disabled={disabled} readOnly onClick={e => onClick?.(e)} onFocus={handleFocus} onBlur={handleBlur} />
        {suffix && <span className="forge-range-picker-suffix">{suffix}</span>}
        {!suffix && (
          <span className="forge-range-picker-suffix">
            <svg className="forge-datepicker-icon" viewBox="0 0 1024 1024" width="14" height="14">
              <path d="M928 160H768v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H288v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136V492h752v300z" />
            </svg>
          </span>
        )}
        {allowClear && startDate && (
          <span className="forge-datepicker-clear" onClick={handleClear}>×</span>
        )}
      </div>
      {open && (
        <div className="forge-range-picker-dropdown">
          <div className="forge-range-picker-panels">
            <CalendarPanel
              date={leftMonth}
              onChange={date => { setLeftMonth(date); handleDateClick(date, 'left') }}
              disabledDate={disabledDate}
              startDate={startDate}
              endDate={endDate}
              side="left"
              minDate={null}
              view={leftView}
              onSwitchView={setLeftView}
            />
            <CalendarPanel
              date={rightMonth}
              onChange={date => { setRightMonth(date); handleDateClick(date, 'right') }}
              disabledDate={disabledDate}
              startDate={startDate}
              endDate={endDate}
              side="right"
              hoverDate={hoverDate}
              onHover={setHoverDate}
              minDate={leftMonth}
              view={rightView}
              onSwitchView={setRightView}
            />
          </div>
          {/* 快捷选项 */}
          <div className="forge-range-picker-shortcuts">
            {shortcuts.map(s => (
              <button key={s.label} className="forge-range-picker-shortcut-btn" onClick={() => handleShortcut(s.value)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RangePicker
export { RangePicker }
export type { RangePickerProps, RangePickerSize, RangePickerPlaceholder } from './types'
