import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  index?: string;
  className?: string;
  title: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index = "0",
  className,
  title,
  children,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpened);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "menu-opened": menuOpen, // 添加 menu-opened 类以控制子菜单显示
  });

  const handleClick = () => {
    setOpen(!menuOpen); // 切换子菜单的显示状态
  };

  const renderChildren = () => {
    const subMenuClasses = classNames("forge-submenu", {
      "menu-opened": menuOpen, // 根据 menuOpen 控制子菜单的显示
    });

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.ReactElement<MenuItemProps>;
      if (React.isValidElement(childElement)) {
        const { displayName } = childElement.type as React.ComponentType;
        if (displayName === "MenuItem") {
          return React.cloneElement(childElement, { index: `${index}-${i}` });
        }
      }
    });

    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li className={classes} key={index} data-testid={`submenu-${index}`}>
      <div
        className="submenu-title"
        onClick={handleClick} // 点击标题时触发 handleClick
      >
        {title}
        <span
          className={`arrow-icon ${menuOpen ? "open" : ""}`}
          onClick={handleClick} // 点击箭头图标时触发 handleClick
        >
          ▼
        </span>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;