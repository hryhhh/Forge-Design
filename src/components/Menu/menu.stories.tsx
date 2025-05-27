import type { Meta, StoryObj } from '@storybook/react'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const menuMeta: Meta<typeof Menu> = {
  title: 'Forge Design/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    // 定义组件的文档页面布局
    layout: 'centered',
  },

  argTypes: {
    // 定义 props 的控件类型，以便在 Storybook UI 中进行交互
    mode: {
      control: {
        type: 'select',
      },
      options: ['horizontal', 'vertical'],
    },
    defaultIndex: {
      control: { type: 'text' },
    },
    onSelect: {
      action: 'selected',
    },
  },
}
export default menuMeta

type Story = StoryObj<typeof Menu>

// 水平模式的菜单
export const HorizontalMenu: Story = {
  render: args => (
    <Menu {...args}>
      <MenuItem>cool link 0</MenuItem>
      <MenuItem>cool link 1</MenuItem>
      <MenuItem>cool link 2</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem disabled>cool link 3</MenuItem>
    </Menu>
  ),
  args: {
    defaultIndex: '0',
    mode: 'horizontal',
  },
}
// 垂直模式的菜单
export const VerticalMenu: Story = {
  render: args => (
    <Menu {...args}>
      <MenuItem>cool link 0</MenuItem>
      <MenuItem>cool link 1</MenuItem>
      <MenuItem>cool link 2</MenuItem>
      <SubMenu title="Vertical SubMenu">
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem disabled>cool link 3</MenuItem>
    </Menu>
  ),
  args: {
    defaultIndex: '0',
    mode: 'vertical',
  },
}
