import { FC } from "react";
import { MenuProps } from "./Menu";
import { MenuItemProps } from "./menuItem";
import { SubMenuProps } from "./subMenu";
export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
