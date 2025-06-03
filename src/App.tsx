import { Upload } from './components/Upload'
import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <Button type="primary">large</Button>
      <Button type="danger">danger</Button>
      <Button size="large">large</Button>
      <Button size="small">small</Button>
      <Button disabled>disabled</Button>
      <Button type="link" href="https://baidu.com">
        link
      </Button>
      <header className="App-header">
        <Upload action="https://jsonplaceholder.typicode.com/posts" />
      </header>
    </div>
  )
}
export default App
