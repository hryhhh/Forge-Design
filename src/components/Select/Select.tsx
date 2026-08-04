import React, { useState, useRef, useEffect, useCallback, useMemo, createContext, useContext } from 'react'
import classNames from 'classnames'
import { SelectProps, SelectOption, SelectOptionProps, SelectGroupProps } from './types'
import './_style.scss'

// 用于收集 Option 的 Context
const SelectContext = createContext<{
  addOption: (opt: SelectOption) => void
  options: SelectOption[]
}>({
  addOption: () => {},
  options: [],
})

// Option 子组件
const SelectOptionInner: React.FC<SelectOptionProps> = props => {
  const { addOption } = useContext(SelectContext)
  
  useEffect(() => {
    addOption({ 
      value: props.value, 
      label: props.label ?? String(props.value),
      disabled: props.disabled 
    })
  }, [props.value, props.label, props.disabled, addOption])
  
  return null
}

// Group 子组件 - 渲染到下拉菜单中
const SelectGroupInner: React.FC<SelectGroupProps> = props => {
  return (
    <div className="forge-select-group">
      <div className="forge-select-group-title">{props.label}</div>
      <div className="forge-select-group-options">{props.children}</div>
    </div>
  )
}

// 主 Select 组件
const Select: React.FC<SelectProps> & {
  Option: typeof SelectOptionInner
  Group: typeof SelectGroupInner
} = props => {
  const {
    value,
    defaultValue,
    placeholder = '请选择',
    disabled = false,
    size = 'middle',
    mode = 'default',
    showSearch = false,
    searchPlaceholder = '搜索',
    allowClear = false,
    showArrow = true,
    popupClassName,
    popupStyle,
    filterOption = true,
    optionFilterProp = 'value',
    options: externalOptions,
    showEmpty = true,
    notFoundContent = '暂无数据',
    autoFocus = false,
    loading = false,
    maxTagCount,
    labelInValue = false,
    suffixIcon,
    className,
    style,

    onChange,
    onSelect,
    onDeselect,
    onSearch,
    onClear,
    onFocus,
    onBlur,
    dropdownRender,
  } = props

  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [internalValue, setInternalValue] = useState<any>(defaultValue)
  const [focused, setFocused] = useState<boolean>(false)
  const [childOptions, setChildOptions] = useState<SelectOption[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 收集 Option 子组件
  const addOption = useCallback((opt: SelectOption) => {
    setChildOptions(prev => [...prev, opt])
  }, [])

  // 合并外部 options 和 children 中的 options
  const allOptions = useMemo<SelectOption[]>(() => {
    if (externalOptions && externalOptions.length > 0) {
      return externalOptions
    }
    return childOptions
  }, [externalOptions, childOptions])

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const isArrayValue = Array.isArray(currentValue)

  // 过滤后的 options
  const filteredOptions = useMemo<SelectOption[]>(() => {
    if (!showSearch || !searchValue.trim()) return allOptions
    return allOptions.filter(option => {
      if (typeof filterOption === 'function') {
        return filterOption(searchValue, option)
      }
      const propValue = String(option[optionFilterProp] ?? option.label ?? option.value).toLowerCase()
      return propValue.includes(searchValue.toLowerCase())
    })
  }, [allOptions, searchValue, showSearch, filterOption, optionFilterProp])

  // 获取选中的 label
  const selectedLabels = useMemo(() => {
    if (!currentValue) return []
    const values = isArrayValue ? currentValue : [currentValue]
    return values.map((val: any) => {
      const opt = allOptions.find((o: SelectOption) => o.value === val)
      return opt?.label ?? val
    })
  }, [currentValue, allOptions, isArrayValue])

  // 打开/关闭下拉
  const handleFocus = useCallback(() => {
    setFocused(true)
    if (!disabled) setOpen(true)
    onFocus?.()
  }, [disabled, onFocus])

  const handleBlur = useCallback(() => {
    setFocused(false)
    setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
        setOpen(false)
        setSearchValue('')
      }
    }, 150)
    onBlur?.()
  }, [onBlur])

  const handleClick = useCallback(() => {
    if (!disabled) {
      setOpen(prev => !prev)
      if (!open) {
        searchInputRef.current?.focus()
      }
    }
  }, [disabled, open])

  // 选择选项
  const handleSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return

    const { value: optValue } = option

    // 多选或标签模式
    if (mode === 'multiple' || mode === 'tags') {
      const currentVals = (isArrayValue ? currentValue : []) as (string | number)[]
      const newVals = currentVals.includes(optValue)
        ? currentVals.filter((v: any) => v !== optValue)
        : [...currentVals, optValue]

      const newValue = labelInValue
        ? newVals.map((v: any) => ({ value: v, label: allOptions.find((o: SelectOption) => o.value === v)?.label }))
        : newVals

      if (!isControlled) setInternalValue(newValue)
      onChange?.(newValue, option)
      if (!currentVals.includes(optValue)) {
        onSelect?.(optValue, option)
      } else {
        onDeselect?.(optValue, option)
      }
    } else {
      // 单选模式
      const newValue = labelInValue ? { value: optValue, label: option.label } : optValue
      if (!isControlled) setInternalValue(newValue)
      setOpen(false)
      setSearchValue('')
      onChange?.(newValue, option)
      onSelect?.(optValue, option)
    }
  }, [mode, isArrayValue, currentValue, isControlled, labelInValue, allOptions, onChange, onSelect, onDeselect])

  // 清除
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const emptyValue = mode === 'multiple' || mode === 'tags' ? [] : undefined
    if (!isControlled) setInternalValue(emptyValue)
    onChange?.(emptyValue, [])
    onClear?.()
  }, [mode, isControlled, onChange, onClear])

  // 删除 tag
  const handleRemoveTag = useCallback((e: React.MouseEvent, option: SelectOption) => {
    e.preventDefault()
    e.stopPropagation()
    handleSelect(option)
  }, [handleSelect])

  // 搜索
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchValue(val)
    onSearch?.(val)
    if (!open) setOpen(true)
  }, [onSearch, open])

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearchValue('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // autoFocus
  useEffect(() => {
    if (autoFocus && !disabled) {
      containerRef.current?.focus()
    }
  }, [autoFocus, disabled])

  // 渲染 tag
  const renderTag = (option: SelectOption) => {
    const { value: optValue, label, disabled: optDisabled } = option
    return (
      <span
        key={String(optValue)}
        className={classNames('forge-select-selection-item', {
          'forge-select-selection-item--disabled': optDisabled,
        })}
      >
        <span className="forge-select-selection-item-content">{label ?? optValue}</span>
        {!optDisabled && (mode === 'multiple' || mode === 'tags') && (
          <span
            className="forge-select-selection-item-remove"
            onClick={(e) => handleRemoveTag(e, option)}
          >
            <svg viewBox="0 0 1024 1024" width="10" height="10">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m121.8 358.8L535.6 512l98.2 98.2c4.7 4.7 4.7 12.3 0 17l-17 17c-4.7 4.7-12.3 4.7-17 0L501.8 546l-98.2 98.2c-4.7 4.7-12.3 4.7-17 0l-17-17c-4.7-4.7-4.7-12.3 0-17l98.2-98.2-98.2-98.2c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 12.3-4.7 17 0l98.2 98.2 98.2-98.2c4.7-4.7 12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17z" fill="currentColor"/>
            </svg>
          </span>
        )}
      </span>
    )
  }

  // 渲染选项
  const renderOption = (option: SelectOption, index: number) => {
    const { value: optValue, label, disabled: optDisabled } = option
    const selected = isArrayValue
      ? (currentValue as (string | number)[]).includes(optValue)
      : currentValue === optValue
    return (
      <div
        key={index}
        className={classNames('forge-select-item', {
          'forge-select-item--selected': selected,
          'forge-select-item--disabled': optDisabled,
          'forge-select-item--active': open && !optDisabled,
        })}
        onClick={() => !optDisabled && handleSelect(option)}
      >
        <span className="forge-select-item-content">{label ?? optValue}</span>
        {selected && (
          <span className="forge-select-item-checked">
            <svg viewBox="0 0 1024 1024" width="12" height="12">
              <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" fill="currentColor"/>
            </svg>
          </span>
        )}
      </div>
    )
  }

  // 渲染下拉内容
  const renderDropdownContent = () => {
    if (loading) {
      return <div className="forge-select-item forge-select-item--loading">加载中...</div>
    }
    if (filteredOptions.length === 0 && showEmpty) {
      return <div className="forge-select-item forge-select-item--empty">{notFoundContent}</div>
    }
    return filteredOptions.map((option: SelectOption, index: number) => renderOption(option, index))
  }

  const sizeClass = size === 'large' ? 'forge-select--large' : size === 'small' ? 'forge-select--small' : ''
  const itemHeight = size === 'large' ? '32px' : size === 'small' ? '24px' : '28px'

  // 判断是否需要显示清除按钮
  const showClearBtn = allowClear && !disabled && ((isArrayValue && (currentValue as any[]).length > 0) || (!isArrayValue && currentValue))

  return (
    <SelectContext.Provider value={{ addOption, options: allOptions }}>
      <div
        ref={containerRef}
        className={classNames(
          'forge-select',
          className,
          sizeClass,
          `forge-select--${mode}`,
          { 'forge-select--disabled': disabled },
          { 'forge-select--open': open },
          { 'forge-select--focused': focused }
        )}
        style={style}
        onClick={handleClick}
        tabIndex={disabled ? undefined : 0}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {/* 选择区域 */}
        <div
          className="forge-select-selection"
          style={{ height: size === 'large' ? '40px' : size === 'small' ? '24px' : '32px' }}
        >
          {/* Tags / 多选展示 */}
          {(mode === 'multiple' || mode === 'tags') && isArrayValue && currentValue && (
            <div className="forge-select-selection-wrap">
              {(maxTagCount !== undefined && maxTagCount !== 'responsive' && typeof maxTagCount === 'number'
                ? selectedLabels.slice(0, maxTagCount)
                : selectedLabels
              ).map((label: any, i: number) => {
                const val = isArrayValue ? currentValue[i] : currentValue
                return renderTag({ value: val, label, disabled: false })
              })}
              {maxTagCount !== undefined && typeof maxTagCount === 'number' && selectedLabels.length > maxTagCount && (
                <span className="forge-select-selection-item forge-select-selection-item--more">
                  + {selectedLabels.length - maxTagCount}
                </span>
              )}
            </div>
          )}

          {/* 单选展示 */}
          {mode === 'default' && (
            <span className="forge-select-selection-placeholder">
              {selectedLabels.length > 0
                ? selectedLabels.map((l: any, i: number) => <span key={i}>{l}</span>)
                : placeholder
              }
            </span>
          )}

          {/* 搜索输入框 */}
          {showSearch && (
            <input
              ref={searchInputRef}
              type="text"
              className="forge-select-selection-search"
              value={searchValue}
              placeholder={selectedLabels.length === 0 ? placeholder : searchPlaceholder}
              onChange={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
            />
          )}
          {!showSearch && (
            <input
              type="text"
              className="forge-select-selection-search forge-select-selection-search--hidden"
              value={searchValue}
              readOnly
              tabIndex={-1}
            />
          )}

          {/* Clear 按钮 */}
          {showClearBtn && (
            <span className="forge-select-clear" onClick={(e) => handleClear(e)} role="button" aria-label="clear">
              <svg viewBox="0 0 1024 1024" width="12" height="12">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m121.8 358.8L535.6 512l98.2 98.2c4.7 4.7 4.7 12.3 0 17l-17 17c-4.7 4.7-12.3 4.7-17 0L501.8 546l-98.2 98.2c-4.7 4.7-12.3 4.7-17 0l-17-17c-4.7-4.7-4.7-12.3 0-17l98.2-98.2-98.2-98.2c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 12.3-4.7 17 0l98.2 98.2 98.2-98.2c4.7-4.7 12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17z" fill="currentColor"/>
              </svg>
            </span>
          )}

          {/* Suffix / Arrow */}
          {suffixIcon ? (
            <span className="forge-select-suffix">{suffixIcon}</span>
          ) : showArrow && (
            <span className={classNames('forge-select-arrow', { 'forge-select-arrow--open': open })}>
              <svg viewBox="0 0 1024 1024" width="12" height="12">
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.4 486.1c12.8 17.6 39 17.6 51.7 0l352.4-486.1c3.9-5.3.1-12.7-6.4-12.7z" fill="currentColor"/>
              </svg>
            </span>
          )}
        </div>

        {/* 下拉菜单 */}
        {open && !disabled && (
          <div
            ref={dropdownRef}
            className={classNames('forge-select-dropdown', popupClassName)}
            style={{ ...popupStyle, '--item-height': itemHeight } as any}
            role="listbox"
          >
            {dropdownRender ? dropdownRender(renderDropdownContent(), { options: allOptions }) : renderDropdownContent()}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  )
}

// Attach sub-components
Select.Option = SelectOptionInner
Select.Group = SelectGroupInner

export default Select
