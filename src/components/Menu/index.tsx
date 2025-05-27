import { FC } from 'react'

import Menu from './menu'
import { MenuContext } from './context'
import type { MenuProps } from './context'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'

export type {
  MenuProps,
  IMenuContext,
  MenuMode,
  SelectCallback,
} from './context'
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
