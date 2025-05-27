import React from 'react'
import classNames from 'classnames'

import { ButtonSize, ButtonType, ButtonProps } from './types'

const Button: React.FC<ButtonProps> = props => {
  const {
    children,
    size = ButtonSize.Medium,
    btnType = ButtonType.Default,
    disabled = false,
    href,
    className,
    ...restProps
  } = props

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
