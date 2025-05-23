import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu, { MenuProps } from "./Menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

// 定义测试用的菜单属性
const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};
// 定义测试用的垂直模式菜单属性
const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};
// 生成菜单组件的函数
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssfile: string = `
    .forge-submenu{
      display: none;
    }
      .forge-submenu.menu-opened{
      display:block;
      }
  `;
  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = cssfile;
  return style;
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
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  // 测试默认属性下菜单和菜单项的渲染
  it("should render correct Menu add MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("forge-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
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
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  // 测试垂直模式下菜单的渲染
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  // 测试鼠标悬停在子菜单上时的行为
  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("drop1")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("dropdown");

    fireEvent.click(dropdownElement); // 修改为点击事件

    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.click(dropdownElement); // 修改为点击事件
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).not.toBeVisible();
    });
  });

  // 测试鼠标点击子菜单标题时的行为
  it("should toggle menu-opened class when clicking on submenu title", () => {
    const dropdownElement = wrapper.getByText("dropdown");
    const submenu = wrapper.getByTestId("submenu-3"); // 假设子菜单的 data-testid 是 'submenu-3'

    // 初始状态下，子菜单应该是关闭的
    expect(submenu).not.toHaveClass("menu-opened");

    // 点击子菜单标题
    fireEvent.click(dropdownElement);

    // 子菜单应该打开，并且添加了 menu-opened 类
    expect(submenu).toHaveClass("menu-opened");

    // 再次点击子菜单标题
    fireEvent.click(dropdownElement);

    // 子菜单应该关闭，并且移除了 menu-opened 类
    expect(submenu).not.toHaveClass("menu-opened");
  });
});
