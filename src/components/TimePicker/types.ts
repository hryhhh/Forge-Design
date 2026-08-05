import { type ReactNode, type CSSProperties } from 'react'

export type TimePickerSize = 'large' | 'default' | 'small'

export interface TimePickerProps {
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
  size?: TimePickerSize | `${TimePickerSize}`
  /** 占位符 */
  placeholder?: string
  /** 时间格式 HH:mm 或 HH:mm:ss */
  format?: string
  /** 分钟步长 */
  minuteStep?: number
  /** 秒钟步长 */
  secondStep?: number
  /** 是否允许清空 */
  allowClear?: boolean
  /** 前置内容 */
  prefix?: ReactNode
  /** 后缀内容 */
  suffix?: ReactNode
  /** name 属性 */
  name?: string
  /** id 属性 */
  id?: string
  /** 禁用时分秒 */
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
  /** 变更回调 */
  onChange?: (value: Date | null, dateString: string) => void
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void
  /** 自动聚焦 */
  autoFocus?: boolean
}
