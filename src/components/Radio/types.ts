import { type ReactNode, type CSSProperties } from 'react'

export type RadioSize = 'large' | 'middle' | 'small'

export interface RadioOption {
  value: string | number
  label?: ReactNode
  disabled?: boolean
  autoFocus?: boolean
  [key: string]: any
}

export interface RadioProps {
  /** 选中值 */
  value?: string | number
  /** 默认选中值 */
  defaultValue?: string | number
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: RadioSize | `${RadioSize}`
  /** 方向：horizontal / vertical */
  direction?: 'horizontal' | 'vertical'
  /** options 数组（模式：options） */
  options?: RadioOption[]
  /** 选项配置函数（模式：options） */
  optionType?: 'default' | 'button'
  /** 是否显示边框 */
  bordered?: boolean
  /** 选项数据 */
  children?: ReactNode
  /** name 属性 */
  name?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 是否自动获取焦点 */
  autoFocus?: boolean

  // Events
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string | number) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export interface RadioGroupProps {
  /** 选中值 */
  value?: string | number
  /** 默认选中值 */
  defaultValue?: string | number
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: RadioSize | `${RadioSize}`
  /** 方向：horizontal / vertical */
  direction?: 'horizontal' | 'vertical'
  /** options 数组 */
  options?: RadioOption[]
  /** 选项配置函数 */
  optionType?: 'default' | 'button'
  /** 是否显示边框 */
  bordered?: boolean
  /** 选项数据 */
  children?: ReactNode
  /** name 属性 */
  name?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 是否自动获取焦点 */
  autoFocus?: boolean

  // Events
  onChange?: (value: string | number, e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
}

export interface RadioOptionProps {
  /** 值 */
  value: string | number
  /** 标签 */
  label?: ReactNode
  /** 是否禁用 */
  disabled?: boolean
  /** 是否自动获取焦点 */
  autoFocus?: boolean
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  [key: string]: any
}

export default RadioProps
