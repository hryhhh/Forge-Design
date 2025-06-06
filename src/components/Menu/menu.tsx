import React, { useState } from 'react'
import classNames from 'classnames'
import './_style.scss'
import { MenuProps, MenuContext } from './context'
import { MenuItemProps } from './menuItem'

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
  const passedContext = {
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
