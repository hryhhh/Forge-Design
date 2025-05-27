import { FC } from 'react';
import { MenuContext } from './context';
import type { MenuProps } from './context';
import { MenuItemProps } from './menuItem';
import { SubMenuProps } from './subMenu';
export type { MenuProps, IMenuContext, MenuMode, SelectCallback, } from './context';
export type { MenuItemProps } from './menuItem';
export type { SubMenuProps } from './subMenu';
export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const MenuComponent: IMenuComponent;
export { MenuComponent as Menu };
export { MenuContext };
