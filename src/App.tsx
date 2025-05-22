import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/Button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <header className="card-header"></header>
        <Menu
          defaultIndex={"0"}
          onSelect={(index) => {
            alert(index);
          }}
          defaultOpenSubMenus={["2"]}
          // mode="vertical"
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 4</MenuItem>
          <SubMenu title="Submeu">
            <MenuItem>Item 3</MenuItem>
            <MenuItem>Item 4</MenuItem>
          </SubMenu>
          <MenuItem disabled>Item 3</MenuItem>
        </Menu>

        <Button>Hello Button</Button>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            alert(13);
          }}
        >
          Button
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>
          Large Button
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Danger Button
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.baidu.com"
          target="_blank"
        >
          Link Button
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        learn react
      </a>
    </>
  );
}

export default App;
