import { type CSSProperties } from 'react'

export type SwitchSize = 'large' | 'default' | 'small'

export interface SwitchProps {
  /** 是否选中 */
  checked?: boolean
  /** 默认是否选中 */
  defaultChecked?: boolean
  /** 自定义 class */
  className?: string
  /** 自定义 style */
  style?: CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: SwitchSize | `${SwitchSize}`
  /** 加载状态 */
  loading?: boolean
  /** 切换前回调，返回 false 可阻止切换 */
  beforeChange?: () => boolean | Promise<boolean>
  /** 开启时的值 */
  checkedValue?: string | number
  /** 关闭时的值 */
  uncheckedValue?: string | number
  /** 开启时的文本 */
  checkedChildren?: React.ReactNode
  /** 关闭时的文本 */
  unCheckedChildren?: React.ReactNode
  /** 开启时的颜色 */
  checkedColor?: string
  /** name 属性 */
  name?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 是否自动获取焦点 */
  autoFocus?: boolean
  /** 图标前缀 */
  iconPrefixCls?: string
  /** 自定义图标（开启） */
  checkedIcon?: React.ReactNode
  /** 自定义图标（关闭） */
  unCheckedIcon?: React.ReactNode

  // Events
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}
