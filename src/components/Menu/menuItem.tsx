import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
export interface MenuItemProps {
  index: number;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
const MenuItem: React.FC<MenuItemProps> = ({
  index = 0,
  className,
  disabled,
  style,
  children,
}) => {
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
