import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Button, { ButtonSize, ButtonType } from "./components/Button/Button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
function App() {
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Vite + React" }), _jsxs("div", { className: "card", children: [_jsx("header", { className: "card-header" }), _jsxs(Menu, { defaultIndex: "0", onSelect: function (index) {
                            alert(index);
                        }, defaultOpenSubMenus: ["2"], children: [_jsx(MenuItem, { children: "Item 1" }), _jsx(MenuItem, { children: "Item 2" }), _jsx(MenuItem, { children: "Item 4" }), _jsxs(SubMenu, { title: "Submeu", children: [_jsx(MenuItem, { children: "Item 3" }), _jsx(MenuItem, { children: "Item 4" })] }), _jsx(MenuItem, { disabled: true, children: "Item 3" })] }), _jsx(Button, { children: "Hello Button" }), _jsx(Button, { onClick: function (e) {
                            e.preventDefault();
                            alert(13);
                        }, children: "Button" }), _jsx(Button, { btnType: ButtonType.Primary, size: ButtonSize.Large, disabled: true, children: "Large Button" }), _jsx(Button, { btnType: ButtonType.Danger, size: ButtonSize.Small, children: "Danger Button" }), _jsx(Button, { btnType: ButtonType.Link, href: "https://www.baidu.com", target: "_blank", children: "Link Button" }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to test HMR"] })] }), _jsx("a", { href: "https://vitejs.dev/guide/features.html", target: "_blank", children: "learn react" })] }));
}
export default App;
