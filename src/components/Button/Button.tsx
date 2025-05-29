import React from 'react'
import classNames from 'classnames'

import { ButtonSize, ButtonType, ButtonProps } from './types'

const Button: React.FC<ButtonProps> = props => {
  const {
    children,
    size = 'medium' as ButtonSize,
    type = 'default' as ButtonType,
    disabled = false,
    href,
    className,
    ...restProps
  } = props

  const classes = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: disabled,
  })

  if (type === 'link' && href) {
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
    let buttonType: 'submit' | 'reset' | 'button' = 'button'
    if (type === 'primary') {
      buttonType = 'button'
    }
    return (
      <button
        className={classes}
        type={buttonType}
        disabled={disabled}
        {...buttonRestProps}
      >
        {children}
      </button>
    )
  }
}

export default Button
