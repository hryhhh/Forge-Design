import { FC } from 'react'
import Menu, { MenuProps } from './Menu'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'

export type { MenuProps, SelectCallback, MenuMode } from './Menu'
export type { MenuItemProps } from './menuItem'
export type { SubMenuProps } from './subMenu'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
