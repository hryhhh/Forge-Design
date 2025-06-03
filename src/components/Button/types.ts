import { type ReactNode } from 'react'

export type ButtonSizeString = 'large' | 'medium' | 'small'
export type ButtonTypeString = 'primary' | 'secondary' | 'danger' | 'link'

// 将类型改为枚举，使其既可作为类型又可作为值
export enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Link = 'link',
}

export interface ButtonProps {
  /** Button content */
  children?: ReactNode
  /** Size of the button */
  size?: ButtonSize | ButtonSizeString
  /** Type of the button */
  type?: ButtonType | ButtonTypeString
  /** Whether the button is disabled */
  disabled?: boolean
  /** Custom CSS class name */
  className?: string

  href?: string

  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void
}

export default ButtonProps
