import { FC } from 'react'
import Menu from './Menu'
import { MenuContext } from './Menu'
import type { MenuProps } from './Menu'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'

export type { MenuProps, IMenuContext } from './Menu'
export type { MenuItemProps } from './menuItem'
export type { SubMenuProps } from './subMenu'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

const MenuComponent = Menu as IMenuComponent
MenuComponent.Item = MenuItem
MenuComponent.SubMenu = SubMenu

export { MenuComponent as Menu }
export { MenuContext }
