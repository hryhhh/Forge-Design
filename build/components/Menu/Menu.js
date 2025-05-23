import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import React from "react";
import classNames from "classnames";
/**
 * 一个支持水平和垂直模式、嵌套子菜单的导航菜单组件。
 */
export var MenuContext = React.createContext({ index: "0" });
export var Menu = function (_a) {
    var _b = _a.defaultIndex, defaultIndex = _b === void 0 ? "0" : _b, _c = _a.mode, mode = _c === void 0 ? "horizontal" : _c, className = _a.className, children = _a.children, onSelect = _a.onSelect, _d = _a.defaultOpenSubMenus, defaultOpenSubMenus = _d === void 0 ? [] : _d;
    var _e = useState(defaultIndex), currentActive = _e[0], setActive = _e[1];
    var classes = classNames("forge-menu", className, {
        "menu-vertical": mode !== "horizontal",
        "menu-horizontal": mode === "horizontal",
    });
    var handleClick = function (index) {
        setActive(index);
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(index);
    };
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            if (React.isValidElement(child)) {
                var childElement = child;
                var displayName = childElement.type.displayName;
                if (displayName === "MenuItem" || displayName === "SubMenu") {
                    return React.cloneElement(childElement, { index: index.toString() });
                }
            }
            return null;
        });
    };
    return (_jsx("ul", { className: classes, "data-testid": "test-menu", children: _jsx(MenuContext.Provider, { value: passedContext, children: renderChildren() }) }));
};
export default Menu;
