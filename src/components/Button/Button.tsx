import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  /** Small size button */
  Small = 'small',
  /** Medium size button */
  Medium = 'medium',
  /** Large size button */
  Large = 'large',
}

export enum ButtonType {
  /** Primary button style */
  Primary = 'primary',
  /** Default button style */
  Default = 'default',
  /** Danger button style */
  Danger = 'danger',
  /** Link button style */
  Link = 'link',
}
interface BaseButtonProps {
  /** Button content */
  children?: React.ReactNode
  /** Size of the button */
  size?: ButtonSize
  /** Type of the button */
  btnType?: ButtonType
  /** Whether the button is disabled */
  disabled?: boolean
  /** Custom CSS class name */
  className?: string
  /** Target URL if the button is a link */
  href?: string
}

// 普通按钮类型
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

// 链接按钮类型
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = NativeButtonProps | AnchorButtonProps

export type {
  BaseButtonProps,
  ButtonProps,
  AnchorButtonProps,
  NativeButtonProps,
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = ButtonSize.Medium,
  btnType = ButtonType.Default,
  disabled = false,
  href,
  className,
  ...restProps
}) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled,
  })

  if (btnType === ButtonType.Link && href) {
    // 确保 restProps 只包含 HTMLAnchorElement 的属性
    const anchorRestProps =
      restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a className={classes} href={href} {...anchorRestProps}>
        {children}
      </a>
    )
  } else {
    const buttonRestProps =
      restProps as React.ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button className={classes} disabled={disabled} {...buttonRestProps}>
        {children}
      </button>
    )
  }
}

export default Button
