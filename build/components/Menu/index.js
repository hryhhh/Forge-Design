import Menu from "./Menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
