import React from "react";
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (SelectedIndex: string) => void;
export interface MenuProps {
    /** 指定默认高亮的菜单项索引 */
    defaultIndex?: string;
    /** 菜单类型：'horizontal'（水平）或 'vertical'（垂直），默认是 'horizontal' */
    mode?: MenuMode;
    /** 菜单容器的自定义 CSS 类名 */
    className?: string;
    /** 菜单内容，通常为 MenuItem 和 SubMenu 组件 */
    children?: React.ReactNode;
    /** 选中菜单项时触发的回调，参数为选中项的索引 */
    onSelect?: SelectCallback;
    /** 默认展开的子菜单索引数组（仅在垂直模式下生效） */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
/**
 * 一个支持水平和垂直模式、嵌套子菜单的导航菜单组件。
 */
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: React.FC<MenuProps>;
export default Menu;
