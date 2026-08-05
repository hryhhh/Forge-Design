import { type ReactNode, type CSSProperties } from 'react'

export type DatePickerSize = 'large' | 'default' | 'small'

export interface DatePickerProps {
  /** 值（受控） */
  value?: Date | null
  /** 默认值 */
  defaultValue?: Date | null
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: DatePickerSize | `${DatePickerSize}`
  /** 占位符 */
  placeholder?: string
  /** 日期格式 */
  format?: string
  /** 显示时间 */
  showTime?: boolean
  /** 是否允许清空 */
  allowClear?: boolean
  /** 前置内容 */
  prefix?: ReactNode
  /** 后缀内容 */
  suffix?: ReactNode
  /** 左侧附加元素 */
  addonBefore?: ReactNode
  /** 右侧附加元素 */
  addonAfter?: ReactNode
  /** name 属性 */
  name?: string
  /** id 属性 */
  id?: string
  /** disabled dates */
  disabledDate?: (current: Date) => boolean
  /** 变更回调 */
  onChange?: (value: Date | null, dateString: string) => void
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** 点击外部关闭面板 */
  onClick?: (e: React.MouseEvent) => void
  /** 自动聚焦 */
  autoFocus?: boolean
}

export type RangePickerSize = DatePickerSize

export type RangePickerPlaceholder = [string, string]

export interface RangePickerProps {
  /** 值（受控） [startDate, endDate] */
  value?: [Date, Date] | null
  /** 默认值 */
  defaultValue?: [Date, Date] | null
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: RangePickerSize | `${RangePickerSize}`
  /** 占位符 [startPlaceholder, endPlaceholder] */
  placeholder?: RangePickerPlaceholder
  /** 日期格式 */
  format?: string
  /** 是否允许清空 */
  allowClear?: boolean
  /** 前置内容 */
  prefix?: ReactNode
  /** 后缀内容 */
  suffix?: ReactNode
  /** disabled dates */
  disabledDate?: (current: Date) => boolean
  /** 变更回调 */
  onChange?: (values: [Date, Date] | null, dateStrings: [string, string]) => void
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void
}
