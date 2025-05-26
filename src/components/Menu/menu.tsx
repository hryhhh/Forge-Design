import React, { useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

// 定义并命名导出基础类型
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (SelectedIndex: string) => void
export type { MenuMode, SelectCallback }

// 定义并命名导出 Props 接口
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

// 定义并命名导出上下文类型
interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}
export type { IMenuContext }

/** 一个支持水平和垂直模式、嵌套子菜单的导航菜单组件。 */
export const MenuContext = React.createContext<IMenuContext>({ index: '0' })

// 定义组件并命名导出
const Menu: React.FC<MenuProps> = ({
  defaultIndex = '0',
  mode = 'horizontal',
  className,
  children,
  onSelect,
  defaultOpenSubMenus = [],
}) => {
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('forge-menu', className, {
    'menu-vertical': mode !== 'horizontal',
    'menu-horizontal': mode === 'horizontal',
  })
  const handleClick = (index: string) => {
    setActive(index)
    onSelect?.(index)
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const childElement = child as React.ReactElement<MenuItemProps>
        const { displayName } = childElement.type as React.ComponentType
        if (displayName === 'MenuItem' || displayName === 'SubMenu') {
          return React.cloneElement(childElement, { index: index.toString() })
        }
      }
      return null
    })
  }
  return (
    <ul className={classes} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu
