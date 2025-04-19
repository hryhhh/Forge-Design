import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

interface BaseButtonProps {
  children?: React.ReactNode;
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  className?: string;
  href?: string;
}


// 普通按钮类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 链接按钮类型
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// 综合类型
export type ButtonProps = NativeButtonProps | AnchorButtonProps;
const Button: React.FC<ButtonProps> = ({
  children,
  size = ButtonSize.Medium,
  btnType = ButtonType.Default,
  disabled=false,
  href,
  className,
  ...restProps
}) => {
  const classes = classNames("btn", className, {
    
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled,
  });

  if (btnType === ButtonType.Link && href) {
    // 确保 restProps 只包含 HTMLAnchorElement 的属性
    const anchorRestProps =
      restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} href={href} {...anchorRestProps}>
        {children}
      </a>
    );
  } else {
    const buttonRestProps =
      restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button className={classes} disabled={disabled} {...buttonRestProps}>
        {children}
      </button>
    );
  }
};

export default Button;
