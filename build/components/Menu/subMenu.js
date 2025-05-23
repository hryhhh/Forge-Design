import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
var SubMenu = function (_a) {
    var _b = _a.index, index = _b === void 0 ? "0" : _b, className = _a.className, title = _a.title, children = _a.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpened = index && context.mode === "vertical"
        ? openedSubMenus.includes(index)
        : false;
    var _c = useState(isOpened), menuOpen = _c[0], setOpen = _c[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "menu-opened": menuOpen, // 添加 menu-opened 类以控制子菜单显示
    });
    var handleClick = function () {
        setOpen(!menuOpen); // 切换子菜单的显示状态
    };
    var renderChildren = function () {
        var subMenuClasses = classNames("forge-submenu", {
            "menu-opened": menuOpen, // 根据 menuOpen 控制子菜单的显示
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (React.isValidElement(childElement)) {
                var displayName = childElement.type.displayName;
                if (displayName === "MenuItem") {
                    return React.cloneElement(childElement, { index: "".concat(index, "-").concat(i) });
                }
            }
        });
        return _jsx("ul", { className: subMenuClasses, children: childrenComponent });
    };
    return (_jsxs("li", { className: classes, "data-testid": "submenu-".concat(index), children: [_jsxs("div", { className: "submenu-title", onClick: handleClick, children: [title, _jsx("span", { className: "arrow-icon ".concat(menuOpen ? "open" : ""), onClick: handleClick, children: "\u25BC" })] }), renderChildren()] }, index));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
