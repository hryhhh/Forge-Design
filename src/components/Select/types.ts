import { type ReactNode, type CSSProperties } from 'react'

export type SelectSize = 'large' | 'middle' | 'small'
export type SelectMode = 'default' | 'multiple' | 'tags'

export interface SelectOption {
  value: string | number
  label?: ReactNode
  disabled?: boolean
  title?: string
  key?: string | number
  [key: string]: any
}

export interface SelectProps {
  children?: React.ReactNode
  /** 选中值 */
  value?: string | number | (string | number)[]
  /** 默认选中值 */
  defaultValue?: string | number | (string | number)[]
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: SelectSize | `${SelectSize}`
  /** 模式：default / multiple / tags */
  mode?: SelectMode | `${SelectMode}`
  /** 是否可搜索 */
  showSearch?: boolean
  /** 搜索框占位符 */
  searchPlaceholder?: string
  /** 是否显示清除按钮 */
  allowClear?: boolean
  /** 是否显示下拉箭头 */
  showArrow?: boolean
  /** 下拉菜单自定义 class */
  popupClassName?: string
  /** 下拉菜单自定义 style */
  popupStyle?: CSSProperties
  /** 下拉菜单挂载容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  /** 选项过滤函数，true 表示保留 */
  filterOption?: boolean | ((input: string, option: SelectOption) => boolean)
  /** 用于搜索时匹配选项的属性名 */
  optionFilterProp?: 'label' | 'value' | string
  /** 选项数据 */
  options?: SelectOption[]
  /** 是否显示底部没有数据提示 */
  showEmpty?: boolean
  /** 没有数据时的提示 */
  notFoundContent?: ReactNode
  /** 是否自动获取焦点 */
  autoFocus?: boolean
  /** 是否为加载状态 */
  loading?: boolean
  /** 是否删除选中项时触发 onChange */
  tokenSeparators?: string[]
  /** 多选/标签模式下最多显示多少个 tag */
  maxCount?: number
  /** 多选/标签模式下超出限制的显示文案 */
  maxTagPlaceholder?: ReactNode
  /** 多选/标签模式下 tag 的溢出行为：hidden / scroll */
  maxTagCount?: number | 'responsive'
  /** 是否将 value 作为 label 展示（object 类型时） */
  labelInValue?: boolean
  /** 自定义 suffix 图标 */
  suffixIcon?: ReactNode
  /** 自定义 remove 图标 */
  removeIcon?: ReactNode
  /** 自定义 expand 图标 */
  expandIcon?: ReactNode
  /** 下拉渲染函数 */
  dropdownRender?: (menu: ReactNode, props: { options: SelectOption[] }) => ReactNode
  /** 触发元素自定义 class */
  className?: string
  /** 触发元素自定义 style */
  style?: CSSProperties
  /** name 属性 */
  name?: string
  /** id 属性 */
  id?: string

  // Events
  onChange?: (value: any, option: SelectOption | SelectOption[]) => void
  onSelect?: (value: any, option: SelectOption) => void
  onDeselect?: (value: any, option: SelectOption) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onPopupScroll?: (e: React.UIEvent<HTMLElement>) => void
}

export interface SelectValue {
  value: string | number
  label?: ReactNode
}

export interface SelectOptionProps {
  value: string | number
  label?: ReactNode
  disabled?: boolean
  className?: string
  style?: CSSProperties
  [key: string]: any
}

export interface SelectGroupProps {
  label: ReactNode
  key?: string | number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export default SelectProps
