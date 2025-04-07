//import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/Button";

function App() {


  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        
        <Button>Hello Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}   disabled>Large Button</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger Button</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">Link Button</Button>
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

export default App
