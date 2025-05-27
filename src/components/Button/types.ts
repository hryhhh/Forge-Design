import React from 'react'

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

export interface BaseButtonProps {
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
export type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

// 链接按钮类型
export type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = NativeButtonProps | AnchorButtonProps
