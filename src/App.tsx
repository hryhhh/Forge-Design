import { useState } from 'react'
import Button,{ ButtonSize, ButtonType } from './components/Button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button>Hello Button</Button>
        <Button size={ButtonSize.Large}>Large Button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <a   
        href="https://vitejs.dev/guide/features.html"
        target="_blank"
      >learn react</a>
      
    </>
  )
}

export default App
