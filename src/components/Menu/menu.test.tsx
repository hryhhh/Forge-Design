import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react'

import '@testing-library/jest-dom'

import type { MenuProps } from './context'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

import { Menu } from './index'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} data-testid="test-menu">
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1" disabled>
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
      <SubMenu title="dropdown" index="3">
        <MenuItem index="3-0">drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

let wrapper: RenderResult
describe('Menu and MenuItem', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('forge-menu test')
    const activeItem = wrapper.getByText('active')
    const disabledItem = wrapper.getByText('disabled')
    expect(activeItem).toHaveClass('menu-item is-active')
    expect(disabledItem).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    const disabledItem = wrapper.getByText('disabled')
    fireEvent.click(disabledItem)
    expect(disabledItem).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when hover on subMenu', async () => {
    const dropdownElement = wrapper.getByText('dropdown')
    const dropItem = wrapper.getByText('drop1')
    expect(dropItem).not.toHaveClass('menu-opened')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(dropItem).toBeVisible()
    })
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(dropItem).not.toHaveClass('menu-opened')
    })
  })
})
