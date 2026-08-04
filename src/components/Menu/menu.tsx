import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import './_style.scss'
import { MenuProps, MenuContext } from './context'

const Menu: React.FC<MenuProps> = ({
  defaultIndex = '0',
  mode = 'horizontal',
  className,
  children,
  onSelect,
  defaultOpenSubMenus = [],
}) => {
  const [currentActive, setActive] = useState(defaultIndex)

  // 当 defaultIndex 变化时同步 active 状态
  useEffect(() => {
    setActive(defaultIndex)
  }, [defaultIndex])

  const classes = classNames('forge-menu', className, {
    'menu-vertical': mode !== 'horizontal',
    'menu-horizontal': mode === 'horizontal',
  })
  const handleClick = (index: string) => {
    setActive(index)
    onSelect?.(index)
  }
  const passedContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  // 递归展开 Fragment
  const flattenChildren = (children: React.ReactNode): React.ReactElement[] => {
    const result: React.ReactElement[] = []
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        // 如果是 Fragment，递归展开
        if (child.type === React.Fragment) {
          result.push(
            ...flattenChildren(
              (child as React.ReactElement<any>).props.children
            )
          )
        } else {
          result.push(child)
        }
      }
    })
    return result
  }

  const renderChildren = () => {
    const flattened = flattenChildren(children)
    return flattened.filter(child => {
      const type = child.type
      const typeName = (type as any).name || (type as any).displayName
      return typeName === 'MenuItem' || typeName === 'SubMenu'
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
