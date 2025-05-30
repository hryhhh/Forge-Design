import React from 'react'

// 定义基础类型
export type MenuMode = 'horizontal' | 'vertical'
export type SelectCallback = (SelectedIndex: string) => void

// 定义 Props 接口
export interface MenuProps {
  /** 指定默认高亮的菜单项索引 */
  defaultIndex?: string
  /** 菜单类型：'horizontal'（水平）或 'vertical'（垂直），默认是 'horizontal' */
  mode?: MenuMode
  /** 菜单容器的自定义 CSS 类名 */
  className?: string
  /** 菜单内容，通常为 MenuItem 和 SubMenu 组件 */
  children?: React.ReactNode
  /** 选中菜单项时触发的回调，参数为选中项的索引 */
  onSelect?: SelectCallback
  /** 默认展开的子菜单索引数组（仅在垂直模式下生效） */
  defaultOpenSubMenus?: string[]
}

// 定义上下文类型
export interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

/** 一个支持水平和垂直模式、嵌套子菜单的导航菜单组件的上下文。 */
export const MenuContext = React.createContext<IMenuContext>({ index: '0' })
