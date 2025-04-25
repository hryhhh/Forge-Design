import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

// 定义测试用的菜单属性
const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};
// 定义测试用的垂直模式菜单属性
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};
// 生成菜单组件的函数
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} >
      <MenuItem>active</MenuItem>
      <MenuItem disabled >
        disabled
      </MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );
};
// 定义用于测试的变量
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
  
// 描述菜单和菜单项的测试用例
describe("Menu and MenuItem", () => {
  // 在每个测试前执行的准备工作
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  // 测试默认属性下菜单和菜单项的渲染
  it("should render correct Menu add MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("forge-menu test");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  // 测试点击菜单项时的行为
  it("click items should change active and call the right callback", () => {
    const thirditem = wrapper.getByText("xyz");
    expect(thirditem).toBeInTheDocument();
    fireEvent.click(thirditem);
    expect(thirditem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  // 测试垂直模式下菜单的渲染
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
});