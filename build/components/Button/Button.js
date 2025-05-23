var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
export var ButtonSize;
(function (ButtonSize) {
    /** Small size button */
    ButtonSize["Small"] = "small";
    /** Medium size button */
    ButtonSize["Medium"] = "medium";
    /** Large size button */
    ButtonSize["Large"] = "large";
})(ButtonSize || (ButtonSize = {}));
export var ButtonType;
(function (ButtonType) {
    /** Primary button style */
    ButtonType["Primary"] = "primary";
    /** Default button style */
    ButtonType["Default"] = "default";
    /** Danger button style */
    ButtonType["Danger"] = "danger";
    /** Link button style */
    ButtonType["Link"] = "link";
})(ButtonType || (ButtonType = {}));
export var Button = function (_a) {
    var _b;
    var children = _a.children, _c = _a.size, size = _c === void 0 ? ButtonSize.Medium : _c, _d = _a.btnType, btnType = _d === void 0 ? ButtonType.Default : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, href = _a.href, className = _a.className, restProps = __rest(_a, ["children", "size", "btnType", "disabled", "href", "className"]);
    var classes = classNames("btn", className, (_b = {},
        _b["btn-".concat(btnType)] = btnType,
        _b["btn-".concat(size)] = size,
        _b.disabled = disabled,
        _b));
    if (btnType === ButtonType.Link && href) {
        // 确保 restProps 只包含 HTMLAnchorElement 的属性
        var anchorRestProps = restProps;
        return (_jsx("a", __assign({ className: classes, href: href }, anchorRestProps, { children: children })));
    }
    else {
        var buttonRestProps = restProps;
        return (_jsx("button", __assign({ className: classes, disabled: disabled }, buttonRestProps, { children: children })));
    }
};
export default Button;
