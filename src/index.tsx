// src/index.tsx

// 🧱 组件导出
export { default as Button } from './components/Button'
export { Menu } from './components/Menu'

// 🧩 按钮相关类型
export type {
  BaseButtonProps,
  ButtonProps,
  AnchorButtonProps,
  NativeButtonProps,
} from './components/Button'

export { ButtonSize, ButtonType } from './components/Button'

export type {
  MenuProps,
  MenuItemProps,
  SubMenuProps,
  IMenuComponent,
  MenuMode,
  SelectCallback,
  IMenuContext,
} from './components/Menu/index'
