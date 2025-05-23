import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
var MenuItem = function (_a) {
    var _b = _a.index, index = _b === void 0 ? "0" : _b, className = _a.className, disabled = _a.disabled, style = _a.style, children = _a.children;
    var context = useContext(MenuContext);
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === "string") {
            context.onSelect(index);
        }
    };
    return (_jsx("li", { className: classes, style: style, onClick: handleClick, children: children }));
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
