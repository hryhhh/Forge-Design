import { type ReactNode } from 'react'

export type InputSize = 'large' | 'middle' | 'small'

export interface InputProps {
  /** 输入框值 */
  value?: string
  /** 默认值（非受控） */
  defaultValue?: string
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸：large / middle / small */
  size?: InputSize | `${InputSize}`
  /** 输入框类型：text / password / number / email / tel */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel'
  /** 前缀内容（图标或文字） */
  prefix?: ReactNode
  /** 后缀内容（图标或文字） */
  suffix?: ReactNode
  /** 是否显示清除按钮（仅在非禁用、有值时显示） */
  allowClear?: boolean
  /** 最大长度 */
  maxLength?: number
  /** 最小长度 */
  minLength?: number
  /** 是否只读 */
  readOnly?: boolean
  /** 是否自动获取焦点 */
  autoFocus?: boolean
  /** 是否自动调整高度（textarea） */
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: React.CSSProperties
  /** 输入框 name 属性 */
  name?: string
  /** 输入框 id 属性 */
  id?: string
  /** 提示文本 */
  tip?: ReactNode
  /** 前缀固定宽度（配合 prefix 使用，单位 px） */
  prefixWidth?: number

  // Events
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onPressEnter?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onClear?: () => void
}

export interface InputGroupProps {
  /** 子元素，通常为多个 Input 或 Input.AddOn */
  children?: ReactNode
  /** 尺寸 */
  size?: InputSize | `${InputSize}`
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: React.CSSProperties
  /** 是否有 addon */
  hasAddon?: boolean
  /** addon 宽度 */
  addonWidth?: number
  /** addon 前缀 */
  addonBefore?: ReactNode
  /** addon 后缀 */
  addonAfter?: ReactNode
}

export interface InputAddOnProps {
  /** addon 内容 */
  children?: ReactNode
  /** addon 类型：before / after */
  type?: 'before' | 'after'
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: React.CSSProperties
}

export default InputProps
