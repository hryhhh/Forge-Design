import React from "react";
export interface SubMenuProps {
    index?: string;
    className?: string;
    title: string;
    children?: React.ReactNode;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
