import React, { type ReactNode } from 'react'

export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonType = 'default' | 'primary' | 'link' | 'danger' | 'submit'

export interface BaseButtonProps {
  /** Button content */
  children?: ReactNode
  /** Size of the button */
  size?: ButtonSize
  /** Type of the button */
  type?: ButtonType
  /** Whether the button is disabled */
  disabled?: boolean
  /** Custom CSS class name */
  className?: string

  href?: string
}

// 普通按钮类型
export type NativeButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>

// 链接按钮类型
export type AnchorButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string
  }

export type ButtonProps = Partial<NativeButtonProps> | AnchorButtonProps
