import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

import { ButtonSize, ButtonType } from './index'
// import mdx from "./Button.mdx";

const buttonMeta: Meta<typeof Button> = {
  title: 'Forge Design/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // docs: {
    //   page: mdx,
    // },
  },
}

export default buttonMeta

type Story = StoryObj<typeof Button>

// 默认按钮 Story
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}

// 不同尺寸的按钮 Stories
export const Large: Story = {
  args: {
    size: ButtonSize.Large,
    children: 'Large Button',
  },
}

export const Small: Story = {
  args: {
    size: ButtonSize.Small,
    children: 'Small Button',
  },
}

// 不同类型的按钮 Stories
export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    children: 'Primary Button',
  },
}

export const Danger: Story = {
  args: {
    type: ButtonType.Danger,
    children: 'Danger Button',
  },
}

export const Link: Story = {
  args: {
    type: ButtonType.Link,
    children: 'Link Button',
    href: 'https://www.baidu.com',
  },
}
