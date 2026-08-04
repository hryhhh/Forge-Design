import { type ReactNode, type CSSProperties } from 'react'

export type CheckboxSize = 'large' | 'middle' | 'small'

export interface CheckboxOption {
  value: string | number
  label?: ReactNode
  disabled?: boolean
  [key: string]: any
}

export interface CheckboxProps {
  /** 是否选中 */
  checked?: boolean
  /** 默认是否选中 */
  defaultChecked?: boolean
  /** 值 */
  value?: string | number
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: CheckboxSize | `${CheckboxSize}`
  /** 半选状态 */
  indeterminate?: boolean
  /** 选项内容 */
  children?: ReactNode
  /** name 属性 */
  name?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 是否自动获取焦点 */
  autoFocus?: boolean

  // Events
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export interface CheckboxGroupProps {
  /** 选中的值数组 */
  value?: (string | number)[]
  /** 默认选中的值数组 */
  defaultValue?: (string | number)[]
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: CheckboxSize | `${CheckboxSize}`
  /** 方向：horizontal / vertical */
  direction?: 'horizontal' | 'vertical'
  /** options 数组 */
  options?: CheckboxOption[]
  /** 选项配置 */
  optionType?: 'default' | 'button'
  /** 选项数据 */
  children?: ReactNode
  /** name 属性 */
  name?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 是否自动获取焦点 */
  autoFocus?: boolean

  // Events
  onChange?: (
    selectedValues: (string | number)[],
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  onFocus?: () => void
  onBlur?: () => void
}
